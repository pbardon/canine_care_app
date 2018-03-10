CanineCareApp.Views.NoSitterMessage = Backbone.View.extend({
    template: JST['errors/no_sitter_message'],

    render: function() {
        var renderedContent = this.template();
        this.$el.html(renderedContent);
        return this;
    }
});
