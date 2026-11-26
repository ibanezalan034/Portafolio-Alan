let productos = [];
let carrito = [];
let usuarioActual = null;
let productoEditando = null;

const API_URL = 'http://localhost:5000/api';

// Inicialización
window.onload = async () => {
    await verificarSesion();
};

async function verificarSesion() {
    try {
        const response = await fetch(`${API_URL}/auth/actual`);
        if (response.ok) {
            usuarioActual = await response.json();
            actualizarUIporSesion();
            await cargarProductos();
        }
    } catch (error) {
        console.log('No hay sesión activa');
    }
}

// ============ AUTENTICACIÓN ============
async function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    if (!email || !password) {
        alert('Completa todos los campos');
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        if (response.ok) {
            usuarioActual = await response.json();
            actualizarUIporSesion();
            await cargarProductos();
            document.getElementById('login-email').value = '';
            document.getElementById('login-password').value = '';
            alert(`¡Bienvenido ${usuarioActual.nombre}!`);
        } else {
            alert('Credenciales incorrectas');
        }
    } catch (error) {
        alert('Error de conexión al servidor');
    }
}

async function registro() {
    const nombre = document.getElementById('reg-nombre').value;
    const email = document.getElementById('reg-email').value;
    const telefono = document.getElementById('reg-telefono').value;
    const password = document.getElementById('reg-password').value;
    
    if (!nombre || !email || !password) {
        alert('Completa todos los campos obligatorios');
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/auth/registro`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, email, telefono, password })
        });
        
        if (response.ok) {
            alert('Registro exitoso. Ahora puedes iniciar sesión');
            mostrarTab('login');
            document.getElementById('reg-nombre').value = '';
            document.getElementById('reg-email').value = '';
            document.getElementById('reg-telefono').value = '';
            document.getElementById('reg-password').value = '';
        } else {
            const error = await response.json();
            alert(error.mensaje);
        }
    } catch (error) {
        alert('Error de conexión al servidor');
    }
}

async function logout() {
    await fetch(`${API_URL}/auth/logout`, { method: 'POST' });
    usuarioActual = null;
    carrito = [];
    actualizarUIporSesion();
    mostrarTab('login');
}

function actualizarUIporSesion() {
    const authSection = document.getElementById('login-section');
    const adminPanel = document.getElementById('admin-panel');
    const productosCliente = document.getElementById('productos-cliente');
    const authButtons = document.getElementById('auth-buttons');
    
    if (usuarioActual) {
        authSection.style.display = 'none';
        productosCliente.style.display = 'block';
        authButtons.innerHTML = `<div class="logout-btn" onclick="logout()">👋 ${usuarioActual.nombre} (${usuarioActual.rol}) - Cerrar Sesión</div>`;
        
        if (usuarioActual.rol === 'admin') {
            adminPanel.style.display = 'block';
            cargarUsuarios();
            mostrarProductosAdmin();
        } else {
            adminPanel.style.display = 'none';
        }
    } else {
        authSection.style.display = 'block';
        productosCliente.style.display = 'none';
        adminPanel.style.display = 'none';
        authButtons.innerHTML = '';
    }
}

function mostrarTab(tab) {
    const loginForm = document.getElementById('login-form');
    const registroForm = document.getElementById('registro-form');
    const tabs = document.querySelectorAll('.tab-btn');
    
    tabs.forEach(t => t.classList.remove('active'));
    
    if (tab === 'login') {
        loginForm.style.display = 'flex';
        registroForm.style.display = 'none';
        tabs[0].classList.add('active');
    } else {
        loginForm.style.display = 'none';
        registroForm.style.display = 'flex';
        tabs[1].classList.add('active');
    }
}

// ============ PRODUCTOS ============
async function cargarProductos() {
    try {
        const response = await fetch(`${API_URL}/productos`);
        productos = await response.json();
        
        if (usuarioActual?.rol === 'admin') {
            mostrarProductosAdmin();
        } else if (usuarioActual) {
            mostrarProductosCliente();
        }
    } catch (error) {
        console.error('Error cargando productos:', error);
    }
}

function mostrarProductosCliente() {
    const container = document.getElementById('productos');
    if (!container) return;
    
    if (productos.length === 0) {
        container.innerHTML = '<p style="text-align:center; grid-column:1/-1;">No hay productos disponibles. Contacta al administrador.</p>';
        return;
    }
    
    container.innerHTML = productos.map(p => `
        <div class="producto-card">
            <h3>${p.nombre}</h3>
            <div class="categoria">📁 ${p.categoria || 'General'}</div>
            <div class="precio">$${p.precio.toLocaleString()}</div>
            <div class="stock">📦 Stock: ${p.stock} unidades</div>
            <button onclick="agregarAlCarrito(${p.id})" ${p.stock === 0 ? 'disabled style="opacity:0.5;"' : ''}>
                ${p.stock === 0 ? 'Sin Stock' : 'Agregar al Carrito'}
            </button>
        </div>
    `).join('');
}

function mostrarProductosAdmin() {
    const container = document.getElementById('lista-productos-admin');
    if (!container) return;
    
    if (productos.length === 0) {
        container.innerHTML = '<p>No hay productos cargados.</p>';
        return;
    }
    
    container.innerHTML = productos.map(p => `
        <div class="producto-admin-item">
            <div>
                <strong>${p.nombre}</strong> - $${p.precio.toLocaleString()} - Stock: ${p.stock}
            </div>
            <div>
                <button class="btn-editar" onclick="editarProducto(${p.id})">✏️ Editar</button>
                <button class="btn-eliminar" onclick="eliminarProducto(${p.id})">🗑️ Eliminar</button>
            </div>
        </div>
    `).join('');
}

async function guardarProducto() {
    const nombre = document.getElementById('prod-nombre').value;
    const precio = parseFloat(document.getElementById('prod-precio').value);
    const categoria = document.getElementById('prod-categoria').value;
    const stock = parseInt(document.getElementById('prod-stock').value);
    
    if (!nombre || !precio || isNaN(stock)) {
        alert('Complete los campos requeridos (Nombre, Precio y Stock)');
        return;
    }
    
    const producto = { nombre, precio, categoria, stock };
    
    try {
        let response;
        if (productoEditando) {
            response = await fetch(`${API_URL}/productos/${productoEditando}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...producto, id: productoEditando })
            });
        } else {
            response = await fetch(`${API_URL}/productos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(producto)
            });
        }
        
        if (response.ok) {
            await cargarProductos();
            limpiarFormProducto();
            alert(productoEditando ? 'Producto actualizado' : 'Producto agregado');
        } else {
            alert('Error al guardar producto');
        }
    } catch (error) {
        alert('Error de conexión');
    }
}

function editarProducto(id) {
    const producto = productos.find(p => p.id === id);
    productoEditando = id;
    document.getElementById('prod-nombre').value = producto.nombre;
    document.getElementById('prod-precio').value = producto.precio;
    document.getElementById('prod-categoria').value = producto.categoria || '';
    document.getElementById('prod-stock').value = producto.stock;
    const btn = document.querySelector('.producto-form button');
    if (btn) btn.textContent = 'Actualizar Producto';
}

async function eliminarProducto(id) {
    if (confirm('¿Eliminar este producto permanentemente?')) {
        try {
            const response = await fetch(`${API_URL}/productos/${id}`, { method: 'DELETE' });
            if (response.ok) {
                await cargarProductos();
                alert('Producto eliminado');
            }
        } catch (error) {
            alert('Error al eliminar producto');
        }
    }
}

function limpiarFormProducto() {
    productoEditando = null;
    document.getElementById('prod-nombre').value = '';
    document.getElementById('prod-precio').value = '';
    document.getElementById('prod-categoria').value = '';
    document.getElementById('prod-stock').value = '';
    const btn = document.querySelector('.producto-form button');
    if (btn) btn.textContent = 'Agregar Producto';
}

// ============ USUARIOS (ADMIN) ============
async function cargarUsuarios() {
    try {
        const response = await fetch(`${API_URL}/auth/usuarios`);
        if (response.ok) {
            const usuarios = await response.json();
            const container = document.getElementById('lista-usuarios');
            if (container) {
                container.innerHTML = usuarios.map(u => `
                    <div class="usuario-item">
                        <div>
                            <strong>${u.nombre}</strong> (${u.email}) - Rol: ${u.rol}
                        </div>
                        <button class="btn-eliminar" onclick="eliminarUsuario(${u.id})">Eliminar</button>
                    </div>
                `).join('');
            }
        }
    } catch (error) {
        console.error('Error cargando usuarios:', error);
    }
}

async function eliminarUsuario(id) {
    if (confirm('¿Eliminar este usuario?')) {
        try {
            const response = await fetch(`${API_URL}/auth/usuarios/${id}`, { method: 'DELETE' });
            if (response.ok) {
                await cargarUsuarios();
                alert('Usuario eliminado');
            }
        } catch (error) {
            alert('Error al eliminar usuario');
        }
    }
}

// ============ CARRITO ============
function agregarAlCarrito(productoId) {
    const producto = productos.find(p => p.id === productoId);
    if (!producto || producto.stock <= 0) {
        alert('Producto sin stock disponible');
        return;
    }
    
    const itemExistente = carrito.find(item => item.productoId === productoId);
    if (itemExistente) {
        if (itemExistente.cantidad < producto.stock) {
            itemExistente.cantidad++;
        } else {
            alert('No hay suficiente stock');
            return;
        }
    } else {
        carrito.push({
            productoId: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1
        });
    }
    actualizarCarritoUI();
    alert(`✅ ${producto.nombre} agregado al carrito`);
}

function actualizarCarritoUI() {
    const count = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    const countElement = document.getElementById('carrito-count');
    if (countElement) countElement.textContent = count;
}

function verCarrito() {
    if (carrito.length === 0) {
        alert('El carrito está vacío');
        return;
    }
    
    const modal = document.getElementById('carrito-modal');
    const itemsDiv = document.getElementById('carrito-items');
    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    
    itemsDiv.innerHTML = carrito.map(item => `
        <div class="carrito-item">
            <span>${item.nombre} x ${item.cantidad}</span>
            <span>$${(item.precio * item.cantidad).toLocaleString()}</span>
        </div>
    `).join('');
    
    document.getElementById('carrito-total').textContent = total.toLocaleString();
    modal.style.display = 'block';
}

function cerrarModal() {
    document.getElementById('carrito-modal').style.display = 'none';
}

function vaciarCarrito() {
    if (confirm('¿Vaciar todo el carrito?')) {
        carrito = [];
        actualizarCarritoUI();
        cerrarModal();
    }
}

// ============ COMPRA Y EMAIL ============
async function finalizarCompra() {
    if (carrito.length === 0) {
        alert('El carrito está vacío');
        return;
    }
    
    let emailCliente = usuarioActual?.email;
    let nombreCliente = usuarioActual?.nombre;
    
    if (!usuarioActual) {
        nombreCliente = prompt('Ingresa tu nombre para el recibo:');
        emailCliente = prompt('Ingresa tu email para recibir el comprobante:');
        
        if (!emailCliente || !nombreCliente) {
            alert('Necesitamos tu email y nombre para continuar');
            return;
        }
    }
    
    const btnComprar = document.querySelector('.btn-comprar');
    const textoOriginal = btnComprar?.textContent;
    if (btnComprar) {
        btnComprar.textContent = 'Procesando...';
        btnComprar.disabled = true;
    }
    
    try {
        const response = await fetch(`${API_URL}/carrito/comprar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                carrito: carrito,
                emailCliente: emailCliente,
                nombreCliente: nombreCliente
            })
        });
        
        const resultado = await response.json();
        
        if (response.ok) {
            imprimirRecibo(resultado.recibo);
            
            if (resultado.emailEnviado) {
                alert(`✅ ¡Compra exitosa! Se envió el recibo a ${emailCliente}`);
            } else {
                alert(`✅ ¡Compra exitosa! El recibo se está imprimiendo.`);
            }
            
            vaciarCarrito();
            cerrarModal();
            await cargarProductos();
        } else {
            alert('Error al procesar la compra');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error de conexión al procesar la compra');
    } finally {
        if (btnComprar) {
            btnComprar.textContent = textoOriginal;
            btnComprar.disabled = false;
        }
    }
}

