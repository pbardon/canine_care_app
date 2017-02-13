CanineCareApp.Views.AboutPage = Backbone.View.extend({
    template: JST['info/about'],

    render: function() {
        var renderedContent = this.template();
        this.$el.html(renderedContent);
        return this;
    }
});
