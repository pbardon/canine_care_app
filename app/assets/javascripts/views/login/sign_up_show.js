CanineCareApp.Views.SignUpPage = Backbone.CompositeView.extend({
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
        Backbone.history.navigate('#session/new', { trigger: true, replace: true });
    },

    validateUserInfo: function(formData, passwordConfirm) {
        if (!formData.name) {
            this.addErrorMessage({ error: 'You must provide a username'});
            return false;
        }

        if (!formData.email) {
            this.addErrorMessage({ error: 'You must provide an email'});
            return false;
        }

        if (!formData.password) {
            this.addErrorMessage({ error: 'You must provide a password'});
            return false;
        }

        if (formData.password !== passwordConfirm) {
            this.addErrorMessage({ error: 'Password must match'});
            return false;
        }

        return true;
    },

    submit: function(event) {
        event.preventDefault();
        var signUpView = this;
        var username = $('.loginUsername').val();
        var loginEmail = $('.loginEmail').val();
        var password = $('.loginPassword').val();
        var passwordConfirm = $('.loginPasswordConfirm').val();
        var formData = {
            user: {
                name: username,
                email: loginEmail,
                password: password
            }
        };
        if (!this.validateUserInfo(formData.user, passwordConfirm)) {
            return;
        }
        $.ajax({
            url: "/users",
            method: "POST",
            data: formData,
            dataType: "json",
            success: function(response) {
                var user = new CanineCareApp.Models.User();
                user.attributes = response;
                CanineCareApp.currentUser = user;
                CanineCareApp.loggedIn = true;
                Backbone.history.navigate("", { trigger: true });
            },
            error: function(response) {
                var errData = JSON.parse(response.responseText);
                signUpView.addErrorMessage(errData);
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
