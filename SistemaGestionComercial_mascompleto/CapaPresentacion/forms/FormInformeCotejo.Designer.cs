namespace CapaPresentacion.Forms
{
    partial class FormInformeCotejo
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
            this.label1 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label();
            this.label4 = new System.Windows.Forms.Label();
            this.label5 = new System.Windows.Forms.Label();
            this.label6 = new System.Windows.Forms.Label();
            this.cboFactura = new System.Windows.Forms.ComboBox();
            this.cboUsuario = new System.Windows.Forms.ComboBox();
            this.cboEstado = new System.Windows.Forms.ComboBox();
            this.txtMotivoRechazo = new System.Windows.Forms.TextBox();
            this.lstOrdenesDisponibles = new System.Windows.Forms.ListBox();
            this.lstRemitosDisponibles = new System.Windows.Forms.ListBox();
            this.btnGuardar = new System.Windows.Forms.Button();
            this.btnLimpiar = new System.Windows.Forms.Button();
            this.dgvInformes = new System.Windows.Forms.DataGridView();
            ((System.ComponentModel.ISupportInitialize)(this.dgvInformes)).BeginInit();
            this.SuspendLayout();
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(30, 31);
            this.label1.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(68, 20);
            this.label1.TabIndex = 0;
            this.label1.Text = "Factura:";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(30, 92);
            this.label2.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(68, 20);
            this.label2.TabIndex = 1;
            this.label2.Text = "Usuario:";
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(30, 154);
            this.label3.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(64, 20);
            this.label3.TabIndex = 2;
            this.label3.Text = "Estado:";
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(30, 215);
            this.label4.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(127, 20);
            this.label4.TabIndex = 3;
            this.label4.Text = "Motivo Rechazo:";
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Location = new System.Drawing.Point(30, 277);
            this.label5.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(142, 20);
            this.label5.TabIndex = 4;
            this.label5.Text = "Órdenes (Múltiple):";
            // 
            // label6
            // 
            this.label6.AutoSize = true;
            this.label6.Location = new System.Drawing.Point(630, 277);
            this.label6.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label6.Name = "label6";
            this.label6.Size = new System.Drawing.Size(140, 20);
            this.label6.TabIndex = 5;
            this.label6.Text = "Remitos (Múltiple):";
            // 
            // cboFactura
            // 
            this.cboFactura.FormattingEnabled = true;
            this.cboFactura.Location = new System.Drawing.Point(180, 26);
            this.cboFactura.Margin = new System.Windows.Forms.Padding(4, 5, 4, 5);
            this.cboFactura.Name = "cboFactura";
            this.cboFactura.Size = new System.Drawing.Size(418, 28);
            this.cboFactura.TabIndex = 6;
            // 
            // cboUsuario
            // 
            this.cboUsuario.FormattingEnabled = true;
            this.cboUsuario.Location = new System.Drawing.Point(180, 88);
            this.cboUsuario.Margin = new System.Windows.Forms.Padding(4, 5, 4, 5);
            this.cboUsuario.Name = "cboUsuario";
            this.cboUsuario.Size = new System.Drawing.Size(418, 28);
            this.cboUsuario.TabIndex = 7;
            // 
            // cboEstado
            // 
            this.cboEstado.FormattingEnabled = true;
            this.cboEstado.Location = new System.Drawing.Point(180, 149);
            this.cboEstado.Margin = new System.Windows.Forms.Padding(4, 5, 4, 5);
            this.cboEstado.Name = "cboEstado";
            this.cboEstado.Size = new System.Drawing.Size(418, 28);
            this.cboEstado.TabIndex = 8;
            // 
            // txtMotivoRechazo
            // 
            this.txtMotivoRechazo.Location = new System.Drawing.Point(180, 211);
            this.txtMotivoRechazo.Margin = new System.Windows.Forms.Padding(4, 5, 4, 5);
            this.txtMotivoRechazo.Name = "txtMotivoRechazo";
            this.txtMotivoRechazo.Size = new System.Drawing.Size(418, 26);
            this.txtMotivoRechazo.TabIndex = 9;
            // 
            // lstOrdenesDisponibles
            // 
            this.lstOrdenesDisponibles.FormattingEnabled = true;
            this.lstOrdenesDisponibles.ItemHeight = 20;
            this.lstOrdenesDisponibles.Location = new System.Drawing.Point(180, 277);
            this.lstOrdenesDisponibles.Margin = new System.Windows.Forms.Padding(4, 5, 4, 5);
            this.lstOrdenesDisponibles.Name = "lstOrdenesDisponibles";
            this.lstOrdenesDisponibles.SelectionMode = System.Windows.Forms.SelectionMode.MultiSimple;
            this.lstOrdenesDisponibles.Size = new System.Drawing.Size(418, 144);
            this.lstOrdenesDisponibles.TabIndex = 10;
            // 
            // lstRemitosDisponibles
            // 
            this.lstRemitosDisponibles.FormattingEnabled = true;
            this.lstRemitosDisponibles.ItemHeight = 20;
            this.lstRemitosDisponibles.Location = new System.Drawing.Point(630, 277);
            this.lstRemitosDisponibles.Margin = new System.Windows.Forms.Padding(4, 5, 4, 5);
            this.lstRemitosDisponibles.Name = "lstRemitosDisponibles";
            this.lstRemitosDisponibles.SelectionMode = System.Windows.Forms.SelectionMode.MultiSimple;
            this.lstRemitosDisponibles.Size = new System.Drawing.Size(418, 144);
            this.lstRemitosDisponibles.TabIndex = 11;
            // 
            // btnGuardar
            // 
            this.btnGuardar.BackColor = System.Drawing.SystemColors.HighlightText;
            this.btnGuardar.Location = new System.Drawing.Point(30, 462);
            this.btnGuardar.Margin = new System.Windows.Forms.Padding(4, 5, 4, 5);
            this.btnGuardar.Name = "btnGuardar";
            this.btnGuardar.Size = new System.Drawing.Size(150, 46);
            this.btnGuardar.TabIndex = 12;
            this.btnGuardar.Text = "Guardar";
            this.btnGuardar.UseVisualStyleBackColor = false;
            this.btnGuardar.Click += new System.EventHandler(this.btnGuardar_Click);
            // 
            // btnLimpiar
            // 
            this.btnLimpiar.BackColor = System.Drawing.SystemColors.HighlightText;
            this.btnLimpiar.Location = new System.Drawing.Point(210, 462);
            this.btnLimpiar.Margin = new System.Windows.Forms.Padding(4, 5, 4, 5);
            this.btnLimpiar.Name = "btnLimpiar";
            this.btnLimpiar.Size = new System.Drawing.Size(150, 46);
            this.btnLimpiar.TabIndex = 13;
            this.btnLimpiar.Text = "Limpiar";
            this.btnLimpiar.UseVisualStyleBackColor = false;
            this.btnLimpiar.Click += new System.EventHandler(this.btnLimpiar_Click);
            // 
            // dgvInformes
            // 
            this.dgvInformes.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dgvInformes.Location = new System.Drawing.Point(30, 538);
            this.dgvInformes.Margin = new System.Windows.Forms.Padding(4, 5, 4, 5);
            this.dgvInformes.Name = "dgvInformes";
            this.dgvInformes.RowHeadersWidth = 62;
            this.dgvInformes.Size = new System.Drawing.Size(1050, 277);
            this.dgvInformes.TabIndex = 14;
            // 
            // FormInformeCotejo
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(9F, 20F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.SystemColors.HighlightText;
            this.ClientSize = new System.Drawing.Size(1125, 846);
            this.Controls.Add(this.dgvInformes);
            this.Controls.Add(this.btnLimpiar);
            this.Controls.Add(this.btnGuardar);
            this.Controls.Add(this.lstRemitosDisponibles);
            this.Controls.Add(this.lstOrdenesDisponibles);
            this.Controls.Add(this.txtMotivoRechazo);
            this.Controls.Add(this.cboEstado);
            this.Controls.Add(this.cboUsuario);
            this.Controls.Add(this.cboFactura);
            this.Controls.Add(this.label6);
            this.Controls.Add(this.label5);
            this.Controls.Add(this.label4);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.label1);
            this.Margin = new System.Windows.Forms.Padding(4, 5, 4, 5);
            this.Name = "FormInformeCotejo";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "Informes de Cotejo";
            this.Load += new System.EventHandler(this.FormInformeCotejo_Load);
            ((System.ComponentModel.ISupportInitialize)(this.dgvInformes)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.Label label6;
        private System.Windows.Forms.ComboBox cboFactura;
        private System.Windows.Forms.ComboBox cboUsuario;
        private System.Windows.Forms.ComboBox cboEstado;
        private System.Windows.Forms.TextBox txtMotivoRechazo;
        private System.Windows.Forms.ListBox lstOrdenesDisponibles;
        private System.Windows.Forms.ListBox lstRemitosDisponibles;
        private System.Windows.Forms.Button btnGuardar;
        private System.Windows.Forms.Button btnLimpiar;
        private System.Windows.Forms.DataGridView dgvInformes;
    }
}