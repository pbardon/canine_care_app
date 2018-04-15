CanineCareApp.Collections.DogBookings = CanineCareApp.Collections.Bookings.extend({

    url: function() {
        return this.dog.url() + "/bookings";
    },

    model: CanineCareApp.Models.Booking
});

CanineCareApp.Collections.dogbookings = new CanineCareApp.Collections.DogBookings();
