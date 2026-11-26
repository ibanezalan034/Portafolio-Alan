const express = require('express');
const router = express.Router();
const { sql, getPool } = require('../db');
const IVA_PORCENTAJE = 0.21;

// Crear Pedido
router.post('/', async (req, res) => {
    const pool = await getPool();
    const transaction = new sql.Transaction(pool);
    try {
        const { clienteNombre, clienteEmail, clienteTelefono, clienteDireccion, items, formaPago, cuotas } = req.body;
        if (!clienteNombre || !clienteEmail || !items || items.length === 0) return res.status(400).json({ error: 'Faltan datos obligatorios' });
        let subtotal = 0;
        for (const item of items) subtotal += parseFloat(item.precio) * parseInt(item.cantidad);
        const iva = subtotal * IVA_PORCENTAJE;
        const total = subtotal + iva;
        const cuotasNum = formaPago === 'Cuotas' ? parseInt(cuotas) || 1 : 1;
        const montoCuota = formaPago === 'Cuotas' ? total / cuotasNum : 0;
        const fecha = new Date();
        const numeroPedido = `PED-${fecha.getFullYear()}${String(fecha.getMonth()+1).padStart(2,'0')}${String(fecha.getDate()).padStart(2,'0')}-${Date.now().toString().slice(-5)}`;
        
        await transaction.begin();
        const pedidoResult = await new sql.Request(transaction)
            .input('NumeroPedido', sql.VarChar(50), numeroPedido).input('ClienteNombre', sql.VarChar(150), clienteNombre).input('ClienteEmail', sql.VarChar(150), clienteEmail).input('ClienteTelefono', sql.VarChar(30), clienteTelefono || null).input('ClienteDireccion', sql.VarChar(250), clienteDireccion || null).input('Subtotal', sql.Decimal(10,2), subtotal).input('IVA', sql.Decimal(10,2), iva).input('Total', sql.Decimal(10,2), total).input('FormaPago', sql.VarChar(30), formaPago || 'Contado').input('Cuotas', sql.Int, cuotasNum).input('MontoCuota', sql.Decimal(10,2), montoCuota)
            .query(`INSERT INTO Pedidos (NumeroPedido, ClienteNombre, ClienteEmail, ClienteTelefono, ClienteDireccion, Subtotal, IVA, Total, FormaPago, Cuotas, MontoCuota) OUTPUT INSERTED.PedidoID, INSERTED.FechaPedido VALUES (@NumeroPedido, @ClienteNombre, @ClienteEmail, @ClienteTelefono, @ClienteDireccion, @Subtotal, @IVA, @Total, @FormaPago, @Cuotas, @MontoCuota)`);
        
        const pedidoID = pedidoResult.recordset[0].PedidoID;
        const fechaPedido = pedidoResult.recordset[0].FechaPedido;
        
        for (const item of items) {
            const stockCheck = await new sql.Request(transaction).input('ID', sql.Int, item.productoID).query('SELECT Stock, Nombre FROM Productos WHERE ProductoID = @ID');
            const sub = parseFloat(item.precio) * parseInt(item.cantidad);
            await new sql.Request(transaction)
                .input('PedidoID', sql.Int, pedidoID).input('ProductoID', sql.Int, item.productoID).input('NombreProducto', sql.VarChar(150), item.nombre || stockCheck.recordset[0].Nombre).input('Cantidad', sql.Int, item.cantidad).input('PrecioUnitario', sql.Decimal(10,2), item.precio).input('Subtotal', sql.Decimal(10,2), sub)
                .query(`INSERT INTO DetallePedido (PedidoID, ProductoID, NombreProducto, Cantidad, PrecioUnitario, Subtotal) VALUES (@PedidoID, @ProductoID, @NombreProducto, @Cantidad, @PrecioUnitario, @Subtotal)`);
        }
        await transaction.commit();
        res.json({ success: true, pedido: { id: pedidoID, numero: numeroPedido, fecha: fechaPedido, cliente: clienteNombre, subtotal: subtotal.toFixed(2), iva: iva.toFixed(2), total: total.toFixed(2), formaPago: formaPago || 'Contado', cuotas: cuotasNum, montoCuota: montoCuota.toFixed(2), estado: 'Pendiente' } });
    } catch (err) {
        try { await transaction.rollback(); } catch(e) {}
        res.status(500).json({ error: err.message || 'Error' });
    }
});

// Listar Pedidos (Admin)
router.get('/', async (req, res) => {
    try {
        const pool = await getPool();
        const result = await pool.request().query(`SELECT P.* FROM Pedidos P ORDER BY CASE WHEN P.Estado = 'Pendiente' THEN 0 ELSE 1 END, P.FechaPedido DESC`);
        res.json(result.recordset);
    } catch (err) { res.status(500).json({ error: 'Error' }); }
});

// Ver un Pedido (Remito)
router.get('/:id', async (req, res) => {
    try {
        const pool = await getPool();
        const pedido = await pool.request().input('ID', sql.Int, req.params.id).query('SELECT * FROM Pedidos WHERE PedidoID = @ID');
        const detalle = await pool.request().input('ID', sql.Int, req.params.id).query('SELECT * FROM DetallePedido WHERE PedidoID = @ID');
        res.json({ pedido: pedido.recordset[0], items: detalle.recordset });
    } catch (err) { res.status(500).json({ error: 'Error' }); }
});

