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
        var user;
        if (currentUserId) {
            user = new CanineCareApp.Models.User({ id: currentUserId });
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
        return new CanineCareApp.Routers.Router(user);
    },
    setFormAuthToken: function(token) {
        this.formAuthToken = token;
    }
};
