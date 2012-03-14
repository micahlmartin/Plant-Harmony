var PlantCollectionView = Backbone.View.extend({
	
	initialize: function() {
		this.model = new PlantCollection();
		this.model.bind('reset', this.render, this);
		this.model.fetch();
	},

	render: function() {
		$el = $(this.el);
		$el.empty();
		_.each(this.model.models, function(element) { 
			$el.append(new PlantListItemView({model: element}).render().el);
		});
	}

});