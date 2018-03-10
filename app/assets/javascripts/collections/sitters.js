CanineCareApp.Collections.Sitters = Backbone.Collection.extend({
    url: 'api/sitters',

    model: CanineCareApp.Models.Sitter,

    perPage: 5,

    filterByBounds: function(minX, maxX, minY, maxY) {
        return this.paginate(
            this.filter(function(model) {
                var lat = model.get('latitude');
                var long = model.get('longitude');
                return (lat < maxY &&
                    long > minX &&
                    lat > minY &&
                    long < maxX);
                }));
    },

    pageNumber: 1,

    setPageNumber: function(pageNumber) {
        this.pageNumber = pageNumber;
    },

    paginate: function(collection) {
        debugger;
        return new CanineCareApp.Collections.Sitters(this.slice((this.perPage * (this.pageNumber - 1)),
            ((5 * this.pageNumber)  - 1)));
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
