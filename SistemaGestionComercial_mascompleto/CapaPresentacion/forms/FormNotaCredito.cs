using System;
using System.Windows.Forms;
using CapaDatos.Entidades;
using CapaLogica;

namespace CapaPresentacion.Forms
{
    public partial class FormNotaCredito : Form
    {
        private NotasLogica _logica = new NotasLogica();
        private CatalogosLogica _catalogos = new CatalogosLogica();
        private int _idSeleccionado = 0;

        public FormNotaCredito()
        {
            InitializeComponent();
        }

        private void FormNotaCredito_Load(object sender, EventArgs e)
        {
            CargarCombos();
            CargarGrilla();
        }

        private void CargarCombos()
        {
            cboProveedor.DataSource = _catalogos.ObtenerProveedores();
            cboProveedor.DisplayMember = "Razon_Social";
            cboProveedor.ValueMember = "ID";

            cboFactura.DataSource = _catalogos.ObtenerFacturas();
            cboFactura.DisplayMember = "Numero_Factura";
            cboFactura.ValueMember = "ID";
        }

        private void CargarGrilla()
        {
            try
            {
                dgvNotas.DataSource = null;
                dgvNotas.DataSource = _logica.ObtenerNotasCredito();
            }
            catch (Exception ex)
            {
                MessageBox.Show("Error al cargar notas: " + ex.Message);
            }
        }

        private void btnGuardar_Click(object sender, EventArgs e)
        {
            try
            {
                if (cboProveedor.SelectedItem == null || cboFactura.SelectedItem == null)
                {
                    MessageBox.Show("Debe seleccionar proveedor y factura.");
                    return;
                }

                decimal monto;
                if (!decimal.TryParse(txtMonto.Text, out monto))
                {
                    MessageBox.Show("El monto debe ser un número válido.");
                    return;
                }

                var nota = new NotaCreditoCompra
                {
                    ID = _idSeleccionado,
                    FK_Proveedor = ((ProveedorSimple)cboProveedor.SelectedItem).ID,
                    FK_Factura_Compra = ((FacturaSimple)cboFactura.SelectedItem).ID,
                    Monto = monto,
                    Motivo = txtMotivo.Text.Trim()
                };

                if (_idSeleccionado == 0)
                {
                    _logica.CrearNotaCredito(nota);
                    MessageBox.Show("Nota creada correctamente.");
                }
                else
                {
                    _logica.ActualizarNotaCredito(nota);
                    MessageBox.Show("Nota actualizada correctamente.");
                }

                Limpiar();
                CargarGrilla();
            }
            catch (Exception ex)
            {
                MessageBox.Show("Error: " + ex.Message);
            }
        }

        private void btnEliminar_Click(object sender, EventArgs e)
        {
            if (_idSeleccionado == 0)
            {
                MessageBox.Show("Seleccione una nota de la grilla.");
                return;
            }

            if (MessageBox.Show("¿Confirma eliminar esta nota?", "Confirmar",
                MessageBoxButtons.YesNo) == DialogResult.Yes)
            {
                try
                {
                    _logica.EliminarNotaCredito(_idSeleccionado);
                    Limpiar();
                    CargarGrilla();
                }
                catch (Exception ex)
                {
                    MessageBox.Show("Error: " + ex.Message);
                }
            }
        }

        private void btnLimpiar_Click(object sender, EventArgs e)
        {
            Limpiar();
        }

        private void Limpiar()
        {
            _idSeleccionado = 0;
            txtMonto.Clear();
            txtMotivo.Clear();
            if (cboProveedor.Items.Count > 0) cboProveedor.SelectedIndex = 0;
            if (cboFactura.Items.Count > 0) cboFactura.SelectedIndex = 0;
        }

        private void dgvNotas_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            if (e.RowIndex < 0) return;

            var fila = dgvNotas.Rows[e.RowIndex].DataBoundItem as NotaCreditoCompra;
            if (fila == null) return;

            _idSeleccionado = fila.ID;
            txtMonto.Text = fila.Monto.ToString("N2");
            txtMotivo.Text = fila.Motivo;

            foreach (ProveedorSimple p in cboProveedor.Items)
                if (p.ID == fila.FK_Proveedor) { cboProveedor.SelectedItem = p; break; }

            foreach (FacturaSimple f in cboFactura.Items)
                if (f.ID == fila.FK_Factura_Compra) { cboFactura.SelectedItem = f; break; }
        }
    }
}