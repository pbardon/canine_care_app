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
                    profileView.render();
                });
            }
        this.listenTo(this.model, 'sync', this.render);

        if (!this.model || !this.model.attributes || !this.model.attributes.id) {
            this.model = new CanineCareApp.Models.Sitter({ id: 0 });
        }

        this.addSubview('.navbarContainer', options.navbarView.render());

        var form = new CanineCareApp.Views.SitterForm({ model: this.model });

        this.addSubview('#sitterInfoCard', form.render());
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
