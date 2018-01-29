CanineCareApp.Views.SignInPage = Backbone.View.extend({
    template: JST['login/sign_in'],

    events: {
        'submit form':'submit',
        'click .errorClose': 'close',
        'click .loginButton' : 'submit',
        'click .goToRegister' : 'navToRegister'
    },

    render: function() {
        var AUTH_TOKEN = $('meta[name=csrf-token]').attr('content');
        var renderedContent = this.template({token : AUTH_TOKEN });
        this.$el.html(renderedContent);
        $('.errorMessage').hide();
        return this;
    },

    navToRegister: function(event) {
        Backbone.history.navigate('#users/new', {trigger: true, replace: true});
    },

    submit: function(event) {
        var loginView = this;
        event.preventDefault();
        var loginUser = $('#loginUser').val();
        var loginPassword = $('#loginPassword').val();
        if (!loginUser) {
            //must provide login user, show error
            this.addErrorMessage({error: 'must provide user'});
            return;
        }
        if (!loginPassword) {
            this.addErrorMessage({error: 'must provide password'});
            return;
        }
        var loginInfo = {
            user: {
                email: loginUser,
                password: loginPassword
            }
        };

        var user = new CanineCareApp.Models.User();
        $.ajax({
            url: "http://localhost:3000/session",
            method: "POST",
            data: loginInfo,
            dataType: "json",
            success: function(response) {
                user.attributes = response;
                CanineCareApp.currentUser = user;
                CanineCareApp.loggedIn = true;
                Backbone.history.navigate(" ", { trigger: true });
            },
            error: function(response) {
                var errData = JSON.parse(response.responseText);
                loginView.addErrorMessage(errData);
            }
        });
    },

    close: function(event) {
        event.preventDefault();
        $('.errorMessage').hide();
    },

    addErrorMessage: function(errData) {
        var errorMsgDiv = $('.errorMessage');
        errorMsgDiv.addClass('alert alert-dismissible alert-danger');
        errorMsgDiv.find('div.errorMessageContent').html(errData.error.toString());
        errorMsgDiv.show();
    }
});
