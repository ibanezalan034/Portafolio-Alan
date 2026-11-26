using System;
using System.Collections.Generic;
using CapaDatos.DAL;
using CapaDatos.Entidades;

namespace CapaLogica
{
    public class NotasLogica
    {
        private NotasDAL _dal = new NotasDAL();

        // NOTAS DE CRÉDITO

        public int CrearNotaCredito(NotaCreditoCompra nota)
        {
            ValidarNota(nota.Monto, nota.Motivo, nota.FK_Factura_Compra, nota.FK_Proveedor);
            return _dal.InsertarNotaCredito(nota);
        }

        public void ActualizarNotaCredito(NotaCreditoCompra nota)
        {
            if (nota.ID <= 0) throw new ArgumentException("El ID de la nota es inválido.");
            ValidarNota(nota.Monto, nota.Motivo, nota.FK_Factura_Compra, nota.FK_Proveedor);
            _dal.ActualizarNotaCredito(nota);
        }

        public void EliminarNotaCredito(int id)
        {
            if (id <= 0) throw new ArgumentException("El ID de la nota es inválido.");
            _dal.EliminarNotaCredito(id);
        }

        public NotaCreditoCompra ObtenerNotaCredito(int id)
        {
            return _dal.ObtenerNotaCreditoPorId(id);
        }

        public List<NotaCreditoCompra> ObtenerNotasCredito(int? proveedorId = null, DateTime? desde = null, DateTime? hasta = null)
        {
            ValidarFechas(desde, hasta);
            return _dal.ObtenerTodasNotasCredito(proveedorId, desde, hasta);
        }

        // NOTAS DE DÉBITO

        public int CrearNotaDebito(NotaDebitoCompra nota)
        {
            ValidarNota(nota.Monto, nota.Motivo, nota.FK_Factura_Compra, nota.FK_Proveedor);
            return _dal.InsertarNotaDebito(nota);
        }

        public void ActualizarNotaDebito(NotaDebitoCompra nota)
        {
            if (nota.ID <= 0) throw new ArgumentException("El ID de la nota es inválido.");
            ValidarNota(nota.Monto, nota.Motivo, nota.FK_Factura_Compra, nota.FK_Proveedor);
            _dal.ActualizarNotaDebito(nota);
        }

        public void EliminarNotaDebito(int id)
        {
            if (id <= 0) throw new ArgumentException("El ID de la nota es inválido.");
            _dal.EliminarNotaDebito(id);
        }

        public NotaDebitoCompra ObtenerNotaDebito(int id)
        {
            return _dal.ObtenerNotaDebitoPorId(id);
        }

        public List<NotaDebitoCompra> ObtenerNotasDebito(int? proveedorId = null, DateTime? desde = null, DateTime? hasta = null)
        {
            ValidarFechas(desde, hasta);
            return _dal.ObtenerTodasNotasDebito(proveedorId, desde, hasta);
        }

        // VALIDACIONES

        private void ValidarNota(decimal monto, string motivo, int facturaId, int proveedorId)
        {
            if (monto <= 0)
                throw new ArgumentException("El monto debe ser mayor a cero.");
            if (string.IsNullOrWhiteSpace(motivo))
                throw new ArgumentException("El motivo es obligatorio.");
            if (facturaId <= 0)
                throw new ArgumentException("Debe seleccionar una factura.");
            if (proveedorId <= 0)
                throw new ArgumentException("Debe seleccionar un proveedor.");
        }

        private void ValidarFechas(DateTime? desde, DateTime? hasta)
        {
            if (desde.HasValue && hasta.HasValue && desde.Value > hasta.Value)
                throw new ArgumentException("La fecha 'desde' no puede ser mayor que la fecha 'hasta'.");
        }
    }
}