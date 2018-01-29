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
        'click #signUpButton' : 'navToSignUp'
    },

    className: "ccNavbar",

    template: JST["navbar/navbar"],

    navToSignIn: function() {
        Backbone.history.navigate('#session/new', { trigger: true });
    },

    navToSignUp: function() {
        Backbone.history.navigate('#users/new', { trigger: true });
    },


    render: function() {
        var renderedContent = this.template();

        this.$el.html(renderedContent);

        this.attachSubviews();

        return this;
    }
});
