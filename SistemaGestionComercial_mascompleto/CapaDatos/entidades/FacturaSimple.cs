using System;

namespace CapaDatos.Entidades
{
    public class FacturaSimple
    {
        public int ID { get; set; }
        public string Numero_Factura { get; set; }
        public decimal Monto_Total { get; set; }
        public DateTime Fecha { get; set; }
        public int FK_Proveedor { get; set; }
        public string NombreProveedor { get; set; }

        public override string ToString()
        {
            return Numero_Factura + " - $" + Monto_Total.ToString("N2");
        }
    }
}