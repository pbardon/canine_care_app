DogSittingApp.Views.SittersMap = Backbone.View.extend({

  template: JST['sitters/index/map_index'],

  initialize: function () {
    this.renderMap();
  },


  renderMap: function () {
   var options = {
      center: new google.maps.LatLng(37.7533, -122.452),
      zoom: 12
    };
    this.map = App.map = new App.Models.Map(options).map;
  },


  render: function () {
    return this;
  }

});
