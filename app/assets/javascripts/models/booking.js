CanineCareApp.Models.Booking = Backbone.Model.extend({
    urlRoot: 'api/bookings',

    dog: function() {
        this._dog = this._dog || new CanineCareApp.Models.Dog();
        return this._dog;
    },

    sitter: function() {
        this._sitter = this._sitter || new CanineCareApp.Models.Sitter();
        return this._sitter;
    },

    parse: function (jsonPayload) {
        if (jsonPayload.dog) {
            this.dog().set(jsonPayload.dog, { parse: true });
            delete jsonPayload.dog;
        }
        if (jsonPayload.sitter){
            this.sitter().set(jsonPayload.sitter, { parse: true });
            delete jsonPayload.sitter;
        }
        return jsonPayload;
  }
});
