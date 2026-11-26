using System;

namespace CapaDatos.Entidades
{
    public class InformeCotejoCompra
    {
        public int ID { get; set; }
        public int FK_Factura_Compra { get; set; }
        public int FK_Usuario { get; set; }
        public DateTime Fecha { get; set; }
        public string Estado { get; set; }
        public string Motivo_Rechazo { get; set; }

        public string NombreUsuario { get; set; }
        public string NumeroFactura { get; set; }
        public string NombreProveedor { get; set; }
    }
}