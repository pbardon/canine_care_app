CanineCareApp.Views.Profile = Backbone.CompositeView.extend({

    isSitter : false,

    initialize: function(options) {
        var profileView = this;
        this.currentUser = CanineCareApp.currentUser;
        if (this.currentUser && this.currentUser.attributes && this.currentUser.attributes.id) {
            CanineCareApp.Collections.sitters
                .getUserSitterProfile(this.currentUser.attributes.id, function(response) {
                    profileView.model = response;
                    if (profileView.model.attributes.id) {
                        profileView.isSitter = true;
                    }
                    var form = new CanineCareApp.Views.SitterForm({
                        model: profileView.model ,
                        collection: CanineCareApp.Collections.sitters
                    });
                    profileView.addSubview('#sitterInfoCard', form.render());
                    profileView.render();
                });
        }
        this.listenTo(this.model, 'sync', this.render);

        this.addSubview('.navbarContainer', options.navbarView.render());
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
