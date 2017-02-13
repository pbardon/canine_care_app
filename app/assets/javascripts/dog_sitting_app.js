window.CanineCareApp = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    formAuthToken: null,
    initialize: function(token) {
        new CanineCareApp.Routers.Router();
        Backbone.history.start();
        this.formAuthToken = token;
    },
    setFormAuthToken: function(token) {
        this.formAuthToken = token;
    }
};
