using CapaPresentacion.Forms;
using System;
using System.Windows.Forms;

namespace CapaPresentacion
{
    public partial class FormPrincipal : Form
    {
        public FormPrincipal()
        {
            InitializeComponent();
        }

        private void btnAbrirNotaCredito_Click(object sender, EventArgs e)
        {
            new FormNotaCredito().ShowDialog();
        }

        private void btnAbrirNotaDebito_Click(object sender, EventArgs e)
        {
            new FormNotaDebito().ShowDialog();
        }

        private void btnAbrirInformeCotejo_Click(object sender, EventArgs e)
        {
            new FormInformeCotejo().ShowDialog();
        }
    }
}