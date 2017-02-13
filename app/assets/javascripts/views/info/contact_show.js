CanineCareApp.Views.ContactPage = Backbone.View.extend({
    template: JST['info/contact'],
    render: function() {
        var renderedContent = this.template();
        this.$el.html(renderedContent);
        return this;
    }
});
