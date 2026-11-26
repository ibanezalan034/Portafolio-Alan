using System;
using System.Data;
using System.Data.SqlClient;

namespace CapaDatos
{
    public class ConexionBD
    {
        private string cadenaConexion = "Server=localhost\\SQLEXPRESS;Database=GestionCompras;Integrated Security=true;";

        public SqlConnection ObtenerConexion()
        {
            return new SqlConnection(cadenaConexion);
        }

        public bool EjecutarConsulta(string query, SqlParameter[] parametros = null)
        {
            using (SqlConnection conexion = ObtenerConexion())
            {
                using (SqlCommand cmd = new SqlCommand(query, conexion))
                {
                    if (parametros != null) cmd.Parameters.AddRange(parametros);
                    conexion.Open();
                    cmd.ExecuteNonQuery();
                    return true;
                }
            }
        }

        public DataTable Listar(string query, SqlParameter[] parametros = null)
        {
            using (SqlConnection conexion = ObtenerConexion())
            {
                using (SqlCommand cmd = new SqlCommand(query, conexion))
                {
                    if (parametros != null) cmd.Parameters.AddRange(parametros);
                    using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                    {
                        DataTable dt = new DataTable();
                        da.Fill(dt);
                        return dt;
                    }
                }
            }
        }
    }
}
