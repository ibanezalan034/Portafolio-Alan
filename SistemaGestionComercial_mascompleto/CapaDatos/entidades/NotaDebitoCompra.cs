using System;

namespace CapaDatos.Entidades
{
    public class NotaDebitoCompra
    {
        public int ID { get; set; }
        public int FK_Factura_Compra { get; set; }
        public int FK_Proveedor { get; set; }
        public decimal Monto { get; set; }
        public string Motivo { get; set; }
        public DateTime Fecha { get; set; }

        public string NombreProveedor { get; set; }
        public string NumeroFactura { get; set; }
    }
}