using System;
using System.Collections.Generic;
using CapaDatos.DAL;
using CapaDatos.Entidades;

namespace CapaLogica
{
    public class CotejoLogica
    {
        private CotejoDAL _dal = new CotejoDAL();

        public int CrearInformeCotejo(InformeCotejoCompra informe, List<int> idsRemitos, List<int> idsOrdenes)
        {
            ValidarInforme(informe, idsRemitos, idsOrdenes);

            int nuevoId = _dal.InsertarInformeCotejo(informe);

            if (idsRemitos != null)
            {
                foreach (int remitoId in idsRemitos)
                    _dal.AgregarRemitoAInforme(nuevoId, remitoId);
            }

            if (idsOrdenes != null)
            {
                foreach (int ordenId in idsOrdenes)
                    _dal.AgregarOrdenAInforme(nuevoId, ordenId);
            }

            return nuevoId;
        }

        public void ActualizarInformeCotejo(InformeCotejoCompra informe, List<int> idsRemitos, List<int> idsOrdenes)
        {
            if (informe.ID <= 0)
                throw new ArgumentException("El ID del informe es inválido.");

            ValidarInforme(informe, idsRemitos, idsOrdenes);

            _dal.ActualizarInformeCotejo(informe);

            foreach (var r in _dal.ObtenerRemitosPorInforme(informe.ID))
                _dal.EliminarRemitoDeInforme(informe.ID, r.ID);

            foreach (var o in _dal.ObtenerOrdenesPorInforme(informe.ID))
                _dal.EliminarOrdenDeInforme(informe.ID, o.ID);

            if (idsRemitos != null)
                foreach (int remitoId in idsRemitos)
                    _dal.AgregarRemitoAInforme(informe.ID, remitoId);

            if (idsOrdenes != null)
                foreach (int ordenId in idsOrdenes)
                    _dal.AgregarOrdenAInforme(informe.ID, ordenId);
        }

        public void EliminarInformeCotejo(int id)
        {
            if (id <= 0) throw new ArgumentException("El ID del informe es inválido.");
            _dal.EliminarInformeCotejo(id);
        }

        public InformeCotejoCompra ObtenerInformeCotejo(int id)
        {
            return _dal.ObtenerInformeCotejoPorId(id);
        }

        public List<InformeCotejoCompra> ObtenerInformesCotejo(string estado = null)
        {
            if (!string.IsNullOrEmpty(estado) && estado != "Aprobado" && estado != "Rechazado")
                throw new ArgumentException("El estado debe ser 'Aprobado', 'Rechazado' o vacío.");
            return _dal.ObtenerTodosInformesCotejo(estado);
        }

        public List<RemitoSimple> ObtenerRemitos(int informeId) { return _dal.ObtenerRemitosPorInforme(informeId); }
        public List<OrdenSimple> ObtenerOrdenes(int informeId) { return _dal.ObtenerOrdenesPorInforme(informeId); }

        private void ValidarInforme(InformeCotejoCompra informe, List<int> idsRemitos, List<int> idsOrdenes)
        {
            if (informe.FK_Factura_Compra <= 0)
                throw new ArgumentException("Debe seleccionar una factura de compra.");
            if (informe.FK_Usuario <= 0)
                throw new ArgumentException("Debe indicar el usuario que firma el informe.");
            if (informe.Estado != "Aprobado" && informe.Estado != "Rechazado")
                throw new ArgumentException("El estado debe ser 'Aprobado' o 'Rechazado'.");
            if (informe.Estado == "Rechazado" && string.IsNullOrWhiteSpace(informe.Motivo_Rechazo))
                throw new ArgumentException("Si el informe es Rechazado, el motivo es obligatorio.");

            bool tieneRemitos = idsRemitos != null && idsRemitos.Count > 0;
            bool tieneOrdenes = idsOrdenes != null && idsOrdenes.Count > 0;
            if (!tieneRemitos && !tieneOrdenes)
                throw new ArgumentException("El informe debe tener al menos una orden de compra o un remito asociado.");
        }
    }
}