USE GestionCompras;
GO

-- ============================================
-- BORRAR SPs SI YA EXISTEN (para evitar errores)
-- ============================================

IF OBJECT_ID('sp_NotaCreditoCompra_Insertar', 'P') IS NOT NULL DROP PROCEDURE sp_NotaCreditoCompra_Insertar;
IF OBJECT_ID('sp_NotaCreditoCompra_Actualizar', 'P') IS NOT NULL DROP PROCEDURE sp_NotaCreditoCompra_Actualizar;
IF OBJECT_ID('sp_NotaCreditoCompra_Eliminar', 'P') IS NOT NULL DROP PROCEDURE sp_NotaCreditoCompra_Eliminar;
IF OBJECT_ID('sp_NotaCreditoCompra_ObtenerPorId', 'P') IS NOT NULL DROP PROCEDURE sp_NotaCreditoCompra_ObtenerPorId;
IF OBJECT_ID('sp_NotaCreditoCompra_ObtenerTodos', 'P') IS NOT NULL DROP PROCEDURE sp_NotaCreditoCompra_ObtenerTodos;

IF OBJECT_ID('sp_NotaDebitoCompra_Insertar', 'P') IS NOT NULL DROP PROCEDURE sp_NotaDebitoCompra_Insertar;
IF OBJECT_ID('sp_NotaDebitoCompra_Actualizar', 'P') IS NOT NULL DROP PROCEDURE sp_NotaDebitoCompra_Actualizar;
IF OBJECT_ID('sp_NotaDebitoCompra_Eliminar', 'P') IS NOT NULL DROP PROCEDURE sp_NotaDebitoCompra_Eliminar;
IF OBJECT_ID('sp_NotaDebitoCompra_ObtenerPorId', 'P') IS NOT NULL DROP PROCEDURE sp_NotaDebitoCompra_ObtenerPorId;
IF OBJECT_ID('sp_NotaDebitoCompra_ObtenerTodos', 'P') IS NOT NULL DROP PROCEDURE sp_NotaDebitoCompra_ObtenerTodos;

IF OBJECT_ID('sp_InformeCotejo_Insertar', 'P') IS NOT NULL DROP PROCEDURE sp_InformeCotejo_Insertar;
IF OBJECT_ID('sp_InformeCotejo_Actualizar', 'P') IS NOT NULL DROP PROCEDURE sp_InformeCotejo_Actualizar;
IF OBJECT_ID('sp_InformeCotejo_Eliminar', 'P') IS NOT NULL DROP PROCEDURE sp_InformeCotejo_Eliminar;
IF OBJECT_ID('sp_InformeCotejo_ObtenerPorId', 'P') IS NOT NULL DROP PROCEDURE sp_InformeCotejo_ObtenerPorId;
IF OBJECT_ID('sp_InformeCotejo_ObtenerTodos', 'P') IS NOT NULL DROP PROCEDURE sp_InformeCotejo_ObtenerTodos;

IF OBJECT_ID('sp_InformeCotejo_AgregarRemito', 'P') IS NOT NULL DROP PROCEDURE sp_InformeCotejo_AgregarRemito;
IF OBJECT_ID('sp_InformeCotejo_EliminarRemito', 'P') IS NOT NULL DROP PROCEDURE sp_InformeCotejo_EliminarRemito;
IF OBJECT_ID('sp_InformeCotejo_ObtenerRemitos', 'P') IS NOT NULL DROP PROCEDURE sp_InformeCotejo_ObtenerRemitos;
IF OBJECT_ID('sp_InformeCotejo_AgregarOrden', 'P') IS NOT NULL DROP PROCEDURE sp_InformeCotejo_AgregarOrden;
IF OBJECT_ID('sp_InformeCotejo_EliminarOrden', 'P') IS NOT NULL DROP PROCEDURE sp_InformeCotejo_EliminarOrden;
IF OBJECT_ID('sp_InformeCotejo_ObtenerOrdenes', 'P') IS NOT NULL DROP PROCEDURE sp_InformeCotejo_ObtenerOrdenes;

GO

-- ============================================
-- NOTAS DE CRÉDITO (5 SPs)
-- ============================================

CREATE PROCEDURE sp_NotaCreditoCompra_Insertar
    @FK_Factura_Compra INT,
    @FK_Proveedor INT,
    @Monto DECIMAL(18,2),
    @Motivo NVARCHAR(255)
