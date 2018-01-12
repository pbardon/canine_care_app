window.CanineCareApp = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    formAuthToken: null,
    mapKey: null,
    initialize: function(token, serverMapKey) {
        this.formAuthToken = token;
        this.mapKey = serverMapKey;
        new CanineCareApp.Routers.Router();
        Backbone.history.start({pushState: true});
    },
    setFormAuthToken: function(token) {
        this.formAuthToken = token;
    }
};
