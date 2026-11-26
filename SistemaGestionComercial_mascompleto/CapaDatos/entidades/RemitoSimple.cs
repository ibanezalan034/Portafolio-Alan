using System;

namespace CapaDatos.Entidades
{
    public class RemitoSimple
    {
        public int ID { get; set; }
        public string Numero_Remito { get; set; }
        public DateTime Fecha_Ingreso { get; set; }
        public bool Es_Devolucion { get; set; }
        public int FK_Orden_Compra { get; set; }

        public override string ToString()
        {
            return Numero_Remito + " (" + Fecha_Ingreso.ToString("dd/MM/yyyy") + ")";
        }
    }
}