CanineCareApp.Collections.Bookings = Backbone.Collection.extend({

    url: 'bookings/',

    model: CanineCareApp.Models.Booking,

    getOrFetch: function(id) {
        var booking = this.get(id),
            bookings = this;
        function addBooking() {
            bookings.add(booking);
        }
        if (!booking) {
            booking = new CanineCareApp.Models.Booking({ id: id });
            booking.fetch({ success: addBooking });
        } else {
            booking.fetch();
        }
        return booking;
    }
});
