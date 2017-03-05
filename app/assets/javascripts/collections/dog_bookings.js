CanineCareApp.Collections.DogBookings = Backbone.Collection.extend({
    initialize: function(models, options) {
    },

    url: function() {
        return this.dog.url() + "/bookings";
    },

    model: CanineCareApp.Models.Booking,

    getOrFetch: function(id) {
        var booking = this.get(id);
        var bookings = this;
        function addBooking() {
            bookings.add(booking);
        }
        if(!booking) {
            booking = new CanineCareApp.Models.Booking({ id: id });
            booking.fetch({ success: addBooking });
        }else {
            booking.fetch();
        }
        return booking;
    }
});

CanineCareApp.Collections.dogbookings = new CanineCareApp.Collections.DogBookings();
