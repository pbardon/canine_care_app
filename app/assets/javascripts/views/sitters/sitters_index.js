CanineCareApp.Views.SittersIndex = Backbone.CompositeView.extend({
    initialize: function(options) {
        var sitterIndexView = this;
        // this.listenTo(this.collection, 'sync', this.placeMarkers);
        // this.listenTo(this.collection, 'sync', this.populateIndex);

        this.collection.fetch({data: {page: 1}});
        this.collection.comparator = function(item) {
            return item.get('id');
        };
        this.collection.sort();
        this.paginationControls = new CanineCareApp.Views.PaginationControls({
            collection: this.collection,
            cb: function(newCollection) {
                sitterIndexView.removeSubviews('.sitterIndexList');


                //then populate..
                var sitterBanner;
                newCollection.forEach(function(model) {
                    sitterBanner = new CanineCareApp.Views.SitterBanner({ model: model });
                    sitterIndexView.addSubview('.sitterIndexList', sitterBanner.render());
                });

                sitterIndexView.sitterMap.placeMarkers(newCollection);

                sitterIndexView.render();
            }
        });

        this.sitterMap = new CanineCareApp.Views.SittersMap({
            changeBoundsCb: this.changeBounds.bind(this)
        });

        this.addSubview('.paginationControls', this.paginationControls);

        this.addSubview('.mapContainer', this.sitterMap.render());
    },

    events: {
        "click #search": 'searchResults',
        "click .moreInfo": 'showInfo',
        "click #orderByRating": "reorderByHightoLowRating",
        "click #orderByPrice": "reorderByPrice"
    },

    className: "frontPageWrapper",

    template: JST["sitters/sitter_index"],

    syncEvent: function() {
        if (typeof $('.sitterIndexList').get()[0] !== 'undefined') {
        }
    },

    // populateIndex: function() {
    //     var sitterIndex = this;
    //     //clear index..
    //     if (typeof $('.sitterIndexList').get()[0] !== 'undefined' ||
    //         (typeof this.subviews === 'function' &&
    //             this.subviews('.sitterIndexList') &&
    //             this.subviews('.sitterIndexList').length > 0)) {
    //         this.removeSubviews('.sitterIndexList');
    //     }
    //
    //     //then populate..
    //     var sitterBanner;
    //     this.collection.forEach(function(model) {
    //         sitterBanner = new CanineCareApp.Views.SitterBanner({ model: model });
    //         sitterIndex.addSubview('.sitterIndexList', sitterBanner.render());
    //     });
    //
    //     this.render();
    // },

    showInfo: function(event) {
        var $ct = $(event.currentTarget);
        var sitterId = $ct.data('id');
        Backbone.history.navigate("#/sitters/" + sitterId, {trigger: true});
    },

    changeBounds: function(event) {
        var swLat, swLng, neLat, neLng;
        var sitterIndex = this;

        this.removeSubviews('.sitterIndexList');

        if (typeof this.map != 'undefined'){
            swLat = this.map.getBounds().getSouthWest().lat();
            swLng = this.map.getBounds().getSouthWest().lng();
            neLat = this.map.getBounds().getNorthEast().lat();
            neLng = this.map.getBounds().getNorthEast().lng();
        } else {
            swLat = -90;
            swLng = -180;
            neLat = 90;
            neLng = 180;
        }

        // filter the collection ...
        var locationCollection = this.collection.filterByBounds(swLng, neLng, swLat, neLat);
        // calculate the new number of pages, refresh the pagination controls
        this.paginationControls.processNewCollection(locationCollection);

        // replace the sitters index with the correct entries
        this.removeSubviews('.sitterIndexList');
        locationCollection.forEach(function(model) {
            sitterBanner = new CanineCareApp.Views.SitterBanner({ model: model });
            sitterIndex.addSubview('.sitterIndexList', sitterBanner.render());
        });

        this.sitterMap.placeMarkers(locationCollection);

    },

    searchResults: function(event) {
        var view = this;
        event.preventDefault();

        geocoder = new google.maps.Geocoder();

        var query = $('#searchParams').val();

        geocoder.geocode( { 'address': query }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                view.map.setCenter(results[0].geometry.location);
                view.map.setZoom(12);
            } else {
                $('#searchParams').val("There was a problem with your search");
            }
        });
    },

    reorderByHightoLowRating: function() {
        this.collection.comparator = function(item) {
            return -item.get('avg_rating');
        };
        this.collection.sort();
        this.collection.trigger('reset');
    },

    reorderByPrice: function() {
        this.collection.comparator = function(item) {
            return item.get('price');
        };
        this.collection.sort();
        this.collection.trigger('reset');
    },

    render: function() {
        var renderedContent = this.template({ sitters: this.collection });

        this.$el.html(renderedContent);

        this.attachSubviews();

        return this;
    }
});
