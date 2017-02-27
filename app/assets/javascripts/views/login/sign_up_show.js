CanineCareApp.Views.SignUpPage = Backbone.View.extend({
    template: JST['login/sign_up'],

    events: {
        'submit form':'submit'
    },

    render: function() {
        var AUTH_TOKEN = $('meta[name=csrf-token]').attr('content');
        var renderedContent = this.template({token : AUTH_TOKEN });
        this.$el.html(renderedContent);
        return this;
    },

    submit: function(event) {
        event.preventDefault();
        var formData = $(event.currentTarget).serializeJSON();
        $.ajax({
            url: "/users",
            method: "POST",
            data: formData,
            dataType: "json",
            success: function(response) {
                Backbone.history.navigate("#/", { trigger: true });
            },
            error: function(response) {
                console.log(JSON.stringify(response));
                var errData = JSON.parse(response.responseText);
                var errorMsgDiv = $('.errorMessage');
                errorMsgDiv.replaceWith(errData.error.toString());
            }
        });
    }
});
