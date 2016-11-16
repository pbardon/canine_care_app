window.DogSittingApp = {

  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var router = new DogSittingApp.Routers.Router();
    Backbone.history.start();
  }
};
