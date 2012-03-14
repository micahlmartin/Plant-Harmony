using System;
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

namespace PlantHarmony.ViewModels
{
    public class PlantVM : BaseViewModel
    {
        private Plant _plant;

        public PlantVM(Plant plant)
        {
            _plant = plant;

            Type = plant.type;
            Name = plant.name;
            Image = plant.image;
        }

        public bool IsSelected
        {
            get { return (bool)GetValue(IsSelectedProperty); }
            set { SetValue(IsSelectedProperty, value); }
        }
        public static readonly DependencyProperty IsSelectedProperty = DependencyProperty.Register("IsSelected", typeof(int), typeof(PlantCollectionVM), new PropertyMetadata(false));

        public string Type { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
    }
}
