using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Net;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Documents;
using System.Windows.Ink;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Shapes;
using PlantHarmony.Data;
using System.Linq;

namespace PlantHarmony.ViewModels
{
    public class PlantCollectionVM : BaseViewModel
    {
        public PlantCollectionVM(IEnumerable<Plant> plants)
        {
            Plants = new ObservableCollection<PlantVM>(plants.Select(x => new PlantVM(x)));
        }

        public ObservableCollection<PlantVM> Plants
        {
            get { return (ObservableCollection<PlantVM>)GetValue(MyPropertyProperty); }
            set { SetValue(MyPropertyProperty, value); }
        }

        // Using a DependencyProperty as the backing store for MyProperty.  This enables animation, styling, binding, etc...
        public static readonly DependencyProperty MyPropertyProperty =DependencyProperty.Register("MyProperty", typeof(ObservableCollection<PlantVM>), typeof(PlantCollectionVM), new PropertyMetadata(null));

        

        



        
    }
}
