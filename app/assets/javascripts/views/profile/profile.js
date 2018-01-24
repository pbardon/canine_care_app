CanineCareApp.Views.Profile = Backbone.CompositeView.extend({

    initialize: function(options) {
        var profileView = this;
        this.currentUser = options.currentUser;
        CanineCareApp.Collections.sitters
            .getUserSitterProfile(this.currentUser.id, function() {
                profileView.render();
            });
        this.listenTo(this.model, 'sync', this.render);
    },

    events: {
    },

    className: "profilePage",

    template: JST["profile/profile"],

    render: function() {
        var renderedContent = this.template();

        this.$el.html(renderedContent);

        this.attachSubviews();

        return this;
    }
});
