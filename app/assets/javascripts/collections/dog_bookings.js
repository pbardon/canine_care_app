CanineCareApp.Collections.DogBookings = CanineCareApp.Collections.Bookings.extend({

    url: function() {
        return this.dog.url() + "/bookings";
    },

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

CanineCareApp.Collections.dogbookings = new CanineCareApp.Collections.DogBookings();