AS
BEGIN
    INSERT INTO Notas_Credito_Compra (FK_Factura_Compra, FK_Proveedor, Monto, Motivo)
    VALUES (@FK_Factura_Compra, @FK_Proveedor, @Monto, @Motivo);
    SELECT SCOPE_IDENTITY() AS ID;
END
GO

CREATE PROCEDURE sp_NotaCreditoCompra_Actualizar
    @ID INT,
    @FK_Factura_Compra INT,
    @FK_Proveedor INT,
    @Monto DECIMAL(18,2),
    @Motivo NVARCHAR(255)
AS
BEGIN
    UPDATE Notas_Credito_Compra
    SET FK_Factura_Compra = @FK_Factura_Compra,
        FK_Proveedor = @FK_Proveedor,
        Monto = @Monto,
        Motivo = @Motivo
    WHERE ID = @ID;
END
GO

CREATE PROCEDURE sp_NotaCreditoCompra_Eliminar
    @ID INT
AS
BEGIN
    DELETE FROM Notas_Credito_Compra WHERE ID = @ID;
END
GO

CREATE PROCEDURE sp_NotaCreditoCompra_ObtenerPorId
    @ID INT
AS
BEGIN
    SELECT * FROM Notas_Credito_Compra WHERE ID = @ID;
END
GO

CREATE PROCEDURE sp_NotaCreditoCompra_ObtenerTodos
    @FK_Proveedor INT = NULL,
    @FechaDesde DATE = NULL,
    @FechaHasta DATE = NULL
AS
BEGIN
    SELECT * FROM Notas_Credito_Compra
    WHERE (FK_Proveedor = @FK_Proveedor OR @FK_Proveedor IS NULL)
      AND (CAST(Fecha AS DATE) >= @FechaDesde OR @FechaDesde IS NULL)
      AND (CAST(Fecha AS DATE) <= @FechaHasta OR @FechaHasta IS NULL)
    ORDER BY Fecha DESC;
END
GO

-- ============================================
-- NOTAS DE DÉBITO (5 SPs)
-- ============================================

CREATE PROCEDURE sp_NotaDebitoCompra_Insertar
    @FK_Factura_Compra INT,
    @FK_Proveedor INT,
    @Monto DECIMAL(18,2),
    @Motivo NVARCHAR(255)
AS
BEGIN
    INSERT INTO Notas_Debito_Compra (FK_Factura_Compra, FK_Proveedor, Monto, Motivo)
    VALUES (@FK_Factura_Compra, @FK_Proveedor, @Monto, @Motivo);
    SELECT SCOPE_IDENTITY() AS ID;
END
GO

CREATE PROCEDURE sp_NotaDebitoCompra_Actualizar
    @ID INT,
    @FK_Factura_Compra INT,
    @FK_Proveedor INT,
    @Monto DECIMAL(18,2),
    @Motivo NVARCHAR(255)
AS
BEGIN
    UPDATE Notas_Debito_Compra
    SET FK_Factura_Compra = @FK_Factura_Compra,
        FK_Proveedor = @FK_Proveedor,
        Monto = @Monto,
        Motivo = @Motivo
    WHERE ID = @ID;
END
GO

CREATE PROCEDURE sp_NotaDebitoCompra_Eliminar
    @ID INT
AS
BEGIN
    DELETE FROM Notas_Debito_Compra WHERE ID = @ID;
END
GO

CREATE PROCEDURE sp_NotaDebitoCompra_ObtenerPorId
    @ID INT
AS
BEGIN
    SELECT * FROM Notas_Debito_Compra WHERE ID = @ID;
END
GO

CREATE PROCEDURE sp_NotaDebitoCompra_ObtenerTodos
    @FK_Proveedor INT = NULL,
    @FechaDesde DATE = NULL,
    @FechaHasta DATE = NULL
AS
BEGIN
    SELECT * FROM Notas_Debito_Compra
    WHERE (FK_Proveedor = @FK_Proveedor OR @FK_Proveedor IS NULL)
      AND (CAST(Fecha AS DATE) >= @FechaDesde OR @FechaDesde IS NULL)
      AND (CAST(Fecha AS DATE) <= @FechaHasta OR @FechaHasta IS NULL)
    ORDER BY Fecha DESC;
END
GO

-- ============================================
-- INFORMES DE COTEJO (5 SPs)
-- ============================================

CREATE PROCEDURE sp_InformeCotejo_Insertar
    @FK_Factura_Compra INT,
    @FK_Usuario INT,
    @Estado NVARCHAR(20),
    @Motivo_Rechazo NVARCHAR(255) = NULL
