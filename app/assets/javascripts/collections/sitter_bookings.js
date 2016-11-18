DogSittingApp.Collections.SitterBookings = Backbone.Collection.extend({

    initialize: function(models, options) {
    },

    url: function() {
        return this.sitter.url() + "/bookings";
    },

    model: DogSittingApp.Models.Booking,

    getOrFetch: function(id) {
        var booking = this.get(id);
        var bookings = this;
        function addBooking() {
            bookings.add(booking);
        }

        if(!booking) {
            booking = new DogSittingApp.Models.Booking({ id: id });
            booking.fetch({ success: addBooking });
        }else {
            booking.fetch();
        }

        return booking;
    }

});

DogSittingApp.Collections.sitterbookings = new DogSittingApp.Collections.SitterBookings();
