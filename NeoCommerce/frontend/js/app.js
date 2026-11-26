const API = 'http://localhost:3000/api';
let carrito = [];

// ============================================
// TIENDA
// ============================================
const cargarTienda = async () => {
    try {
        const res = await fetch(`${API}/productos`);
        const productos = await res.json();
        const grid = document.getElementById('tiendaProductsGrid');
        if (!grid) return;

        if (productos.length === 0) { grid.innerHTML = '<p style="color: var(--text-secondary); text-align:center; grid-column: 1/-1;">No hay productos disponibles</p>'; return; }

        const icons = { 'Tecnología': '💻', 'Audio': '🎧', 'Wearables': '⌚', 'Accesorios': '🖱️', 'General': '📦' };
        grid.innerHTML = productos.map(p => `
            <div class="product-card">
                <div class="product-img">${icons[p.Categoria] || '📦'}</div>
                <h3>${p.Nombre}</h3>
                <p style="color: var(--text-secondary); font-size: 13px; margin-bottom: 10px;">${p.Categoria || 'General'}</p>
                <div class="product-price">$${parseFloat(p.Precio).toFixed(2)}</div>
                <div class="product-stock">Stock: ${p.Stock} unidades</div>
                <button class="add-to-cart-btn" onclick='agregarAlCarrito(${JSON.stringify(p).replace(/'/g, "&apos;")})'>+ AGREGAR AL CARRITO</button>
            </div>
        `).join('');
    } catch (err) { showToast('Error al cargar productos', 'error'); }
};

const cargarProductos = async () => {
    try {
        const res = await fetch(`${API}/productos`);
        const productos = await res.json();
        const grid = document.getElementById('productsGrid');
        if (!grid) return;

        const icons = { 'Tecnología': '💻', 'Audio': '🎧', 'Wearables': '⌚', 'Accesorios': '🖱️', 'General': '📦' };
        grid.innerHTML = productos.map(p => `
            <div class="product-card">
                <div class="product-img">${icons[p.Categoria] || '📦'}</div>
                <h3>${p.Nombre}</h3>
                <div class="product-price">$${parseFloat(p.Precio).toFixed(2)}</div>
                <div class="product-stock">Stock: ${p.Stock}</div>
                <button class="add-to-cart-btn" onclick='agregarAlCarrito(${JSON.stringify(p).replace(/'/g, "&apos;")})'>+ AGREGAR</button>
            </div>
        `).join('');
    } catch (err) { showToast('Error al cargar productos', 'error'); }
};

// ============================================
// CARRITO
// ============================================
const agregarAlCarrito = (producto) => {
    if (producto.Stock <= 0) { showToast('Producto sin stock', 'error'); return; }
    const existente = carrito.find(i => i.productoID === producto.ProductoID);
    if (existente) {
        if (existente.cantidad >= producto.Stock) { showToast('No hay más stock', 'error'); return; }
        existente.cantidad++;
    } else {
        carrito.push({ productoID: producto.ProductoID, nombre: producto.Nombre, precio: parseFloat(producto.Precio), cantidad: 1, stockMax: producto.Stock });
    }
    renderCarrito();
    showToast(`${producto.Nombre} agregado`, 'success');
};

const cambiarCantidad = (productoID, delta) => {
    const item = carrito.find(i => i.productoID === productoID);
    if (!item) return;
    item.cantidad += delta;
    if (item.cantidad <= 0) { carrito = carrito.filter(i => i.productoID !== productoID); }
    else if (item.cantidad > item.stockMax) { item.cantidad = item.stockMax; showToast('No hay más stock', 'error'); }
    renderCarrito();
};

const eliminarDelCarrito = (productoID) => { carrito = carrito.filter(i => i.productoID !== productoID); renderCarrito(); };

