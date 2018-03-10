CanineCareApp.Collections.Sitters = Backbone.Collection.extend({
    url: 'api/sitters',

    model: CanineCareApp.Models.Sitter,

    perPage: 6,
    minLat: -90,
    maxLat: 90,
    minLng: -180,
    maxLng: 180,

    setBounds: function(minLat, maxLat, minLng, maxLng) {
        this.minLat = minLat;
        this.maxLat = maxLat;
        this.minLng = minLng;
        this.maxLng = maxLng;
    },

    filterByBounds: function() {
        var collection = this;
        var newCollection = this.paginate(
            this.filter(
                function(model) {
                    var lat = model.get('latitude');
                    var long = model.get('longitude');
                    return (lat > collection.minLat &&
                        long > collection.minLng &&
                        lat < collection.maxLat &&
                        long < collection.maxLng);
                    }));
        return newCollection;
    },

    pageNumber: 1,

    setPageNumber: function(pageNumber) {
        this.pageNumber = pageNumber;
    },

    paginate: function(collection) {
        return new CanineCareApp.Collections.Sitters(
            collection.slice((this.perPage * (this.pageNumber - 1)),
            (this.perPage * this.pageNumber)));
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
            var foundProfile = false;
            _.any(response.attributes, function(model) {
                if (model.user_id && model.user_id == userId) {
                    foundProfile = true;
                    successCb(model);
                    return true;
                }
            });

            if (!foundProfile) {
                successCb(sitter);
            }
        }
        sitter.fetch({ success: sitterResponse });
    }
});

CanineCareApp.Collections.sitters = new CanineCareApp.Collections.Sitters();
