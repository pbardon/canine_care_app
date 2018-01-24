window.CanineCareApp = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    formAuthToken: null,
    mapKey: null,
    cachedSessionToken: '',
    currentUser : {},
    loggedIn : false,
    initialize: function(token, serverMapKey, currentUserId, sessionToken) {
        var app = this;
        this.formAuthToken = token;
        this.mapKey = serverMapKey;
        if (currentUserId) {
            var user = new CanineCareApp.Models.User({ id: currentUserId });
            user.fetch({
                success: function() {
                    app.currentUser = user;
                    if (sessionToken &&
                        sessionToken === user.attributes.session_token) {
                        app.loggedIn = true;
                    } else {
                        app.loggedIn = false;
                    }
                }
            });
        }
        var router = new CanineCareApp.Routers.Router();
        Backbone.history.start({ pushState: true });
    },
    setFormAuthToken: function(token) {
        this.formAuthToken = token;
    }
};