const renderCarrito = () => {
    const itemsDiv = document.getElementById('cartItems');
    const count = document.getElementById('cartCount');
    const btnCheckout = document.getElementById('btnCheckout');
    if (!itemsDiv || !count) return;

    const totalItems = carrito.reduce((s, i) => s + i.cantidad, 0);
    count.textContent = totalItems;

    if (carrito.length === 0) {
        itemsDiv.innerHTML = '<p class="empty-cart">El carrito está vacío</p>';
    } else {
        itemsDiv.innerHTML = carrito.map(i => `
            <div class="cart-item">
                <div class="cart-item-info"><h4>${i.nombre}</h4><span>$${(i.precio * i.cantidad).toFixed(2)}</span></div>
                <div class="cart-item-controls">
                    <button class="qty-btn" onclick="cambiarCantidad(${i.productoID}, -1)">−</button>
                    <span class="qty-value">${i.cantidad}</span>
                    <button class="qty-btn" onclick="cambiarCantidad(${i.productoID}, 1)">+</button>
                    <button class="remove-item" onclick="eliminarDelCarrito(${i.productoID})">×</button>
                </div>
            </div>
        `).join('');
    }

    const subtotal = carrito.reduce((s, i) => s + i.precio * i.cantidad, 0);
    const iva = subtotal * 0.21;
    const total = subtotal + iva;

    document.getElementById('cartSubtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('cartIVA').textContent = `$${iva.toFixed(2)}`;
    document.getElementById('cartTotal').textContent = `$${total.toFixed(2)}`;
    if (btnCheckout) btnCheckout.disabled = carrito.length === 0;
};

// ============================================
// CHECKOUT CLIENTE
// ============================================
const iniciarCheckout = () => {
    if (carrito.length === 0) { showToast('El carrito está vacío', 'error'); return; }
    const subtotal = carrito.reduce((s, i) => s + i.precio * i.cantidad, 0);
    const iva = subtotal * 0.21;
    const total = subtotal + iva;

    document.getElementById('checkSubtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('checkIVA').textContent = `$${iva.toFixed(2)}`;
    document.getElementById('checkTotal').textContent = `$${total.toFixed(2)}`;
    document.getElementById('cuotasGroup').style.display = 'none';
    document.getElementById('cuotaInfo').style.display = 'none';

    openModal('modalCheckout');
};

const actualizarMontoCuota = () => {
    const total = parseFloat(document.getElementById('checkTotal').textContent.replace('$', ''));
    const cuotas = parseInt(document.getElementById('checkCuotas').value) || 1;
    document.getElementById('checkMontoCuota').textContent = `$${(total / cuotas).toFixed(2)}`;
    document.getElementById('cuotaInfo').style.display = 'flex';
};

const mostrarPedidoConfirmado = (pedido) => {
    const fecha = new Date(pedido.fecha).toLocaleString('es-AR');
    document.getElementById('pedidoConfirmadoContent').innerHTML = `
        <h2>PEDIDO CONFIRMADO</h2>
        <p class="factura-num">N° ${pedido.numero}</p>
        <div class="factura-info">
            <p><strong>Fecha:</strong> ${fecha}</p>
            <p><strong>Cliente:</strong> ${pedido.cliente}</p>
            <p><strong>Forma de pago:</strong> ${pedido.formaPago}${pedido.formaPago === 'Cuotas' ? ' - ' + pedido.cuotas + ' cuotas de $' + pedido.montoCuota : ''}</p>
        </div>
        <div class="totales">
            <p><span>Subtotal:</span> <span>$${pedido.subtotal}</span></p>
            <p><span>IVA (21%):</span> <span>$${pedido.iva}</span></p>
            <p class="total-final"><span>TOTAL:</span> <span>$${pedido.total}</span></p>
        </div>
        <p style="text-align: center; margin-top: 20px; color: #666; font-size: 13px;">⏳ Tu pedido quedó pendiente de aprobación.</p>
    `;
    openModal('modalPedidoConfirmado');
};

// ============================================
// ADMIN PEDIDOS
// ============================================
const cargarAdminPedidos = async () => {
    try {
        const res = await fetch(`${API}/pedidos`);
        const pedidos = await res.json();
        const tbody = document.getElementById('adminPedidosTable');
        if (!tbody) return;

        if (pedidos.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding: 30px;">No hay pedidos</td></tr>';
            return;
        }

        tbody.innerHTML = pedidos.map(p => {
            const fecha = new Date(p.FechaPedido).toLocaleString('es-AR');
            const estadoClass = p.Estado === 'Aprobado' ? 'badge-aprobado' :
                                p.Estado === 'Rechazado' ? 'badge-rechazado' : 'badge-pendiente';

            let acciones = '';
            if (p.Estado === 'Pendiente') {
                acciones = `
                    <button class="action-btn btn-approve" onclick="aprobarPedido(${p.PedidoID})">✅ Aprobar</button>
                    <button class="action-btn btn-reject" onclick="rechazarPedido(${p.PedidoID})">❌ Rechazar</button>
                `;
            } else {
                acciones = '<span style="color: var(--text-secondary); font-size: 12px;">Procesado</span>';
            }

            const pagoTexto = p.FormaPago === 'Cuotas' 
                ? `💳 ${p.Cuotas} cuotas de $${parseFloat(p.MontoCuota).toFixed(2)}`
                : '💵 Contado';

            return `
                <tr>
                    <td>${p.NumeroPedido}</td>
                    <td>${fecha}</td>
                    <td>${p.ClienteNombre}<br><small style="color: var(--text-secondary);">${p.ClienteEmail}</small></td>
                    <td style="color: var(--neon-cyan); font-weight: 700;">$${parseFloat(p.Total).toFixed(2)}</td>
                    <td>${pagoTexto}</td>
                    <td><span class="badge ${estadoClass}">${p.Estado.toUpperCase()}</span></td>
                    <td>${acciones}</td>
                </tr>
            `;
        }).join('');
    } catch (err) {
        console.error(err);
        showToast('Error al cargar pedidos', 'error');
    }
};

const aprobarPedido = async (id) => {
    if (!confirm('¿Aprobar este pedido? Se descontará el stock.')) return;
    const sesion = getSession();
    try {
        const res = await fetch(`${API}/pedidos/${id}/aprobar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ adminID: sesion ? sesion.usuario.id : 1 })
        });
        const data = await res.json();
        if (res.ok) {
            showToast('✅ Pedido aprobado', 'success');
            cargarAdminPedidos();
        } else {
            showToast(data.error || 'Error al aprobar', 'error');
        }
    } catch (err) {
        showToast('Error de conexión', 'error');
    }
};

const rechazarPedido = async (id) => {
    const motivo = prompt('Motivo del rechazo:');
    if (motivo === null) return;
    const sesion = getSession();
    try {
        const res = await fetch(`${API}/pedidos/${id}/rechazar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                adminID: sesion ? sesion.usuario.id : 1,
                motivo: motivo || 'Rechazado'
            })
        });
        if (res.ok) {
            showToast('Pedido rechazado', 'info');
            cargarAdminPedidos();
        }
    } catch (err) {
        showToast('Error de conexión', 'error');
    }
};

