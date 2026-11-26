namespace CapaDatos.Entidades
{
    public class ItemCombo
    {
        public int ID { get; set; }
        public string Texto { get; set; }

        public override string ToString()
        {
            return Texto;
        }
    }
}