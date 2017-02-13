CanineCareApp.Views.SignInPage = Backbone.View.extend({
    template: JST['login/sign_in'],
    render: function() {
        var AUTH_TOKEN = $('meta[name=csrf-token]').attr('content');
        var renderedContent = this.template({token : AUTH_TOKEN });
        this.$el.html(renderedContent);
        return this;
    }
});
