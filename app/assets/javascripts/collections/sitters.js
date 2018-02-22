
CanineCareApp.Collections.Sitters = Backbone.Collection.extend({
    url: 'api/sitters',

    model: CanineCareApp.Models.Sitter,

    filterByBounds: function(minX, maxX, minY, maxY) {
        collection.select(function (model){
        var lat = model.get('latitude');
        var long = model.get('longitude');
        if ( minY < lat && lat < maxY ) {
            if ( minX < long && long< maxX ) {
                return model;
            }
        }
        });
    },

    getOrFetch: function(id) {
        var sitter = this.get(id);
        var sitters = this;
        function addSitter() {
            sitters.add(sitter);
        }

        if(!sitter) {
            sitter = new CanineCareApp.Models.Sitter({ id: id });
            sitter.fetch({ success: addSitter });
        } else {
            sitter.fetch();
        }

        return sitter;
    },

    getUserSitterProfile: function(userId, successCb) {
        sitter = new CanineCareApp.Models.Sitter({ user_id: userId });
        function sitterResponse(response) {
            _.any(response.attributes, function(model) {
                if (model.user_id && model.user_id == userId) {
                    successCb(model);
                    return true;
                }
            });
        }
        sitter.fetch({ success: sitterResponse });
    }
});

CanineCareApp.Collections.sitters = new CanineCareApp.Collections.Sitters();
