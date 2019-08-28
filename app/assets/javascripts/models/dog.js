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
    },

    // sync: function(method, model, options){

    //     // Post data as FormData object on create to allow file upload
    //     if(method == 'create'){
    //       var dog = model.attributes
    //       // var outputFormData = new FormData();
    //       // outputFormData.append('dog', formData)
    
    //       // Set processData and contentType to false so data is sent as FormData
    //       _.defaults(options || (options = {}), {
    //         data: {dog: dog},
    //         processData: false,
    //         contentType: false
    //       });
    //     }
    //     return Backbone.sync.call(this, method, model, options);
    //   }
});
