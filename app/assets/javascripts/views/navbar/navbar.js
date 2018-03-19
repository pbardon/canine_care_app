CanineCareApp.Views.Navbar = Backbone.CompositeView.extend({
    isSitter : false,
    initialize: function(options) {
        var navbarView = this;
        this.currentUser = CanineCareApp.currentUser;
        this.model = this.currentUser;
        this.listenTo(this.model, 'sync', this.render);
    },

    events: {
        'click #signInButton' : 'navToSignIn',
        'click #signUpButton' : 'navToSignUp',
        'click #profileButton' : 'navToProfile',
        'click #brandButton' : 'navToHome',
        'click #navToDogs': 'navToDogs',
        'click #logoutButton' : 'logout'
    },

    className: "ccNavbar",

    template: JST["navbar/navbar"],

    navToSignIn: function() {
        Backbone.history.navigate('#session/new', { trigger: true });
    },

    navToDogs: function() {
        Backbone.history.navigate('#dogs', { trigger: true });

    },

    navToHome: function() {
        Backbone.history.navigate('#', { trigger: true });
    },

    navToSignUp: function() {
        Backbone.history.navigate('#users/new', { trigger: true });
    },

    navToProfile: function(event) {
        event.preventDefault();
        Backbone.history.navigate('#/profile', { trigger: true });
    },

    logout: function() {
        var navbarView = this;
        $.ajax({
            url: '/session',
            method: 'DELETE',
            dataType: 'json',
            success: function() {
                CanineCareApp.currentUser = {};
                console.log("LOGGED OUT");
                CanineCareApp.loggedIn = false;
                Backbone.history.navigate('#/', { trigger: true });
                navbarView.render();
            },
            error: function(err) {
                console.log('there was a problem logging out ' + JSON.stringify(err.message));
            }
        });
    },

    render: function() {
        var renderedContent = this.template();

        CanineCareApp.loggedIn = !!CanineCareApp.currentUser.attributes;

        this.$el.html(renderedContent);

        this.attachSubviews();

        return this;
    }
});
