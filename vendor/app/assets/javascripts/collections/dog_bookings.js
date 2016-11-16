DogSittingApp.Collections.DogBookings = Backbone.Collection.extend({
  initialize: function(models, options) {
  },

  url: function() {
    return this.dog.url() + "/bookings";
  },

  model: DogSittingApp.Models.Booking,

  getOrFetch: function(id) {
    var booking = this.get(id)
    var bookings = this;
    if(!booking) {
      booking = new DogSittingApp.Models.Booking({ id: id });
      booking.fetch({
        success: function() {
          bookings.add(booking)
        }
      });
    }else {
      booking.fetch();
    }

    return booking;
  }

});

DogSittingApp.Collections.dogbookings = new DogSittingApp.Collections.DogBookings();
