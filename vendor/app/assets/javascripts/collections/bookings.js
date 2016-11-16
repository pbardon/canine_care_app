DogSittingApp.Collections.Bookings = Backbone.Collection.extend({

  url: 'bookings/',

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
