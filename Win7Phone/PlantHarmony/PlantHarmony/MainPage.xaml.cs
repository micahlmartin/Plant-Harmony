using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Shapes;
using Microsoft.Phone.Controls;
using PlantHarmony.Data;

namespace PlantHarmony
{
    public partial class MainPage : PhoneApplicationPage
    {
        // Constructor
        public MainPage()
        {
            InitializeComponent();

            // Set the data context of the listbox control to the sample data
            this.Loaded += new RoutedEventHandler(MainPage_Loaded);
        }

        // Load data for the ViewModel Items
        private void MainPage_Loaded(object sender, RoutedEventArgs e)
        {
            var repo = new PlantRepository();
            repo.GetPlantsAsync(results => Dispatcher.BeginInvoke(() => ResultsListBox.ItemsSource = results));
            //if (!App.ViewModel.IsDataLoaded)
            //{
            //    App.ViewModel.LoadData();
            //}
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            var repo = new PlantRepository();
            repo.SearchPlantsAsync(SearchBox.Text, results => Dispatcher.BeginInvoke(() => ResultsListBox.ItemsSource = results));
        }
    }
}