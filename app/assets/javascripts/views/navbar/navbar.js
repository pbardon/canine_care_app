CanineCareApp.Views.Navbar = Backbone.CompositeView.extend({

    isSitter : false,
    initialize: function(options) {
        var navbarView = this;
        this.currentUser = CanineCareApp.currentUser;
        this.model = this.currentUser;
        this.listenTo(this.model, 'change', this.render);
    },

    events: {
        'click #signInButton' : 'navToSignIn',
        'click #signUpButton' : 'navToSignUp',
        'click #profileButton' : 'navToProfile',
        'click #logoutButton' : 'logout'
    },

    className: "ccNavbar",

    template: JST["navbar/navbar"],

    navToSignIn: function() {
        Backbone.history.navigate('#session/new', { trigger: true });
    },

    navToSignUp: function() {
        Backbone.history.navigate('#users/new', { trigger: true });
    },

    navToProfile: function(event) {
        event.preventDefault();
        Backbone.history.navigate('#/profile', { trigger: true });
    },

    logout: function() {
        var sitterView = this;
        $.ajax({
            url: 'http://localhost:3000/session',
            method: 'DELETE',
            dataType: 'json',
            success: function() {
                CanineCareApp.currentUser = {};
                console.log("LOGGED OUT");
                CanineCareApp.loggedIn = false;
                sitterView.removeSubview('.navbarContainer', sitterView.navbarView);
                var navbarView = new CanineCareApp.Views.Navbar({});
                sitterView.addSubview('.navbarContainer', navbarView.render());
                sitterView.render();
            },
            error: function(err) {
                console.log('there was a problem logging out ' + JSON.stringify(err.message));
            }
        });
    },

    render: function() {
        var renderedContent = this.template();

        this.$el.html(renderedContent);

        this.attachSubviews();

        return this;
    }
});
