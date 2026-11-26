using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using CapaDatos.Entidades;

namespace CapaDatos.DAL
{
    public class NotasDAL
    {
        private ConexionBD _db = new ConexionBD();

        // ==========================================
        // NOTAS DE CRÉDITO
        // ==========================================

        public int InsertarNotaCredito(NotaCreditoCompra nota)
        {
            using (var conn = _db.ObtenerConexion())
            using (var cmd = new SqlCommand("sp_NotaCreditoCompra_Insertar", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@FK_Factura_Compra", nota.FK_Factura_Compra);
                cmd.Parameters.AddWithValue("@FK_Proveedor", nota.FK_Proveedor);
                cmd.Parameters.AddWithValue("@Monto", nota.Monto);
                cmd.Parameters.AddWithValue("@Motivo", nota.Motivo ?? (object)DBNull.Value);

                conn.Open();
                return Convert.ToInt32(cmd.ExecuteScalar());
            }
        }

        public void ActualizarNotaCredito(NotaCreditoCompra nota)
        {
            using (var conn = _db.ObtenerConexion())
            using (var cmd = new SqlCommand("sp_NotaCreditoCompra_Actualizar", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@ID", nota.ID);
                cmd.Parameters.AddWithValue("@FK_Factura_Compra", nota.FK_Factura_Compra);
                cmd.Parameters.AddWithValue("@FK_Proveedor", nota.FK_Proveedor);
                cmd.Parameters.AddWithValue("@Monto", nota.Monto);
                cmd.Parameters.AddWithValue("@Motivo", nota.Motivo ?? (object)DBNull.Value);

                conn.Open();
                cmd.ExecuteNonQuery();
            }
        }

        public void EliminarNotaCredito(int id)
        {
            using (var conn = _db.ObtenerConexion())
            using (var cmd = new SqlCommand("sp_NotaCreditoCompra_Eliminar", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@ID", id);
                conn.Open();
                cmd.ExecuteNonQuery();
            }
        }

        public NotaCreditoCompra ObtenerNotaCreditoPorId(int id)
        {
            using (var conn = _db.ObtenerConexion())
            using (var cmd = new SqlCommand("sp_NotaCreditoCompra_ObtenerPorId", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@ID", id);
                conn.Open();
                using (var reader = cmd.ExecuteReader())
                {
                    if (reader.Read())
                        return MapearNotaCredito(reader);
                    return null;
                }
            }
        }

        public List<NotaCreditoCompra> ObtenerTodasNotasCredito(int? proveedorId = null, DateTime? desde = null, DateTime? hasta = null)
        {
            var lista = new List<NotaCreditoCompra>();
            using (var conn = _db.ObtenerConexion())
            using (var cmd = new SqlCommand("sp_NotaCreditoCompra_ObtenerTodos", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@FK_Proveedor", (object)proveedorId ?? DBNull.Value);
                cmd.Parameters.AddWithValue("@FechaDesde", (object)desde ?? DBNull.Value);
                cmd.Parameters.AddWithValue("@FechaHasta", (object)hasta ?? DBNull.Value);

                conn.Open();
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                        lista.Add(MapearNotaCredito(reader));
                }
            }
            return lista;
        }

        private NotaCreditoCompra MapearNotaCredito(SqlDataReader reader)
        {
            return new NotaCreditoCompra
            {
                ID = reader.GetInt32(reader.GetOrdinal("ID")),
                FK_Factura_Compra = reader.GetInt32(reader.GetOrdinal("FK_Factura_Compra")),
                FK_Proveedor = reader.GetInt32(reader.GetOrdinal("FK_Proveedor")),
                Monto = reader.GetDecimal(reader.GetOrdinal("Monto")),
                Motivo = reader["Motivo"] as string,
                Fecha = reader.GetDateTime(reader.GetOrdinal("Fecha"))
            };
        }

        // ==========================================
        // NOTAS DE DÉBITO
        // ==========================================

        public int InsertarNotaDebito(NotaDebitoCompra nota)
        {
            using (var conn = _db.ObtenerConexion())
            using (var cmd = new SqlCommand("sp_NotaDebitoCompra_Insertar", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@FK_Factura_Compra", nota.FK_Factura_Compra);
                cmd.Parameters.AddWithValue("@FK_Proveedor", nota.FK_Proveedor);
                cmd.Parameters.AddWithValue("@Monto", nota.Monto);
                cmd.Parameters.AddWithValue("@Motivo", nota.Motivo ?? (object)DBNull.Value);

                conn.Open();
                return Convert.ToInt32(cmd.ExecuteScalar());
            }
        }

        public void ActualizarNotaDebito(NotaDebitoCompra nota)
        {
            using (var conn = _db.ObtenerConexion())
            using (var cmd = new SqlCommand("sp_NotaDebitoCompra_Actualizar", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@ID", nota.ID);
                cmd.Parameters.AddWithValue("@FK_Factura_Compra", nota.FK_Factura_Compra);
                cmd.Parameters.AddWithValue("@FK_Proveedor", nota.FK_Proveedor);
                cmd.Parameters.AddWithValue("@Monto", nota.Monto);
                cmd.Parameters.AddWithValue("@Motivo", nota.Motivo ?? (object)DBNull.Value);

                conn.Open();
                cmd.ExecuteNonQuery();
            }
        }

        public void EliminarNotaDebito(int id)
        {
            using (var conn = _db.ObtenerConexion())
            using (var cmd = new SqlCommand("sp_NotaDebitoCompra_Eliminar", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@ID", id);
                conn.Open();
                cmd.ExecuteNonQuery();
            }
        }

        public NotaDebitoCompra ObtenerNotaDebitoPorId(int id)
        {
            using (var conn = _db.ObtenerConexion())
            using (var cmd = new SqlCommand("sp_NotaDebitoCompra_ObtenerPorId", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@ID", id);
                conn.Open();
                using (var reader = cmd.ExecuteReader())
                {
                    if (reader.Read())
                        return MapearNotaDebito(reader);
                    return null;
                }
            }
        }

        public List<NotaDebitoCompra> ObtenerTodasNotasDebito(int? proveedorId = null, DateTime? desde = null, DateTime? hasta = null)
        {
            var lista = new List<NotaDebitoCompra>();
            using (var conn = _db.ObtenerConexion())
            using (var cmd = new SqlCommand("sp_NotaDebitoCompra_ObtenerTodos", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@FK_Proveedor", (object)proveedorId ?? DBNull.Value);
                cmd.Parameters.AddWithValue("@FechaDesde", (object)desde ?? DBNull.Value);
                cmd.Parameters.AddWithValue("@FechaHasta", (object)hasta ?? DBNull.Value);

                conn.Open();
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                        lista.Add(MapearNotaDebito(reader));
                }
            }
            return lista;
        }

        private NotaDebitoCompra MapearNotaDebito(SqlDataReader reader)
        {
            return new NotaDebitoCompra
            {
                ID = reader.GetInt32(reader.GetOrdinal("ID")),
                FK_Factura_Compra = reader.GetInt32(reader.GetOrdinal("FK_Factura_Compra")),
                FK_Proveedor = reader.GetInt32(reader.GetOrdinal("FK_Proveedor")),
                Monto = reader.GetDecimal(reader.GetOrdinal("Monto")),
                Motivo = reader["Motivo"] as string,
                Fecha = reader.GetDateTime(reader.GetOrdinal("Fecha"))
            };
        }
    }
}