using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using CapaDatos.Entidades;

namespace CapaDatos.DAL
{
    public class CotejoDAL
    {
        private ConexionBD _db = new ConexionBD();

        public int InsertarInformeCotejo(InformeCotejoCompra informe)
        {
            using (var conn = _db.ObtenerConexion())
            using (var cmd = new SqlCommand("sp_InformeCotejo_Insertar", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@FK_Factura_Compra", informe.FK_Factura_Compra);
                cmd.Parameters.AddWithValue("@FK_Usuario", informe.FK_Usuario);
                cmd.Parameters.AddWithValue("@Estado", informe.Estado);
                cmd.Parameters.AddWithValue("@Motivo_Rechazo", (object)informe.Motivo_Rechazo ?? DBNull.Value);

                conn.Open();
                return Convert.ToInt32(cmd.ExecuteScalar());
            }
        }

        public void ActualizarInformeCotejo(InformeCotejoCompra informe)
        {
            using (var conn = _db.ObtenerConexion())
            using (var cmd = new SqlCommand("sp_InformeCotejo_Actualizar", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@ID", informe.ID);
                cmd.Parameters.AddWithValue("@FK_Factura_Compra", informe.FK_Factura_Compra);
                cmd.Parameters.AddWithValue("@FK_Usuario", informe.FK_Usuario);
                cmd.Parameters.AddWithValue("@Estado", informe.Estado);
                cmd.Parameters.AddWithValue("@Motivo_Rechazo", (object)informe.Motivo_Rechazo ?? DBNull.Value);

                conn.Open();
                cmd.ExecuteNonQuery();
            }
        }

        public void EliminarInformeCotejo(int id)
        {
            using (var conn = _db.ObtenerConexion())
            using (var cmd = new SqlCommand("sp_InformeCotejo_Eliminar", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@ID", id);
                conn.Open();
                cmd.ExecuteNonQuery();
            }
        }

        public InformeCotejoCompra ObtenerInformeCotejoPorId(int id)
        {
            using (var conn = _db.ObtenerConexion())
            using (var cmd = new SqlCommand("sp_InformeCotejo_ObtenerPorId", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@ID", id);
                conn.Open();
                using (var reader = cmd.ExecuteReader())
                {
                    if (reader.Read())
                        return MapearInforme(reader);
                    return null;
                }
            }
        }

        public List<InformeCotejoCompra> ObtenerTodosInformesCotejo(string estado = null)
        {
            var lista = new List<InformeCotejoCompra>();
            using (var conn = _db.ObtenerConexion())
            using (var cmd = new SqlCommand("sp_InformeCotejo_ObtenerTodos", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Estado", (object)estado ?? DBNull.Value);

                conn.Open();
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                        lista.Add(MapearInforme(reader));
                }
            }
            return lista;
        }

        private InformeCotejoCompra MapearInforme(SqlDataReader reader)
        {
            return new InformeCotejoCompra
            {
                ID = reader.GetInt32(reader.GetOrdinal("ID")),
                FK_Factura_Compra = reader.GetInt32(reader.GetOrdinal("FK_Factura_Compra")),
                FK_Usuario = reader.GetInt32(reader.GetOrdinal("FK_Usuario")),
                Fecha = reader.GetDateTime(reader.GetOrdinal("Fecha")),
                Estado = reader["Estado"] as string,
                Motivo_Rechazo = reader["Motivo_Rechazo"] as string
            };
        }

        // ==========================================
        // RELACIONES M:N
        // ==========================================

        public void AgregarRemitoAInforme(int informeId, int remitoId)
        {
            using (var conn = _db.ObtenerConexion())
            using (var cmd = new SqlCommand("sp_InformeCotejo_AgregarRemito", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@FK_Informe_Cotejo", informeId);
                cmd.Parameters.AddWithValue("@FK_Remito_Ingreso", remitoId);
                conn.Open();
                cmd.ExecuteNonQuery();
            }
        }

        public void EliminarRemitoDeInforme(int informeId, int remitoId)
        {
            using (var conn = _db.ObtenerConexion())
            using (var cmd = new SqlCommand("sp_InformeCotejo_EliminarRemito", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@FK_Informe_Cotejo", informeId);
                cmd.Parameters.AddWithValue("@FK_Remito_Ingreso", remitoId);
                conn.Open();
                cmd.ExecuteNonQuery();
            }
        }

        public List<RemitoSimple> ObtenerRemitosPorInforme(int informeId)
        {
            var lista = new List<RemitoSimple>();
            using (var conn = _db.ObtenerConexion())
            using (var cmd = new SqlCommand("sp_InformeCotejo_ObtenerRemitos", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@FK_Informe_Cotejo", informeId);
                conn.Open();
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        lista.Add(new RemitoSimple
                        {
                            ID = reader.GetInt32(reader.GetOrdinal("ID")),
                            Numero_Remito = reader["Numero_Remito"] as string,
                            Fecha_Ingreso = reader.GetDateTime(reader.GetOrdinal("Fecha_Ingreso")),
                            Es_Devolucion = reader.GetBoolean(reader.GetOrdinal("Es_Devolucion")),
                            FK_Orden_Compra = reader.GetInt32(reader.GetOrdinal("FK_Orden_Compra"))
                        });
                    }
                }
            }
            return lista;
        }

        public void AgregarOrdenAInforme(int informeId, int ordenId)
        {
            using (var conn = _db.ObtenerConexion())
            using (var cmd = new SqlCommand("sp_InformeCotejo_AgregarOrden", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@FK_Informe_Cotejo", informeId);
                cmd.Parameters.AddWithValue("@FK_Orden_Compra", ordenId);
                conn.Open();
                cmd.ExecuteNonQuery();
            }
        }

        public void EliminarOrdenDeInforme(int informeId, int ordenId)
        {
            using (var conn = _db.ObtenerConexion())
            using (var cmd = new SqlCommand("sp_InformeCotejo_EliminarOrden", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@FK_Informe_Cotejo", informeId);
                cmd.Parameters.AddWithValue("@FK_Orden_Compra", ordenId);
                conn.Open();
                cmd.ExecuteNonQuery();
            }
        }

        public List<OrdenSimple> ObtenerOrdenesPorInforme(int informeId)
        {
            var lista = new List<OrdenSimple>();
            using (var conn = _db.ObtenerConexion())
            using (var cmd = new SqlCommand("sp_InformeCotejo_ObtenerOrdenes", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@FK_Informe_Cotejo", informeId);
                conn.Open();
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        lista.Add(new OrdenSimple
                        {
                            ID = reader.GetInt32(reader.GetOrdinal("ID")),
                            Numero_Orden = reader["Numero_Orden"] as string,
                            Fecha_Emision = reader.GetDateTime(reader.GetOrdinal("Fecha_Emision")),
                            Estado = reader["Estado"] as string,
                            FK_Proveedor = reader.GetInt32(reader.GetOrdinal("FK_Proveedor"))
                        });
                    }
                }
            }
            return lista;
        }
    }
}