// Aprobar
router.post('/:id/aprobar', async (req, res) => {
    const pool = await getPool();
    const transaction = new sql.Transaction(pool);
    try {
        const { adminID } = req.body;
        const pedidoID = req.params.id;
        const pedidoInfo = await pool.request().input('ID', sql.Int, pedidoID).query('SELECT Estado FROM Pedidos WHERE PedidoID = @ID');
        if (pedidoInfo.recordset[0].Estado !== 'Pendiente') return res.status(400).json({ error: 'Ya procesado' });
        await transaction.begin();
        const items = await new sql.Request(transaction).input('ID', sql.Int, pedidoID).query('SELECT ProductoID, Cantidad FROM DetallePedido WHERE PedidoID = @ID');
        for (const item of items.recordset) {
            await new sql.Request(transaction).input('ID', sql.Int, item.ProductoID).input('Cantidad', sql.Int, item.Cantidad).query('UPDATE Productos SET Stock = Stock - @Cantidad WHERE ProductoID = @ID');
            await new sql.Request(transaction).input('ProductoID', sql.Int, item.ProductoID).input('UsuarioID', sql.Int, adminID || 1).input('Cantidad', sql.Int, item.Cantidad).query(`INSERT INTO MovimientosInventario (ProductoID, UsuarioID, TipoMovimiento, Cantidad, Motivo) VALUES (@ProductoID, @UsuarioID, 'Salida', @Cantidad, 'Pedido aprobado')`);
        }
        await new sql.Request(transaction).input('ID', sql.Int, pedidoID).input('AdminID', sql.Int, adminID || 1).query(`UPDATE Pedidos SET Estado = 'Aprobado', FechaAprobacion = GETDATE(), AprobadoPor = @AdminID WHERE PedidoID = @ID`);
        await transaction.commit();
        res.json({ success: true });
    } catch (err) { try { await transaction.rollback(); } catch(e) {} res.status(500).json({ error: 'Error' }); }
});

// Rechazar
router.post('/:id/rechazar', async (req, res) => {
    try {
        const pool = await getPool();
        const { adminID, motivo } = req.body;
        await pool.request().input('ID', sql.Int, req.params.id).input('AdminID', sql.Int, adminID || 1).input('Motivo', sql.VarChar(500), motivo || 'Rechazado').query(`UPDATE Pedidos SET Estado = 'Rechazado', FechaAprobacion = GETDATE(), AprobadoPor = @AdminID, Observaciones = @Motivo WHERE PedidoID = @ID`);
        res.json({ success: true });
    } catch (err) { res.status(500).json({ error: 'Error' }); }
});

// Cierre Diario
router.post('/cierre-diario', async (req, res) => {
    try {
        const pool = await getPool();
        const { adminID } = req.body;
        const hoy = new Date().toISOString().split('T')[0];
        const existe = await pool.request().input('Fecha', sql.Date, hoy).query('SELECT CierreID FROM CierresDiarios WHERE Fecha = @Fecha');
        if (existe.recordset.length > 0) return res.status(400).json({ error: 'El día ya fue cerrado' });
        const r = (await pool.request().input('Fecha', sql.Date, hoy).query(`SELECT COUNT(*) AS CantidadPedidos, ISNULL(SUM(Subtotal), 0) AS TotalNeto, ISNULL(SUM(IVA), 0) AS TotalIVA, ISNULL(SUM(Total), 0) AS TotalVentas, ISNULL(SUM(CASE WHEN FormaPago = 'Contado' THEN Total ELSE 0 END), 0) AS TotalContado, ISNULL(SUM(CASE WHEN FormaPago = 'Cuotas' THEN Total ELSE 0 END), 0) AS TotalCuotas FROM Pedidos WHERE CAST(FechaPedido AS DATE) = @Fecha AND Estado = 'Aprobado'`)).recordset[0];
        if (r.CantidadPedidos === 0) return res.status(400).json({ error: 'No hay pedidos aprobados hoy' });
        await pool.request().input('Fecha', sql.Date, hoy).input('CantidadPedidos', sql.Int, r.CantidadPedidos).input('TotalVentas', sql.Decimal(10,2), r.TotalVentas).input('TotalIVA', sql.Decimal(10,2), r.TotalIVA).input('TotalNeto', sql.Decimal(10,2), r.TotalNeto).input('TotalContado', sql.Decimal(10,2), r.TotalContado).input('TotalCuotas', sql.Decimal(10,2), r.TotalCuotas).input('CerradoPor', sql.Int, adminID || 1).query(`INSERT INTO CierresDiarios (Fecha, CantidadPedidos, TotalVentas, TotalIVA, TotalNeto, TotalContado, TotalCuotas, CerradoPor) VALUES (@Fecha, @CantidadPedidos, @TotalVentas, @TotalIVA, @TotalNeto, @TotalContado, @TotalCuotas, @CerradoPor)`);
        res.json({ success: true, resumen: r });
    } catch (err) { res.status(500).json({ error: 'Error' }); }
});

// Listar Cierres
router.get('/cierres/lista', async (req, res) => {
    try {
        const pool = await getPool();
        const result = await pool.request().query('SELECT * FROM CierresDiarios ORDER BY Fecha DESC');
        res.json(result.recordset);
    } catch (err) { res.status(500).json({ error: 'Error' }); }
});

module.exports = router;