CanineCareApp.Views.Navbar = Backbone.CompositeView.extend({
    isSitter : false,
    initialize: function(options) {
        var navbarView = this;
        this.currentUser = CanineCareApp.currentUser;
        this.model = this.currentUser;
        this.listenTo(this.model, 'sync', this.render);
    },

    events: {
        'click #bookingsButton' : 'navToBookings',
        'click #signInButton' : 'navToSignIn',
        'click #signUpButton' : 'navToSignUp',
        'click #profileButton' : 'navToProfile',
        'click #brandButton' : 'navToHome',
        'click #navToDogs': 'navToDogs',
        'click #logoutButton' : 'logout'
    },

    className: "ccNavbar",

    template: JST["navbar/navbar"],

    navTo: function(event, target) {
        event.preventDefault();
        Backbone.history.navigate(target, { trigger: true });
    },

    navToBookings: function(event) {
        var navbarView = this;
        var currentUser = CanineCareApp.currentUser;
        if (currentUser &&
                currentUser.attributes &&
                currentUser.attributes.id) {
            var sitterId = currentUser.attributes.id;
            CanineCareApp.Collections.sitters
            .getUserSitterProfile(sitterId, function(response) {
                var sitterUrl = '#/sitters/' + response.attributes.id + '/bookings';
                navbarView.navTo(event, sitterUrl);
            });
        }
    },

    navToDogs: function(event) {
        this.navTo(event, '#dogs');
    },

    navToHome: function(event) {
        this.navTo(event, '#');
    },

    navToSignIn: function(event) {
        this.navTo(event, '#session/new');
    },

    navToSignUp: function(event) {
        this.navTo(event, '#users/new');
    },

    navToProfile: function(event) {
        this.navTo(event, '#/profile');
    },

    logout: function() {
        var navbarView = this;
        $.ajax({
            url: '/session',
            method: 'DELETE',
            dataType: 'json',
            success: function() {
                CanineCareApp.currentUser = {};
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