const cierreDelDia = async () => {
    if (!confirm('¿Realizar el cierre del día? Se guardará el resumen en la base de datos.')) return;
    const sesion = getSession();
    try {
        const res = await fetch(`${API}/pedidos/cierre-diario`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ adminID: sesion ? sesion.usuario.id : 1 })
        });
        const data = await res.json();
        if (res.ok) {
            showToast('🌙 Cierre del día guardado', 'success');
            alert(`CIERRE DEL DÍA - ${data.resumen.fecha}\n\n` +
                  `Pedidos: ${data.resumen.cantidadPedidos}\n` +
                  `Neto: $${data.resumen.totalNeto}\n` +
                  `IVA: $${data.resumen.totalIVA}\n` +
                  `TOTAL: $${data.resumen.totalVentas}\n\n` +
                  `Contado: $${data.resumen.totalContado}\n` +
                  `Cuotas: $${data.resumen.totalCuotas}`);
            cargarCierres();
        } else {
            showToast(data.error || 'Error al cerrar', 'error');
        }
    } catch (err) {
        showToast('Error de conexión', 'error');
    }
};

const cargarCierres = async () => {
    try {
        const res = await fetch(`${API}/pedidos/cierres/lista`);
        const cierres = await res.json();
        const tbody = document.getElementById('cierresTable');
        if (!tbody) return;

        if (cierres.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding: 30px;">No hay cierres registrados</td></tr>';
            return;
        }

        tbody.innerHTML = cierres.map(c => `
            <tr>
                <td>${new Date(c.Fecha).toLocaleDateString('es-AR')}</td>
                <td>${c.CantidadPedidos}</td>
                <td>$${parseFloat(c.TotalNeto).toFixed(2)}</td>
                <td>$${parseFloat(c.TotalIVA).toFixed(2)}</td>
                <td style="color: var(--neon-cyan); font-weight: 700;">$${parseFloat(c.TotalVentas).toFixed(2)}</td>
                <td>$${parseFloat(c.TotalContado).toFixed(2)}</td>
                <td>$${parseFloat(c.TotalCuotas).toFixed(2)}</td>
            </tr>
        `).join('');
    } catch (err) {
        console.error(err);
    }
};

