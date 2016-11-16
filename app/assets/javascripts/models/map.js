DogSittingApp.Models.Map = Backbone.Model.extend({
  initialize: function(options) {
    var mapOptions = {
      center: options.center,
      zoom: options.zoom,
      style: options.style
    };

    this.map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  }
});
