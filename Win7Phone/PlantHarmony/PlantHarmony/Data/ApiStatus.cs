using System.Runtime.Serialization;

namespace PlantHarmony.Data
{
    [DataContract]
    public class ApiStatus
    {
        public int code { get; set; }
    }
}