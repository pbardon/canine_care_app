window.CanineCareApp = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    initialize: function() {
        new CanineCareApp.Routers.Router();
        Backbone.history.start();
    }
};
