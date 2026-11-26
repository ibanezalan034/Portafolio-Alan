using System.Collections.Generic;

namespace CapaDatos.Entidades
{
    public class InformeCotejoCompraCompleto
    {
        public InformeCotejoCompra Informe { get; set; }
        public List<OrdenSimple> Ordenes { get; set; }
        public List<RemitoSimple> Remitos { get; set; }

        public InformeCotejoCompraCompleto()
        {
            Ordenes = new List<OrdenSimple>();
            Remitos = new List<RemitoSimple>();
        }
    }
}