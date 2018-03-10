CanineCareApp.Views.SittersIndex = Backbone.CompositeView.extend({
    initialize: function(options) {
        var sitterIndexView = this;
        // this.listenTo(this.collection, 'sync', this.copyCollection);
        // this.listenTo(this.collection, 'sync', this.populateIndex);

        var changeBoundsFunction = function(minLat, maxLat, minLng, maxLng) {
            sitterIndexView.collection.setBounds(minLat, maxLat, minLng, maxLng);
            sitterIndexView.collection.trigger('sync');
        };


        this.sitterMap = new CanineCareApp.Views.SittersMap({
            changeBoundsCb: changeBoundsFunction.bind(sitterIndexView)
        });

        this.sittersIndexList = new CanineCareApp.Views.SittersIndexList({
            collection: this.collection,
            placeMarkersFn: function(collection) {
                sitterIndexView.sitterMap.placeMarkers(collection);
            }
        });

        this.addSubview('.sitterIndexListContainer', this.sittersIndexList.render());

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


    render: function() {
        var renderedContent = this.template({ sitters: this.collection });

        this.$el.html(renderedContent);

        this.attachSubviews();

        return this;
    }
});
