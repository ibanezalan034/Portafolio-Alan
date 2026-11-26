using System.Collections.Generic;
using System.Data.SqlClient;
using CapaDatos.Entidades;

namespace CapaDatos.DAL
{
    public class CatalogosDAL
    {
        private ConexionBD _db = new ConexionBD();

        public List<ProveedorSimple> ObtenerProveedores()
        {
            var lista = new List<ProveedorSimple>();
            using (var conn = _db.ObtenerConexion())
            using (var cmd = new SqlCommand("SELECT ID, Razon_Social, CUIT FROM Proveedores WHERE Activo = 1 ORDER BY Razon_Social", conn))
            {
                conn.Open();
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        lista.Add(new ProveedorSimple
                        {
                            ID = reader.GetInt32(0),
                            Razon_Social = reader.GetString(1),
                            CUIT = reader.GetString(2)
                        });
                    }
                }
            }
            return lista;
        }

        public List<FacturaSimple> ObtenerFacturas()
        {
            var lista = new List<FacturaSimple>();
            using (var conn = _db.ObtenerConexion())
            using (var cmd = new SqlCommand(
                "SELECT f.ID, f.Numero_Factura, f.Monto_Total, f.Fecha, f.FK_Proveedor, p.Razon_Social " +
                "FROM Facturas_Compra f INNER JOIN Proveedores p ON f.FK_Proveedor = p.ID ORDER BY f.Fecha DESC", conn))
            {
                conn.Open();
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        lista.Add(new FacturaSimple
                        {
                            ID = reader.GetInt32(0),
                            Numero_Factura = reader.GetString(1),
                            Monto_Total = reader.GetDecimal(2),
                            Fecha = reader.GetDateTime(3),
                            FK_Proveedor = reader.GetInt32(4),
                            NombreProveedor = reader.GetString(5)
                        });
                    }
                }
            }
            return lista;
        }

        public List<OrdenSimple> ObtenerOrdenes()
        {
            var lista = new List<OrdenSimple>();
            using (var conn = _db.ObtenerConexion())
            using (var cmd = new SqlCommand(
                "SELECT ID, Numero_Orden, Fecha_Emision, Estado, FK_Proveedor FROM Ordenes_Compra ORDER BY Fecha_Emision DESC", conn))
            {
                conn.Open();
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        lista.Add(new OrdenSimple
                        {
                            ID = reader.GetInt32(0),
                            Numero_Orden = reader.GetString(1),
                            Fecha_Emision = reader.GetDateTime(2),
                            Estado = reader.GetString(3),
                            FK_Proveedor = reader.GetInt32(4)
                        });
                    }
                }
            }
            return lista;
        }

        public List<RemitoSimple> ObtenerRemitos()
        {
            var lista = new List<RemitoSimple>();
            using (var conn = _db.ObtenerConexion())
            using (var cmd = new SqlCommand(
                "SELECT ID, Numero_Remito, Fecha_Ingreso, Es_Devolucion, FK_Orden_Compra FROM Remitos_Ingreso ORDER BY Fecha_Ingreso DESC", conn))
            {
                conn.Open();
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        lista.Add(new RemitoSimple
                        {
                            ID = reader.GetInt32(0),
                            Numero_Remito = reader.GetString(1),
                            Fecha_Ingreso = reader.GetDateTime(2),
                            Es_Devolucion = reader.GetBoolean(3),
                            FK_Orden_Compra = reader.GetInt32(4)
                        });
                    }
                }
            }
            return lista;
        }

        public List<UsuarioSimple> ObtenerUsuarios()
        {
            var lista = new List<UsuarioSimple>();
            using (var conn = _db.ObtenerConexion())
            using (var cmd = new SqlCommand("SELECT ID, Nombre, Apellido FROM Usuarios WHERE Activo = 1 ORDER BY Apellido", conn))
            {
                conn.Open();
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        lista.Add(new UsuarioSimple
                        {
                            ID = reader.GetInt32(0),
                            Nombre = reader.GetString(1),
                            Apellido = reader.GetString(2)
                        });
                    }
                }
            }
            return lista;
        }
    }
}