CanineCareApp.Collections.DogBookings = Backbone.Bookings.extend({

    url: function() {
        return this.dog.url() + "/bookings";
    },

    model: CanineCareApp.Models.Booking
});

CanineCareApp.Collections.dogbookings = new CanineCareApp.Collections.DogBookings();
