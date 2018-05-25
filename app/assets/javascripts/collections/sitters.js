CanineCareApp.Collections.Sitters = Backbone.Collection.extend({
    url: 'api/sitters',

    model: CanineCareApp.Models.Sitter,

    perPage: 6,
    minLat: -90,
    maxLat: 90,
    minLng: -180,
    maxLng: 180,

    initialize: function(options) {
        this.pageNumber = 1;
    },

    setBounds: function(minLat, maxLat, minLng, maxLng) {
        this.minLat = minLat;
        this.maxLat = maxLat;
        this.minLng = minLng;
        this.maxLng = maxLng;
    },

    filterByBounds: function() {
        var collection = this;
        var isVisible = function(lat, lng) {
            return (lat > collection.minLat &&
                lng > collection.minLng &&
                lat < collection.maxLat &&
                lng < collection.maxLng);
        };
        return new CanineCareApp.Collections.Sitters(
            this.filter(
                function(model) {
                    return isVisible(
                        model.get('latitude'),
                        model.get('longitude'));
        }));
    },

    setPageNumber: function(pageNumber) {
        this.pageNumber = pageNumber;
    },

    paginate: function(collection) {
        return new CanineCareApp.Collections.Sitters(
            collection.slice((this.perPage * (collection.pageNumber - 1)),
            (this.perPage * collection.pageNumber)));
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
        var sitters = CanineCareApp.Collections.sitters;
        function sitterResponse(response) {
            var foundProfile = false;
            _.any(response.models, function(model) {
                if (model &&
                    model.attributes.user_id &&
                    model.attributes.user_id === parseInt(userId)) {
                    foundProfile = true;
                    successCb(model);
                    return true;
                }
            });

            if (!foundProfile) {
                // No sitter entry exists, create a new model
                successCb(new CanineCareApp.Models.Sitter());
            }
        }


        function sitterRequestError(error) {
            // There was an error retrieving the sitter model, return an empty model...
            successCb(new CanineCareApp.Models.Sitter());
        }

        sitters.fetch({ data: $.param({ user_id: userId }), success: sitterResponse, error: sitterRequestError });
    }
});

CanineCareApp.Collections.sitters = new CanineCareApp.Collections.Sitters();
