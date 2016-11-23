CanineCareApp.Collections.SitterBookings = Backbone.Collection.extend({

  initialize: function(models, options) {
  },

  url: function() {
    return this.sitter.url() + "/bookings";
  },

  model: CanineCareApp.Models.Booking,

  getOrFetch: function(id) {
    var booking = this.get(id)

    if(!booking) {
      booking = new CanineCareApp.Models.Booking({ id: id });
      booking.fetch({
        success: function() {
          this.add(booking)
        }.bind(this)
      });
    }else {
      booking.fetch();
    }

    return booking;
  }

});

CanineCareApp.Collections.sitterbookings = new CanineCareApp.Collections.SitterBookings();