// ============================================
// ADMIN PRODUCTOS
// ============================================
const cargarAdminProductos = async () => {
    try {
        const res = await fetch(`${API}/productos/todos`);
        const productos = await res.json();
        const tbody = document.getElementById('adminProductsTable');
        if (!tbody) return;

        if (productos.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding: 30px;">No hay productos</td></tr>';
            return;
        }

        tbody.innerHTML = productos.map(p => `
            <tr>
                <td>${p.ProductoID}</td>
                <td>${p.Nombre}</td>
                <td>${p.Categoria || 'General'}</td>
                <td>$${parseFloat(p.Precio).toFixed(2)}</td>
                <td>${p.Stock}</td>
                <td>
                    <span class="badge ${p.Activo ? 'badge-activo' : 'badge-inactivo'}">
                        ${p.Activo ? 'ACTIVO' : 'INACTIVO'}
                    </span>
                </td>
                <td>
                    <button class="action-btn action-edit" onclick='editarProducto(${JSON.stringify(p).replace(/'/g, "&apos;")})'>✏️ Editar</button>
                    <button class="action-btn action-return" onclick='abrirDevolver(${JSON.stringify(p).replace(/'/g, "&apos;")})'>📦 Devolver</button>
                    ${p.Activo 
                        ? `<button class="action-btn action-delete" onclick="darDeBaja(${p.ProductoID})">🗑️ Baja</button>`
                        : `<button class="action-btn action-reactivate" onclick="reactivar(${p.ProductoID})">♻️ Reactivar</button>`
                    }
                </td>
            </tr>
        `).join('');
    } catch (err) {
        console.error(err);
        showToast('Error al cargar productos', 'error');
    }
};

const abrirNuevoProducto = () => {
    document.getElementById('modalProductoTitle').textContent = 'NUEVO PRODUCTO';
    document.getElementById('formProducto').reset();
    document.getElementById('prodID').value = '';
    openModal('modalProducto');
};

const editarProducto = (p) => {
    document.getElementById('modalProductoTitle').textContent = 'EDITAR PRODUCTO';
    document.getElementById('prodID').value = p.ProductoID;
    document.getElementById('prodNombre').value = p.Nombre;
    document.getElementById('prodCategoria').value = p.Categoria || '';
    document.getElementById('prodPrecio').value = p.Precio;
    document.getElementById('prodStock').value = p.Stock;
    document.getElementById('prodDescripcion').value = p.Descripcion || '';
    openModal('modalProducto');
};

const abrirDevolver = (p) => {
    document.getElementById('devProdID').value = p.ProductoID;
    document.getElementById('devProdNombre').textContent = p.Nombre;
    document.getElementById('formDevolver').reset();
    document.getElementById('devProdID').value = p.ProductoID;
    openModal('modalDevolver');
};

const darDeBaja = async (id) => {
    if (!confirm('¿Dar de baja este producto? (obsoleto/roto)')) return;
    try {
        const res = await fetch(`${API}/productos/${id}`, { method: 'DELETE' });
        if (res.ok) {
            showToast('Producto dado de baja', 'success');
            cargarAdminProductos();
        }
    } catch (err) {
        showToast('Error', 'error');
    }
};

const reactivar = async (id) => {
    try {
        const res = await fetch(`${API}/productos/${id}/reactivar`, { method: 'PUT' });
        if (res.ok) {
            showToast('Producto reactivado', 'success');
            cargarAdminProductos();
        }
    } catch (err) {
        showToast('Error', 'error');
    }
};

