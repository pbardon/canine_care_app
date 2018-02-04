CanineCareApp.Views.SitterBanner = Backbone.View.extend({
    template: JST['sitters/banner'],

    events: {
    },

    render: function() {
        var renderedContent = this.template({ sitter: this.model });
        this.$el.html(renderedContent);
        return this;
    }
});
