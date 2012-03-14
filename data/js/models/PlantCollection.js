var PlantCollection = Backbone.Collection.extend({
	
	model: PlantModel,
	url: '/api/plants',
	parse: function(response) {
		return response.data;
	}
});