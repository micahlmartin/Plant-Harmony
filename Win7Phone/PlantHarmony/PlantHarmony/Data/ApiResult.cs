using System;
using System.Net;
using System.Runtime.Serialization;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Documents;
using System.Windows.Ink;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Shapes;

namespace PlantHarmony.Data
{
    [DataContract]
    public class ApiResult
    {
        public ApiStatus status { get; set; }
    }

    [DataContract]
    public class ApiResult<T>
    {
        public T data { get; set; }
    }
}