AS
BEGIN
    INSERT INTO Informes_Cotejo_Compra (FK_Factura_Compra, FK_Usuario, Estado, Motivo_Rechazo)
    VALUES (@FK_Factura_Compra, @FK_Usuario, @Estado, @Motivo_Rechazo);
    SELECT SCOPE_IDENTITY() AS ID;
END
GO

CREATE PROCEDURE sp_InformeCotejo_Actualizar
    @ID INT,
    @FK_Factura_Compra INT,
    @FK_Usuario INT,
    @Estado NVARCHAR(20),
    @Motivo_Rechazo NVARCHAR(255) = NULL
AS
BEGIN
    UPDATE Informes_Cotejo_Compra
    SET FK_Factura_Compra = @FK_Factura_Compra,
        FK_Usuario = @FK_Usuario,
        Estado = @Estado,
        Motivo_Rechazo = @Motivo_Rechazo
    WHERE ID = @ID;
END
GO

CREATE PROCEDURE sp_InformeCotejo_Eliminar
    @ID INT
AS
BEGIN
    DELETE FROM Informes_Cotejo_Remitos WHERE FK_Informe_Cotejo = @ID;
    DELETE FROM Informes_Cotejo_Ordenes WHERE FK_Informe_Cotejo = @ID;
    DELETE FROM Informes_Cotejo_Compra WHERE ID = @ID;
END
GO

CREATE PROCEDURE sp_InformeCotejo_ObtenerPorId
    @ID INT
AS
BEGIN
    SELECT * FROM Informes_Cotejo_Compra WHERE ID = @ID;
END
GO

CREATE PROCEDURE sp_InformeCotejo_ObtenerTodos
    @Estado NVARCHAR(20) = NULL
AS
BEGIN
    SELECT * FROM Informes_Cotejo_Compra
    WHERE (Estado = @Estado OR @Estado IS NULL)
    ORDER BY Fecha DESC;
END
GO

-- ============================================
-- RELACIONES M:N (6 SPs)
-- ============================================

CREATE PROCEDURE sp_InformeCotejo_AgregarRemito
    @FK_Informe_Cotejo INT,
    @FK_Remito_Ingreso INT
AS
BEGIN
    INSERT INTO Informes_Cotejo_Remitos (FK_Informe_Cotejo, FK_Remito_Ingreso)
    VALUES (@FK_Informe_Cotejo, @FK_Remito_Ingreso);
END
GO

CREATE PROCEDURE sp_InformeCotejo_EliminarRemito
    @FK_Informe_Cotejo INT,
    @FK_Remito_Ingreso INT
AS
BEGIN
    DELETE FROM Informes_Cotejo_Remitos
    WHERE FK_Informe_Cotejo = @FK_Informe_Cotejo
      AND FK_Remito_Ingreso = @FK_Remito_Ingreso;
END
GO

CREATE PROCEDURE sp_InformeCotejo_ObtenerRemitos
    @FK_Informe_Cotejo INT
AS
BEGIN
    SELECT r.* FROM Remitos_Ingreso r
    INNER JOIN Informes_Cotejo_Remitos icr ON r.ID = icr.FK_Remito_Ingreso
    WHERE icr.FK_Informe_Cotejo = @FK_Informe_Cotejo;
END
GO

CREATE PROCEDURE sp_InformeCotejo_AgregarOrden
    @FK_Informe_Cotejo INT,
    @FK_Orden_Compra INT
AS
BEGIN
    INSERT INTO Informes_Cotejo_Ordenes (FK_Informe_Cotejo, FK_Orden_Compra)
    VALUES (@FK_Informe_Cotejo, @FK_Orden_Compra);
END
GO

CREATE PROCEDURE sp_InformeCotejo_EliminarOrden
    @FK_Informe_Cotejo INT,
    @FK_Orden_Compra INT
AS
BEGIN
    DELETE FROM Informes_Cotejo_Ordenes
    WHERE FK_Informe_Cotejo = @FK_Informe_Cotejo
      AND FK_Orden_Compra = @FK_Orden_Compra;
END
GO

CREATE PROCEDURE sp_InformeCotejo_ObtenerOrdenes
    @FK_Informe_Cotejo INT
AS
BEGIN
    SELECT o.* FROM Ordenes_Compra o
    INNER JOIN Informes_Cotejo_Ordenes ico ON o.ID = ico.FK_Orden_Compra
    WHERE ico.FK_Informe_Cotejo = @FK_Informe_Cotejo;
END
GO

PRINT 'Todos los stored procedures fueron creados exitosamente.';
GO