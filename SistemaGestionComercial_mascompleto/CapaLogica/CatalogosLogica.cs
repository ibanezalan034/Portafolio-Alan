using System.Collections.Generic;
using CapaDatos.DAL;
using CapaDatos.Entidades;

namespace CapaLogica
{
    public class CatalogosLogica
    {
        private CatalogosDAL _dal = new CatalogosDAL();

        public List<ProveedorSimple> ObtenerProveedores() { return _dal.ObtenerProveedores(); }
        public List<FacturaSimple> ObtenerFacturas() { return _dal.ObtenerFacturas(); }
        public List<OrdenSimple> ObtenerOrdenes() { return _dal.ObtenerOrdenes(); }
        public List<RemitoSimple> ObtenerRemitos() { return _dal.ObtenerRemitos(); }
        public List<UsuarioSimple> ObtenerUsuarios() { return _dal.ObtenerUsuarios(); }
    }
}