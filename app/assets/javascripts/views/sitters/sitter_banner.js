CanineCareApp.Views.SitterBanner = Backbone.View.extend({
    template: JST['sitters/banner'],

    events: {
        'click #sitterInfoButton' : 'navToSitterInfo'
    },

    navToSitterInfo: function() {
        if (!this.model.attributes.id) {
            console.log('ERROR model does not have an id');
        }

        if (this.model.attributes.current_user_id && 
            this.model.attributes.current_user_id === this.model.attributes.user_id) {
                Backbone.history.navigate('#/profile');
                return;
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
