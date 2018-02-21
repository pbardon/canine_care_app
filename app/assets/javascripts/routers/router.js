CanineCareApp.Routers.Router = Backbone.Router.extend({
    initialize: function(user) {
        this.$rootEl = $('#canineCareApp');
        this.navbarView = new CanineCareApp.Views.Navbar({
            model: user
        });
        CanineCareApp.currentUser = user;
        Backbone.history.start();
        // Backbone.history.start({pushState: true});
    },
    routes: {
        '': 'sittersIndex',
        'dogs': 'dogsIndex',
        'profile' : 'profilePage',
        'session/new' : 'signIn',
        'users/new': 'signUp',
        'contact' : 'contactPage',
        'about' : 'aboutPage',
        'services' : 'servicesPage',
        'dogs/new': 'dogNew',
        'dogs/:id/edit': 'dogEdit',
        'dogs/:id': 'dogShow',
        'sitters/new': 'sitterNew',
        'sitters/:id': 'sitterShow',
        'sitters/:id/edit': 'sitterEdit',
        'bookings/:id/new': 'newBooking',
        'sitters/:id/bookings' : 'bookingIndex'
    },

    dashboard: function () {
        var dashboardView = new CanineCareApp.Views.Dashboard();
        this._swapView(dashboardView);
    },

    signIn: function () {
        var signInView = new CanineCareApp.Views.SignInPage();
        this._swapView(signInView);
    },

    signUp: function () {
        var signUpView = new CanineCareApp.Views.SignUpPage();
        this._swapView(signUpView);
    },

    aboutPage: function () {
        var aboutView = new CanineCareApp.Views.AboutPage();
        this._swapView(aboutView);
    },

    contactPage: function () {
        var contactView = new CanineCareApp.Views.ContactPage();
        this._swapView(contactView);
    },

    servicesPage: function () {
        var servicesView = new CanineCareApp.Views.ServicesPage();
        this._swapView(servicesView);
    },

    dogsIndex: function () {
        CanineCareApp.Collections.dogs.fetch();

        var dogsView = new CanineCareApp.Views.DogsIndex({
            collection: CanineCareApp.Collections.dogs
        });

        this._swapView(dogsView);
    },

    dogShow: function(id) {
        var dog = CanineCareApp.Collections.dogs.getOrFetch(id);
        var showDogView = new CanineCareApp.Views.DogShow({
            model: dog
        });

        this._swapView(showDogView);
    },

    dogNew: function() {
        var dog = new CanineCareApp.Models.Dog();
        var newDogView = new CanineCareApp.Views.DogForm({
            model: dog,
            collection: CanineCareApp.Collections.dogs
        });

        this._swapView(newDogView);
    },

    dogEdit: function(id) {
        var dog = CanineCareApp.Collections.dogs.getOrFetch(id);

        var editDogView = new CanineCareApp.Views.DogForm({
            model: dog,
            collection: CanineCareApp.Collections.dogs
        });

        this._swapView(editDogView);
    },

    profilePage: function() {
        var profilePageView = new CanineCareApp.Views.Profile({
            navbarView: this.navbarView
        });

        this._swapView(profilePageView);
    },

    sitterNew: function() {
        var sitter = new CanineCareApp.Models.Sitter();
        var newSitterView = new CanineCareApp.Views.SitterForm({
            model: sitter,
            collection: CanineCareApp.Collections.sitters
        });

        this._swapView(newSitterView);

    },

    sitterShow: function(id) {
        var sitter = CanineCareApp.Collections.sitters.getOrFetch(id);
        var showSitterView = new CanineCareApp.Views.SitterShow({
            model: sitter,
            navbarView: this.navbarView
        });

        this._swapView(showSitterView);
    },

    sittersIndex: function() {
        var oThis = this;
        CanineCareApp.Collections.sitters.fetch();
        if (typeof google === 'undefined') {
            var url = "http://maps.googleapis.com/maps/api/js?key=" +
            CanineCareApp.mapKey + "&sensor=false";
            $.ajax({
                url: url,
                dataType: "script",
                async: false,
                success: function(){
                    var sittersView = new CanineCareApp.Views.SittersIndex({
                        collection: CanineCareApp.Collections.sitters,
                        navbarView: oThis.navbarView
                    });

                    oThis._swapView(sittersView);
                },
                error: function(err) {
                    console.log(JSON.stringify(err.message));
                }
            });
            return;
        } else {
            var sittersView = new CanineCareApp.Views.SittersIndex({
                collection: CanineCareApp.Collections.sitters,
                navbarView: oThis.navbarView
            });

            oThis._swapView(sittersView);
        }
    },

    sitterEdit: function(id) {
        var sitter = CanineCareApp.Collections.sitters.getOrFetch(id);

        var editSitterView = new CanineCareApp.Views.SitterForm({
            model: sitter,
            collection: CanineCareApp.Collections.sitters
        });

        this._swapView(editSitterView);
    },

    newBooking: function(id) {
        var sitterId= parseInt(id);
        var booking = new CanineCareApp.Models.Booking({sitter_id: sitterId});
        var dogs = CanineCareApp.Collections.dogs;
        dogs.fetch();

        var newBookingView = new CanineCareApp.Views.NewSitterBooking({
            model: booking,
            collection: CanineCareApp.Collections.sitterbookings,
            dogs: dogs
        });

        this._swapView(newBookingView);
    },

    bookingIndex: function(id) {
        var sitterId = parseInt(id);
        var sitter = CanineCareApp.Collections.sitters.getOrFetch(id);
        var bookingView = new CanineCareApp.Views.SitterBookingIndex({
            model: sitter
        });

        this._swapView(bookingView);
    },

    _swapView: function (view) {
        if (this.currentView &&
            this.currentView.remove()) {
                this.currentView.undelegateEvents();
                this.currentView = view;
        }

        view.addSubview('.navbarContainer', this.navbarView.render());

        this.$rootEl.html(view.render().$el);

        view.attachSubviews();
    }
});
