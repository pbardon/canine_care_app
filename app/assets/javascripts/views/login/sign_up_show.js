CanineCareApp.Views.SignUpPage = Backbone.View.extend({
    template: JST['login/sign_up'],

    events: {
        'submit form':'submit',
        'click .errorClose': 'close',
        'click .createButton' : 'submit',
        'click .navToLogin' : 'navToLogin'
    },

    render: function() {
        var AUTH_TOKEN = $('meta[name=csrf-token]').attr('content');
        var renderedContent = this.template({token : AUTH_TOKEN });
        this.$el.html(renderedContent);
        $('.errorMessage').hide();
        return this;
    },

    navToLogin: function() {
        Backbone.history.navigate('session/new', { trigger: true, replace: true });
    },


    submit: function(event) {
        event.preventDefault();
        var username = $('.loginUsername').val();
        var loginEmail = $('.loginEmail').val();
        var password = $('.loginPassword').val();
        var passwordConfirm = $('.loginPasswordConfirm').val();
        if (!username) {
            this.addErrorMessage({ error: 'must provide username'});
            return;
        }

        if (!loginEmail) {
            this.addErrorMessage({ error: 'must provide username'});
            return;
        }

        if (!password) {
            this.addErrorMessage({ error: 'must provide password'});
            return;
        }

        if (password !== passwordConfirm) {
            this.addErrorMessage({ error: 'Password must match'});
            return;
        }

        var formData = {
            user: {
                name: username,
                email: loginEmail,
                password: password
            }
        };
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
                this.addErrorMessage(errData);
            }
        });
    },


    addErrorMessage: function(errData) {
        var errorMsgDiv = $('.errorMessage');
        errorMsgDiv.addClass('alert alert-dismissible alert-danger');
        errorMsgDiv.find('div.errorMessageContent').html(errData.error.toString());
        errorMsgDiv.show();
    },

    close: function(event) {
        event.preventDefault();
        $('.errorMessage').hide();
    }
});
