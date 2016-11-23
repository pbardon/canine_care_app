CanineCareApp.Models.Dog = Backbone.Model.extend({
  urlRoot: 'api/dogs',

  bookings: function() {
    this._bookings = this._bookings ||
      new CanineCareApp.Collections.DogBookings([], { dog: this });
    return this._bookings;
  },

  comments: function() {
    this._comments = this._comments ||
      new CanineCareApp.Collections.SitterComments([], { sitter: this });
    return this._comments;
  },

  parse: function (jsonPayload) {
    if (jsonPayload.bookings) {
      this.bookings().set(jsonPayload.bookings, { parse: true });
      delete jsonPayload.bookings;
    }

    if (jsonPayload.comments) {
      this.comments().set(jsonPayload.comments, { parse: true });
      delete jsonPayload.comments;
    }

    return jsonPayload;
  }
});
