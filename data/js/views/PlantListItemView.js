var PlantListItemView = Backbone.View.extend({
	
    initialize: function () {

        //Chache the jquery templates
        if (typeof $.template['plant-list-item'] === 'undefined') {
            $.template('plant-list-item', $("#plant-list-item-tmpl"));
        }

    },

    events: {
    	"click" : "showDetails"
    },

    showDetails: function() {
		console.log('clicked');
    },

	render: function() {
		var html = $.tmpl('plant-list-item', this.model.attributes);
		this.el = html;
		return this;
	}

});