function imprimirRecibo(recibo) {
    const ventana = window.open('', '_blank');
    const itemsHtml = recibo.items.map(item => `
        <div class="item">
            <span>${item.nombre} x ${item.cantidad}</span>
            <span>$${(item.precio * item.cantidad).toFixed(2)}</span>
        </div>
    `).join('');
    
    ventana.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Recibo de Compra - Kiosco El Amigo</title>
            <style>
                @media print {
                    body { margin: 0; padding: 20px; }
                    .no-print { display: none; }
                }
                body {
                    font-family: 'Courier New', monospace;
                    padding: 20px;
                    margin: 0;
                }
                .recibo {
                    max-width: 350px;
                    margin: 0 auto;
                    border: 1px solid #ddd;
                    padding: 20px;
                    border-radius: 10px;
                }
                .header {
                    text-align: center;
                    border-bottom: 1px dashed #000;
                    margin-bottom: 15px;
                    padding-bottom: 10px;
                }
                .header h3 {
                    margin: 0;
                    color: #ff6b35;
                }
                .item {
                    display: flex;
                    justify-content: space-between;
                    margin: 8px 0;
                    font-size: 12px;
                }
                .total {
                    border-top: 1px solid #000;
                    margin-top: 15px;
                    padding-top: 10px;
                    font-weight: bold;
                    font-size: 14px;
                }
                .footer {
                    text-align: center;
                    margin-top: 20px;
                    font-size: 10px;
                    color: #666;
                }
                .no-print {
                    text-align: center;
                    margin-top: 20px;
                }
                button {
                    background: #ff6b35;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    margin: 0 5px;
                }
            </style>
        </head>
        <body>
            <div class="recibo">
                <div class="header">
                    <h3>🏪 Kiosco "El Amigo"</h3>
                    <p>Recibo #${recibo.reciboId}</p>
                    <p>${new Date(recibo.fecha).toLocaleString()}</p>
                </div>
                <div class="items">
                    ${itemsHtml}
                </div>
                <div class="total">
                    <div class="item">
                        <span>TOTAL:</span>
                        <span>$${recibo.total.toFixed(2)}</span>
                    </div>
                </div>
                <div class="footer">
                    <p>¡Gracias por su compra!</p>
                </div>
            </div>
            <div class="no-print">
                <button onclick="window.print()">🖨️ Imprimir</button>
                <button onclick="window.close()">✖️ Cerrar</button>
            </div>
            <script>setTimeout(() => window.print(), 500);<\/script>
        </body>
        </html>
    `);
}