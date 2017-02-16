CanineCareApp.Views.SitterBookingShow = Backbone.CompositeView.extend({

    initialize: function(options) {
        this.listenTo(this.model, "sync", this.render);
        this.listenTo(this.model, "change:confirmed", this.render);
        this.dog = CanineCareApp.Collections.dogs.getOrFetch(this.model.get('dog_id'));
        this.listenTo(this.dog, 'sync', this.render);
    },

    template: JST['bookings/sitter_booking_show'],

    events: {
        'click .confirmBooking': "confirmBooking",
        'click .denyBooking': "denyBooking",
        'click .smallBookingDogPic': 'showLargePhoto',
        'click .bigImage': 'closeImage',
        'click #commentOnBooking': 'addCommentForm'
    },

    showLargePhoto: function(event) {
        $ct = $(event.currentTarget);
        $ct.attr('src', this.dog.get('dog_photo_large'));
        $ct.removeClass('smallBookingDogPic');
        $ct.addClass('bigImage');

    },

    closeImage: function() {
        $image = $($(event.currentTarget).find('img')[1]);
        $image.attr('src', this.dog.get('dog_photo_small'));
        $image.removeClass('bigImage');
        $image.addClass('smallBookingDogPic');
    },

    confirmBooking: function() {
        var view = this;
        $.ajax({
            url: 'api/bookings/' + this.model.id,
            type: "PUT",
            data: {
                booking: { confirmed: 'true' }
            }, success: function(data) {
                var confirmation = $('.confirmDiv');
                var denyContainer = $('.denyDiv');
                var data_id = confirmation.data('id');
                confirmation.remove();
                denyContainer.remove();
                $($(".sitterBooking[data-id='" + data_id +"']").find('.bookingConfirmation'))
                        .replaceWith("<span style='color:#3EFF1F; font-size: 24px;''>Booking Confirmed</span>");
            }, errors: function(jq, status, message) {
                $('.sitterBooking').prepend("<div class='alert alert-warning'>"+ message + "</div>")
            }
        });
    },

    denyBooking: function() {
        var view = this;
        $.ajax({
            url: 'api/bookings/' + this.model.id,
            type: "PUT",
            data: {
                booking: { confirmed: 'false' , completed: 'true'}
            }, success: function(data) {
                var data_id = $('.denyDiv').data('id');
                $('.confirmDiv').remove();
                $('.denyDiv').remove();
                $($(".sitterBooking[data-id='" + data_id +"']").find('.bookingConfirmation'))
                    .replaceWith("<span style='color:red; font-size: 24px;''>Booking Denied</span>");
            }
        });
    },

    render: function() {
        var renderedContent = this.template({
            booking: this.model,
            dog: this.dog
        });

        this.$el.html(renderedContent);

        this.attachSubviews();

        return this;
    }
});
