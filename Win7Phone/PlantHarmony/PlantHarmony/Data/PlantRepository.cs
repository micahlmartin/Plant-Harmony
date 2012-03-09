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
using RestSharp;
using System.Collections.Generic;

namespace PlantHarmony.Data
{
    public class PlantRepository
    {
        private RestClient _client;
        private const string BaseUrl = "http://localhost:3010";

        public PlantRepository()
        {
            _client = new RestClient(BaseUrl);
        }

        public void GetPlantsAsync(Action<List<Plant>> callback)
        {
            var request = new RestRequest("plants");
            _client.ExecuteAsync<ApiResult<List<Plant>>>(request, resp => callback(resp.Data.data));
        }
    }
}
