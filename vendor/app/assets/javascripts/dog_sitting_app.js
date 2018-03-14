window.CanineCareApp = {

  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var router = new CanineCareApp.Routers.Router();
    Backbone.history.start({ pushState: true });
  }
};
