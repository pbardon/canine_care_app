CanineCareApp.Views.SitterBookingIndex = Backbone.CompositeView.extend({

    initialize: function(options) {
        CanineCareApp.Collections.sitters.getOrFetch(this.model.id);
        this.listenTo(this.model, 'sync', this.render);
        this.listenTo(this.model.bookings(), 'add', this.addBooking);
        this.model.bookings().each(this.addBooking.bind(this));
        this.listenTo(this.model.bookings(), 'add', this.render);

    },

    template: JST['bookings/sitter_booking_index'],

    events: {
        'click .confirmBooking': "confirmBooking",
        'click .denyBooking': "denyBooking",
        'click .smallBookingDogPic': 'showLargePhoto',
        'click .bigImage': 'closeImage',
        'click #commentOnBooking': 'addCommentForm'
    },

    addBooking: function (booking) {
        var subview = new CanineCareApp.Views.SitterBookingShow({
            collection: this.model.bookings(),
            model: booking
        });

        this.addSubview('.sitter_bookings', subview.render());
    },

    render: function() {
        var renderedContent = this.template({
            bookings: this.collection
        });

        this.$el.html(renderedContent);

        this.attachSubviews();

        return this;
    }
});
