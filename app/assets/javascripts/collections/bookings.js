CanineCareApp.Collections.Bookings = Backbone.Collection.extend({

    model: CanineCareApp.Models.Booking,

    getOrFetch: function(id) {
        var booking = this.get(id),
            bookings = this;
        function addBooking() {
            bookings.add(booking);
        }
        function bookingErr(err) {
            console.log(err);
        }
        if (!booking) {
            booking = new CanineCareApp.Models.Booking({ id: id });
            booking.fetch({ success: addBooking, error: bookingErr });
        } else {
            booking.fetch();
        }
        return booking;
    }
});
