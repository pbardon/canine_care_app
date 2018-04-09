CanineCareApp.Collections.Users = Backbone.Collection.extend({
    url: '/users',

    model: CanineCareApp.Models.User,

    getOrFetch: function(id) {
        var user = this.get(id);
        var userModel = this;
        if(!user) {
            user = new CanineCareApp.Models.User();
            this.fetch({
                id: id
            });
        } else {
            user.fetch();
        }

        return user;
    }
});
