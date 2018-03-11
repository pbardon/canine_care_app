CanineCareApp.Views.Profile = Backbone.CompositeView.extend({

    isSitter : false,

    initialize: function(options) {
        var profileView = this;
        this.currentUser = CanineCareApp.currentUser;
        if (this.currentUser && this.currentUser.attributes && this.currentUser.attributes.id) {
            CanineCareApp.Collections.sitters
                .getUserSitterProfile(this.currentUser.attributes.id, function(response) {
                    profileView.model = response;
                    if (profileView.model.id) {
                        profileView.isSitter = true;
                    }
                    profileView.form = new CanineCareApp.Views.SitterForm({
                        model: profileView.model,
                        collection : CanineCareApp.Collections.sitters
                    });
                    profileView.addSubview('#profileInfoCard',
                        profileView.form.render());
                    profileView.render();
                });
        }

        this.addSubview('.navbarContainer', options.navbarView.render());
        this.activeTabSelector = '#sitterInfoTab';
        this.render();
    },

    events: {
        'click #sitterInfoTab' : 'loadSitterInfoView',
        'click #dogsTab' : 'loadDogsView'
    },

    className: "profilePage",

    template: JST["profile/profile"],

    loadSitterInfoView: function(e) {
        e.preventDefault();
        this.removeSubview('#profileInfoCard', this.dogsView);
        this.addSubview('#profileInfoCard', this.form.render());
        this.$el.find(this.activeTabSelector).removeClass('active');
        this.activeTabSelector = '#sitterInfoTab';
        this.render();
    },

    loadDogsView: function(e) {
        e.preventDefault();
        CanineCareApp.Collections.dogs.fetch();
        this.dogsView = new CanineCareApp.Views.DogsList({
            collection: CanineCareApp.Collections.dogs
        });
        this.removeSubview('#profileInfoCard', this.form);
        this.addSubview('#profileInfoCard', this.dogsView.render());
        this.$el.find(this.activeTabSelector).removeClass('active');
        this.activeTabSelector = '#dogsTab';
        this.render();
    },

    render: function() {
        var renderedContent = this.template();
        this.$el.html(renderedContent);
        this.attachSubviews();
        this.$el.find(this.activeTabSelector).addClass('active');
        return this;
    }
});
