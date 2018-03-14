CanineCareApp.Views.NoReviewMessage = Backbone.View.extend({
    template: JST['errors/no_review_msg'],

    render: function() {
        var renderedContent = this.template();
        this.$el.html(renderedContent);
        return this;
    }
});
