namespace CapaPresentacion
{
    partial class FormPrincipal
    {
        private System.ComponentModel.IContainer components = null;

        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        private void InitializeComponent()
        {
            this.btnAbrirNotaCredito = new System.Windows.Forms.Button();
            this.btnAbrirNotaDebito = new System.Windows.Forms.Button();
            this.btnAbrirInformeCotejo = new System.Windows.Forms.Button();
            this.labelTitulo = new System.Windows.Forms.Label();
            this.SuspendLayout();
            // 
            // btnAbrirNotaCredito
            // 
            this.btnAbrirNotaCredito.BackColor = System.Drawing.SystemColors.HighlightText;
            this.btnAbrirNotaCredito.Location = new System.Drawing.Point(188, 154);
            this.btnAbrirNotaCredito.Margin = new System.Windows.Forms.Padding(4, 5, 4, 5);
            this.btnAbrirNotaCredito.Name = "btnAbrirNotaCredito";
            this.btnAbrirNotaCredito.Size = new System.Drawing.Size(375, 77);
            this.btnAbrirNotaCredito.TabIndex = 1;
            this.btnAbrirNotaCredito.Text = "Notas de Crédito";
            this.btnAbrirNotaCredito.UseVisualStyleBackColor = false;
            this.btnAbrirNotaCredito.Click += new System.EventHandler(this.btnAbrirNotaCredito_Click);
            // 
            // btnAbrirNotaDebito
            // 
            this.btnAbrirNotaDebito.BackColor = System.Drawing.SystemColors.HighlightText;
            this.btnAbrirNotaDebito.Location = new System.Drawing.Point(188, 262);
            this.btnAbrirNotaDebito.Margin = new System.Windows.Forms.Padding(4, 5, 4, 5);
            this.btnAbrirNotaDebito.Name = "btnAbrirNotaDebito";
            this.btnAbrirNotaDebito.Size = new System.Drawing.Size(375, 77);
            this.btnAbrirNotaDebito.TabIndex = 2;
            this.btnAbrirNotaDebito.Text = "Notas de Débito";
            this.btnAbrirNotaDebito.UseVisualStyleBackColor = false;
            this.btnAbrirNotaDebito.Click += new System.EventHandler(this.btnAbrirNotaDebito_Click);
            // 
            // btnAbrirInformeCotejo
            // 
            this.btnAbrirInformeCotejo.BackColor = System.Drawing.SystemColors.HighlightText;
            this.btnAbrirInformeCotejo.Location = new System.Drawing.Point(188, 369);
            this.btnAbrirInformeCotejo.Margin = new System.Windows.Forms.Padding(4, 5, 4, 5);
            this.btnAbrirInformeCotejo.Name = "btnAbrirInformeCotejo";
            this.btnAbrirInformeCotejo.Size = new System.Drawing.Size(375, 77);
            this.btnAbrirInformeCotejo.TabIndex = 3;
            this.btnAbrirInformeCotejo.Text = "Informes de Cotejo";
            this.btnAbrirInformeCotejo.UseVisualStyleBackColor = false;
            this.btnAbrirInformeCotejo.Click += new System.EventHandler(this.btnAbrirInformeCotejo_Click);
            // 
            // labelTitulo
            // 
            this.labelTitulo.AutoSize = true;
            this.labelTitulo.Font = new System.Drawing.Font("Microsoft Sans Serif", 14F, System.Drawing.FontStyle.Bold);
            this.labelTitulo.Location = new System.Drawing.Point(150, 46);
            this.labelTitulo.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.labelTitulo.Name = "labelTitulo";
            this.labelTitulo.Size = new System.Drawing.Size(551, 32);
            this.labelTitulo.TabIndex = 0;
            this.labelTitulo.Text = "Grupo 5 - Ajustes y Control de Compras";
            // 
            // FormPrincipal
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(9F, 20F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.SystemColors.HighlightText;
            this.ClientSize = new System.Drawing.Size(750, 538);
            this.Controls.Add(this.btnAbrirInformeCotejo);
            this.Controls.Add(this.btnAbrirNotaDebito);
            this.Controls.Add(this.btnAbrirNotaCredito);
            this.Controls.Add(this.labelTitulo);
            this.Margin = new System.Windows.Forms.Padding(4, 5, 4, 5);
            this.Name = "FormPrincipal";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "Sistema de Gestión - Grupo 5";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        private System.Windows.Forms.Button btnAbrirNotaCredito;
        private System.Windows.Forms.Button btnAbrirNotaDebito;
        private System.Windows.Forms.Button btnAbrirInformeCotejo;
        private System.Windows.Forms.Label labelTitulo;
    }
}