// ============================================
// PARTÍCULAS
// ============================================
const crearParticulas = () => {
    const container = document.getElementById('particles');
    if (!container) return;
    for (let i = 0; i < 40; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.animationDuration = (Math.random() * 8 + 5) + 's';
        p.style.animationDelay = Math.random() * 5 + 's';
        if (Math.random() > 0.5) { p.style.background = '#b026ff'; p.style.boxShadow = '0 0 10px #b026ff'; }
        container.appendChild(p);
    }
};

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    crearParticulas();
    actualizarUIUsuario();
    renderCarrito();

    const sesion = getSession();
    if (sesion) mostrarDashboard(sesion.usuario);

    document.querySelectorAll('.nav-btn[data-view]').forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.dataset.view;
            if (view === 'tienda') cargarTienda();
            if (view === 'productos') cargarProductos();
            if (view === 'admin-productos') cargarAdminProductos();
            if (view === 'admin-pedidos') { cargarAdminPedidos(); cargarCierres(); }
            switchView(view);
        });
    });

    document.getElementById('btnLogin').addEventListener('click', () => openModal('modalLogin'));
    document.getElementById('btnRegister').addEventListener('click', () => openModal('modalRegister'));
    document.getElementById('heroLogin').addEventListener('click', () => openModal('modalLogin'));
    document.getElementById('heroRegister').addEventListener('click', () => openModal('modalRegister'));
    document.getElementById('linkToRegister').addEventListener('click', (e) => { e.preventDefault(); closeModal('modalLogin'); openModal('modalRegister'); });
    document.getElementById('linkToLogin').addEventListener('click', (e) => { e.preventDefault(); closeModal('modalRegister'); openModal('modalLogin'); });
    document.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', () => closeModal(el.dataset.close)));
    document.querySelectorAll('.modal').forEach(m => m.addEventListener('click', (e) => { if (e.target === m) m.classList.remove('active'); }));

    document.getElementById('btnLogout').addEventListener('click', () => { clearSession(); showToast('Sesión cerrada', 'info'); actualizarUIUsuario(); switchView('home'); });
    document.querySelectorAll('.role-card').forEach(card => card.addEventListener('click', () => openModal('modalRegister')));

    const btnCheckout = document.getElementById('btnCheckout');
    if (btnCheckout) btnCheckout.addEventListener('click', iniciarCheckout);

    const formCheckout = document.getElementById('formCheckout');
    if (formCheckout) {
        formCheckout.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formaPago = document.querySelector('input[name="formaPago"]:checked').value;
            const payload = {
                clienteNombre: document.getElementById('checkNombre').value,
                clienteEmail: document.getElementById('checkEmail').value,
                clienteTelefono: document.getElementById('checkTelefono').value,
                clienteDireccion: document.getElementById('checkDireccion').value,
                formaPago, cuotas: formaPago === 'Cuotas' ? parseInt(document.getElementById('checkCuotas').value) : 1,
                items: carrito.map(i => ({ productoID: i.productoID, nombre: i.nombre, cantidad: i.cantidad, precio: i.precio }))
            };
            try {
                const res = await fetch(`${API}/pedidos`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
                const data = await res.json();
                if (res.ok) { mostrarPedidoConfirmado(data.pedido); carrito = []; renderCarrito(); closeModal('modalCheckout'); formCheckout.reset(); showToast('¡Pedido enviado!', 'success'); }
                else { showToast(data.error || 'Error', 'error'); }
            } catch (err) { showToast('Error de conexión', 'error'); }
        });
    }

    document.querySelectorAll('input[name="formaPago"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            const cuotasGroup = document.getElementById('cuotasGroup');
            const cuotaInfo = document.getElementById('cuotaInfo');
            if (e.target.value === 'Cuotas') { if (cuotasGroup) cuotasGroup.style.display = 'block'; actualizarMontoCuota(); }
            else { if (cuotasGroup) cuotasGroup.style.display = 'none'; if (cuotaInfo) cuotaInfo.style.display = 'none'; }
        });
    });

    const checkCuotas = document.getElementById('checkCuotas');
    if (checkCuotas) checkCuotas.addEventListener('change', actualizarMontoCuota);

    const btnCerrarPedido = document.getElementById('btnCerrarPedido');
    if (btnCerrarPedido) btnCerrarPedido.addEventListener('click', () => { closeModal('modalPedidoConfirmado'); switchView('tienda'); });

    const btnCierre = document.getElementById('btnCierreDiario');
    if (btnCierre) btnCierre.addEventListener('click', cierreDelDia);

    const btnNuevo = document.getElementById('btnNuevoProducto');
    if (btnNuevo) btnNuevo.addEventListener('click', abrirNuevoProducto);

    const formProducto = document.getElementById('formProducto');
    if (formProducto) {
        formProducto.addEventListener('submit', async (e) => {
            e.preventDefault();
            const id = document.getElementById('prodID').value;
            const payload = { nombre: document.getElementById('prodNombre').value, categoria: document.getElementById('prodCategoria').value, precio: parseFloat(document.getElementById('prodPrecio').value), stock: parseInt(document.getElementById('prodStock').value), descripcion: document.getElementById('prodDescripcion').value };
            try {
                const url = id ? `${API}/productos/${id}` : `${API}/productos`;
                const method = id ? 'PUT' : 'POST';
                const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
                const data = await res.json();
                if (res.ok) { showToast(id ? 'Producto actualizado' : 'Producto creado', 'success'); closeModal('modalProducto'); cargarAdminProductos(); }
                else { showToast(data.error || 'Error', 'error'); }
            } catch (err) { showToast('Error de conexión', 'error'); }
        });
    }

    const formDevolver = document.getElementById('formDevolver');
    if (formDevolver) {
        formDevolver.addEventListener('submit', async (e) => {
            e.preventDefault();
            const id = document.getElementById('devProdID').value;
            const sesion = getSession();
            const payload = { cantidad: parseInt(document.getElementById('devCantidad').value), motivo: document.getElementById('devMotivo').value, usuarioID: sesion ? sesion.usuario.id : 1 };
            try {
                const res = await fetch(`${API}/productos/${id}/devolver`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
                if (res.ok) { showToast('Devuelto al almacén', 'success'); closeModal('modalDevolver'); cargarAdminProductos(); }
            } catch (err) { showToast('Error', 'error'); }
        });
    }

    const btnImprimir = document.getElementById('btnImprimirFactura');
    if (btnImprimir) btnImprimir.addEventListener('click', () => window.print());

    const sesionCheck = getSession();
    if (sesionCheck && sesionCheck.usuario.rol === 'Administrador') {
        const nav = document.querySelector('.nav');
        if (nav && !document.getElementById('navAdminProd')) {
            const btn = document.createElement('button');
            btn.className = 'nav-btn'; btn.id = 'navAdminProd'; btn.dataset.view = 'admin-productos'; btn.textContent = 'ADMIN PRODUCTOS';
            btn.addEventListener('click', () => { cargarAdminProductos(); switchView('admin-productos'); });
            const btnLogin = document.getElementById('btnLogin');
            if (btnLogin) nav.insertBefore(btn, btnLogin); else nav.appendChild(btn);
        }
        if (nav && !document.getElementById('navAdminPedidos')) {
            const btn2 = document.createElement('button');
            btn2.className = 'nav-btn'; btn2.id = 'navAdminPedidos'; btn2.dataset.view = 'admin-pedidos'; btn2.textContent = '📋 PEDIDOS';
            btn2.style.borderColor = '#ffaa00'; btn2.style.color = '#ffaa00';
            btn2.addEventListener('click', () => { cargarAdminPedidos(); cargarCierres(); switchView('admin-pedidos'); });
            const btnLogin = document.getElementById('btnLogin');
            if (btnLogin) nav.insertBefore(btn2, btnLogin); else nav.appendChild(btn2);
        }
    }
});

window.agregarAlCarrito = agregarAlCarrito;
window.cambiarCantidad = cambiarCantidad;
window.eliminarDelCarrito = eliminarDelCarrito;
window.editarProducto = editarProducto;
window.abrirDevolver = abrirDevolver;
window.darDeBaja = darDeBaja;
window.reactivar = reactivar;
window.aprobarPedido = aprobarPedido;
window.rechazarPedido = rechazarPedido;
window.cargarTienda = cargarTienda;