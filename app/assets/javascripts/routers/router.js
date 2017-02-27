CanineCareApp.Routers.Router = Backbone.Router.extend({
  initialize: function() {
    this.$rootEl = $('#main');
  },

  routes: {
    '': 'sittersIndex',
    'dogs': 'dogsIndex',
    'sign_in' : 'signIn',
    'sign_up': 'signUp',
    'contact' : 'contactPage',
    'about' : 'aboutPage',
    'services' : 'servicesPage',
    'dogs/new': 'dogNew',
    'dogs/:id/edit': 'dogEdit',
    'dogs/:id': 'dogShow',
    'sitters/new': 'sitterNew',
    'sitters/:id': 'sitterShow',
    'sitters/:id/edit': 'sitterEdit',
    'bookings/:id/new': 'newBooking'
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
      model: sitter
    });

    this._swapView(showSitterView);
  },

  sittersIndex: function() {
    CanineCareApp.Collections.sitters.fetch();
    var sittersView = new CanineCareApp.Views.SittersIndex({
      collection: CanineCareApp.Collections.sitters
    });

    this._swapView(sittersView);
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
    var sitter_id = parseInt(id);
    var booking = new CanineCareApp.Models.Booking({sitter_id: sitter_id});
    var dogs = CanineCareApp.Collections.dogs;
    dogs.fetch();

    var newBookingView = new CanineCareApp.Views.NewSitterBooking({
      model: booking,
      collection: CanineCareApp.Collections.sitterbookings,
      dogs: dogs
    });

    this._swapView(newBookingView);
  },



  _swapView: function (view) {
    if (this.currentView && this.currentView.remove()) {
        this.currentView = view;
    }

    this.$rootEl.html(view.render().$el);
  }
});
