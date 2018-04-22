CanineCareApp.Models.User = Backbone.Model.extend({
    urlRoot: '/users',
    isSitter: false,

    checkSitterStatus: function() {
        var user = this;
        CanineCareApp.Collections.sitters
        .getUserSitterProfile(this.id,
            function(response) {
                if (response.model.attributes.id) {
                    user.isSitter = true;
                }
        });
    }
});
