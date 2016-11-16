DogSittingApp.Collections.Sitters = Backbone.Collection.extend({
  url: 'api/sitters',

  model: DogSittingApp.Models.Sitter,


  filterByBounds: function(minX, maxX, minY, maxY) {
    var models = collection.select(function (model){
      var lat = model.get('latitude')
      var long = model.get('longitude')
      if ( minY < lat && lat < maxY ) {
        if ( minX < long && long< maxX ) {
          return model;
        }
      }
    });
  },

  getOrFetch: function(id) {
    var sitter = this.get(id);

    if(!sitter) {
      sitter = new DogSittingApp.Models.Sitter({ id: id });
      sitter.fetch({
        success: function () {
          this.add(sitter);
        }.bind(this)
      });
    } else {
      sitter.fetch();
    }

    return sitter;
  }
});

DogSittingApp.Collections.sitters = new DogSittingApp.Collections.Sitters();
