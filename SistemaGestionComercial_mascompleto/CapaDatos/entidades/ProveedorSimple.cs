namespace CapaDatos.Entidades
{
    public class ProveedorSimple
    {
        public int ID { get; set; }
        public string Razon_Social { get; set; }
        public string CUIT { get; set; }

        public override string ToString()
        {
            return Razon_Social;
        }
    }
}