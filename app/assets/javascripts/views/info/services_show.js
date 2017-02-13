CanineCareApp.Views.ServicesPage = Backbone.View.extend({
    template: JST['info/services'],
    render: function() {
        var renderedContent = this.template();
        this.$el.html(renderedContent);
        return this;
    }
});
