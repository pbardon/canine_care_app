CanineCareApp.Views.SitterBanner = Backbone.View.extend({
    template: JST['sitters/banner'],

    events: {
        'click #sitterInfoButton' : 'navToSitterInfo'
    },

    navToSitterInfo: function() {
        if (!this.model.attributes.id) {
            console.log('ERROR model does not have an id');
        }
        var sitterUrl = '#/sitters/' + this.model.attributes.id;
        Backbone.history.navigate(sitterUrl);
    },

    render: function() {
        var renderedContent = this.template({ sitter: this.model });
        this.$el.html(renderedContent);
        return this;
    }
});
