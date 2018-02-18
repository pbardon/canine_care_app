CanineCareApp.Views.NewSitterBooking = Backbone.CompositeView.extend({
    initialize: function(options) {
        this.dogs = options.dogs;
        this.listenTo(this.dogs, 'sync', this.render);
    },

    events: {
        'submit form': 'submit'
    },

    template: JST["bookings/new"],

    render: function() {
        var renderedContent = this.template({
            booking: this.model,
            dogs: this.dogs
        });

        this.$el.html(renderedContent);

        return this;
    },

    submit: function (event) {
        event.preventDefault();
        var data = $(event.currentTarget).serializeJSON();
        this.model.set(data);

        if (this.model.isNew()) {
            this.collection.create(this.model, {
                wait: true,
                success: function(model) {
                    Backbone.history.navigate("#/dogs/" + model.get('dog_id'), { trigger: true });
                },

                error: function(model, errors) {
                    $('.alert').remove();
                    $('#submitBooking').replaceWith("<input type='submit' id='submitBooking' class='btn btn-success' value='Request Booking!'>");
                    _(errors.responseJSON).each(function(error){
                        $('#newBookingForm').prepend('<div class="alert alert-danger">'+ error +'</div>');
                    });
                }
            });
        }else {
            this.model.save({}, {
                success: function() {
                    Backbone.history.navigate("#/dogs" + model.get('dog_id'), { trigger: true });
                }
            });
        }
    }
});
