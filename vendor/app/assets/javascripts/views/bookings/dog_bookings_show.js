CanineCareApp.Views.DogBookingShow = Backbone.CompositeView.extend({
  template: JST['bookings/dog_booking_show'],

  initialize: function(options) {
    this.listenTo(this.model, "change", this.render);


    this.sitter = CanineCareApp.Collections.sitters.getOrFetch(this.model.get('sitter_id'));

    this.listenTo(this.sitter, "sync", this.render);

  },

  events: {
    'click .thumbnail': 'showLargePhoto',
    'click .bigImage': 'closeImage'
  },



  showLargePhoto: function(event) {
    $ct = $(event.currentTarget)
    $ct.attr('src', this.sitter.get('sitter_photo_large'));
    $ct.removeClass('thumbnail');
    $ct.addClass('bigImage');

  },

  closeImage: function() {
    $image = $(event.currentTarget).find('img')
    $image.attr('src', this.sitter.get('sitter_photo_small'));
    $image.removeClass('bigImage');
    $image.addClass('thumbnail');
  },

  render: function() {
    var renderedContent = this.template({
      booking: this.model,
      sitter: this.sitter
    });

    this.$el.html(renderedContent);

    this.attachSubviews();

    return this;
  }

});
