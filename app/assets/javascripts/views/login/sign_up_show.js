CanineCareApp.Views.SignUpPage = Backbone.View.extend({
    template: JST['login/sign_up'],

    events: {
        'submit form':'submit',
        'click .errorClose': 'close'
    },

    render: function() {
        var AUTH_TOKEN = $('meta[name=csrf-token]').attr('content');
        var renderedContent = this.template({token : AUTH_TOKEN });
        this.$el.html(renderedContent);
        $('.errorMessage').hide();
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
                Backbone.history.navigate("#/");
                window.location.reload();
            },
            error: function(response) {
                var errData = JSON.parse(response.responseText);
                var errorMsgDiv = $('.errorMessage');
                errorMsgDiv.addClass('alert alert-dismissible alert-danger');
                errorMsgDiv.find('div.errorMessageContent').html(errData.error.toString());
                errorMsgDiv.show();
            }
        });
    },

    close: function(event) {
        event.preventDefault();
        $('.errorMessage').hide();
    }
});
