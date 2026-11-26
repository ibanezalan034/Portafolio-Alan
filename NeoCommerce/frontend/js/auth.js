const API_URL = 'http://localhost:3000/api';

const showToast = (msg, type = 'info') => {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.className = 'toast show ' + type;
    setTimeout(() => toast.className = 'toast ' + type, 3500);
};

const openModal = (id) => document.getElementById(id).classList.add('active');
const closeModal = (id) => document.getElementById(id).classList.remove('active');

const saveSession = (token, usuario) => {
    localStorage.setItem('neo_token', token);
    localStorage.setItem('neo_user', JSON.stringify(usuario));
};

const getSession = () => {
    const token = localStorage.getItem('neo_token');
    const user = localStorage.getItem('neo_user');
    return token && user ? { token, usuario: JSON.parse(user) } : null;
};

const clearSession = () => {
    localStorage.removeItem('neo_token');
    localStorage.removeItem('neo_user');
};

const switchView = (viewName) => {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    const target = document.getElementById('view-' + viewName);
    if (target) target.classList.add('active');
};

const actualizarUIUsuario = () => {
    const sesion = getSession();
    const userInfo = document.getElementById('userInfo');
    const btnLogin = document.getElementById('btnLogin');
    const btnRegister = document.getElementById('btnRegister');

    if (!userInfo || !btnLogin || !btnRegister) return;

    if (sesion) {
        btnLogin.style.display = 'none';
        btnRegister.style.display = 'none';
        userInfo.style.display = 'flex';
        document.getElementById('userBadge').textContent = `${sesion.usuario.nombre} • ${sesion.usuario.rol}`;
    } else {
        btnLogin.style.display = 'block';
        btnRegister.style.display = 'block';
        userInfo.style.display = 'none';
    }
};

const mostrarDashboard = (usuario) => {
    const title = document.getElementById('dashboardTitle');
    const content = document.getElementById('dashboardContent');
    if (!title || !content) return;

    title.textContent = `PANEL ${usuario.rol.toUpperCase()}`;

    const dashboards = {
        'Administrador': [{ titulo: 'Usuarios Activos', num: '24', desc: 'Total en el sistema' }, { titulo: 'Ventas del Día', num: '$12,450', desc: 'Ingresos totales' }, { titulo: 'Productos', num: '156', desc: 'En catálogo' }, { titulo: 'Proveedores', num: '8', desc: 'Registrados' }],
        'Gerente': [{ titulo: 'Reporte Mensual', num: '$248K', desc: 'Ventas del mes' }, { titulo: 'Stock Crítico', num: '12', desc: 'Productos por reponer' }, { titulo: 'Empleados', num: '18', desc: 'Cajeros y reponedores' }],
        'Cajero': [{ titulo: 'Ventas Hoy', num: '42', desc: 'Transacciones realizadas' }, { titulo: 'Monto Total', num: '$3,280', desc: 'Caja actual' }, { titulo: 'Turno', num: 'Activo', desc: 'Estado del turno' }],
        'Repositor': [{ titulo: 'Productos Bajo Stock', num: '15', desc: 'Requieren reposición' }, { titulo: 'Reposiciones Hoy', num: '8', desc: 'Completadas' }, { titulo: 'Movimientos', num: '23', desc: 'Registrados hoy' }],
        'Proveedor': [{ titulo: 'Pedidos Pendientes', num: '6', desc: 'Por entregar' }, { titulo: 'Productos Surtidos', num: '45', desc: 'En catálogo' }, { titulo: 'Entregas Mes', num: '28', desc: 'Completadas' }]
    };

    const cards = dashboards[usuario.rol] || dashboards['Cajero'];
    content.innerHTML = cards.map(c => `
        <div class="dashboard-card">
            <h3>${c.titulo}</h3>
            <div class="big-number">${c.num}</div>
            <p style="color: var(--text-secondary); margin-top: 8px;">${c.desc}</p>
        </div>
    `).join('');

    switchView('dashboard');
};

const cargarRoles = async () => {
    try {
        const res = await fetch(`${API_URL}/auth/roles`);
        const roles = await res.json();
        const select = document.getElementById('regRol');
        if (!select) return;
        select.innerHTML = '<option value="">Selecciona un rol</option>';
        roles.forEach(r => {
            const opt = document.createElement('option');
            opt.value = r.RolID;
            opt.textContent = r.NombreRol;
            opt.dataset.requiereCodigo = r.RequiereCodigo;
            select.appendChild(opt);
        });
    } catch (err) {
        console.error('Error cargando roles:', err);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    cargarRoles();

    const regRol = document.getElementById('regRol');
    if (regRol) {
        regRol.addEventListener('change', (e) => {
            const opt = e.target.selectedOptions[0];
            const requiere = opt?.dataset.requiereCodigo === 'true';
            const codigoGroup = document.getElementById('codigoGroup');
            const regCodigo = document.getElementById('regCodigo');
            if (codigoGroup) codigoGroup.style.display = requiere ? 'block' : 'none';
            if (regCodigo) regCodigo.required = requiere;
        });
    }

    const formLogin = document.getElementById('formLogin');
    if (formLogin) {
        formLogin.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            try {
                const res = await fetch(`${API_URL}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
                const data = await res.json();

                if (!res.ok) {
                    showToast(data.error || 'Error al iniciar sesión', 'error');
                    return;
                }

                saveSession(data.token, data.usuario);
                showToast(`¡Bienvenido, ${data.usuario.nombre}!`, 'success');
                closeModal('modalLogin');
                e.target.reset();
                actualizarUIUsuario();
                mostrarDashboard(data.usuario);
            } catch (err) {
                console.error(err);
                showToast('Error de conexión', 'error');
            }
        });
    }

    const formRegister = document.getElementById('formRegister');
    if (formRegister) {
        formRegister.addEventListener('submit', async (e) => {
            e.preventDefault();
            const payload = {
                nombreCompleto: document.getElementById('regNombre').value,
                email: document.getElementById('regEmail').value,
                password: document.getElementById('regPassword').value,
                rolID: parseInt(document.getElementById('regRol').value),
                codigo: document.getElementById('regCodigo').value || null,
                telefono: document.getElementById('regTelefono').value || null
            };

            try {
                const res = await fetch(`${API_URL}/auth/registro`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
                const data = await res.json();

                if (!res.ok) {
                    showToast(data.error || 'Error al registrar', 'error');
                    return;
                }

                showToast('¡Registro exitoso! Ya puedes iniciar sesión', 'success');
                closeModal('modalRegister');
                e.target.reset();
                const cg = document.getElementById('codigoGroup');
                if (cg) cg.style.display = 'none';
                setTimeout(() => openModal('modalLogin'), 800);
            } catch (err) {
                console.error(err);
                showToast('Error de conexión', 'error');
            }
        });
    }
});

window.switchView = switchView;
window.openModal = openModal;
window.closeModal = closeModal;
window.showToast = showToast;
window.getSession = getSession;
window.clearSession = clearSession;
window.saveSession = saveSession;
window.actualizarUIUsuario = actualizarUIUsuario;
window.mostrarDashboard = mostrarDashboard;