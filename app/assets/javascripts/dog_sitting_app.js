window.CanineCareApp = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    formAuthToken: null,
    mapKey: null,
    currentUser : {},
    initialize: function(token, serverMapKey, currentUserId) {
        this.formAuthToken = token;
        this.mapKey = serverMapKey;
        if (currentUserId) {
            var users = new CanineCareApp.Collections.Users();
            this.currentUser = users.getOrFetch(currentUserId);
        }
        var router = new CanineCareApp.Routers.Router();
        Backbone.history.start({ pushState: true });
    },
    setFormAuthToken: function(token) {
        this.formAuthToken = token;
    }
};
