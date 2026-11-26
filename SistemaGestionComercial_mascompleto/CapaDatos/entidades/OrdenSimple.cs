using System;

namespace CapaDatos.Entidades
{
    public class OrdenSimple
    {
        public int ID { get; set; }
        public string Numero_Orden { get; set; }
        public DateTime Fecha_Emision { get; set; }
        public string Estado { get; set; }
        public int FK_Proveedor { get; set; }

        public override string ToString()
        {
            return Numero_Orden + " (" + Fecha_Emision.ToString("dd/MM/yyyy") + ")";
        }
    }
}