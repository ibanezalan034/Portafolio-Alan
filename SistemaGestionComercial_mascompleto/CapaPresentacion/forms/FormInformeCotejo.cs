using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows.Forms;
using CapaDatos.Entidades;
using CapaLogica;

namespace CapaPresentacion.Forms
{
    public partial class FormInformeCotejo : Form
    {
        private CotejoLogica _logica = new CotejoLogica();
        private CatalogosLogica _catalogos = new CatalogosLogica();
        private int _idSeleccionado = 0;

        public FormInformeCotejo()
        {
            InitializeComponent();
        }

        private void FormInformeCotejo_Load(object sender, EventArgs e)
        {
            cboFactura.DataSource = _catalogos.ObtenerFacturas();
            cboFactura.DisplayMember = "Numero_Factura";
            cboFactura.ValueMember = "ID";

            cboUsuario.DataSource = _catalogos.ObtenerUsuarios();
            cboUsuario.DisplayMember = "NombreCompleto";
            cboUsuario.ValueMember = "ID";

            cboEstado.Items.Clear();
            cboEstado.Items.Add("Aprobado");
            cboEstado.Items.Add("Rechazado");
            cboEstado.SelectedIndex = 0;

            lstOrdenesDisponibles.DataSource = _catalogos.ObtenerOrdenes();
            lstOrdenesDisponibles.DisplayMember = "Numero_Orden";

            lstRemitosDisponibles.DataSource = _catalogos.ObtenerRemitos();
            lstRemitosDisponibles.DisplayMember = "Numero_Remito";

            CargarGrilla();
        }

        private void CargarGrilla()
        {
            try
            {
                dgvInformes.DataSource = null;
                dgvInformes.DataSource = _logica.ObtenerInformesCotejo();
            }
            catch (Exception ex)
            {
                MessageBox.Show("Error: " + ex.Message);
            }
        }

        private void btnGuardar_Click(object sender, EventArgs e)
        {
            try
            {
                if (cboFactura.SelectedItem == null || cboUsuario.SelectedItem == null)
                {
                    MessageBox.Show("Debe seleccionar factura y usuario.");
                    return;
                }

                var informe = new InformeCotejoCompra
                {
                    ID = _idSeleccionado,
                    FK_Factura_Compra = ((FacturaSimple)cboFactura.SelectedItem).ID,
                    FK_Usuario = ((UsuarioSimple)cboUsuario.SelectedItem).ID,
                    Estado = cboEstado.Text,
                    Motivo_Rechazo = txtMotivoRechazo.Text.Trim()
                };

                var idsOrdenes = lstOrdenesDisponibles.SelectedItems
                    .Cast<OrdenSimple>().Select(o => o.ID).ToList();

                var idsRemitos = lstRemitosDisponibles.SelectedItems
                    .Cast<RemitoSimple>().Select(r => r.ID).ToList();

                if (_idSeleccionado == 0)
                {
                    _logica.CrearInformeCotejo(informe, idsRemitos, idsOrdenes);
                    MessageBox.Show("Informe creado correctamente.");
                }
                else
                {
                    _logica.ActualizarInformeCotejo(informe, idsRemitos, idsOrdenes);
                    MessageBox.Show("Informe actualizado correctamente.");
                }

                Limpiar();
                CargarGrilla();
            }
            catch (Exception ex)
            {
                MessageBox.Show("Error: " + ex.Message);
            }
        }

        private void btnLimpiar_Click(object sender, EventArgs e)
        {
            Limpiar();
        }

        private void Limpiar()
        {
            _idSeleccionado = 0;
            txtMotivoRechazo.Clear();
            cboEstado.SelectedIndex = 0;
            lstOrdenesDisponibles.ClearSelected();
            lstRemitosDisponibles.ClearSelected();
        }
    }
}