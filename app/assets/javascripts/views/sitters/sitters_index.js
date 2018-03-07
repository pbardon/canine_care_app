CanineCareApp.Views.SittersIndex = Backbone.CompositeView.extend({
    initialize: function(options) {
        var sitterIndexView = this;
        this.listenTo(this.collection, 'sync', this.placeMarkers);
        this.listenTo(this.collection, 'sync', this.populateIndex);

        this.collection.fetch({data: {page: 1}});
        this.collection.comparator = function(item) {
            return item.get('id');
        };
        this.collection.sort();
        var paginationControls = new CanineCareApp.Views.PaginationControls({
            collection: this.collection,
            cb: function(newCollection) {
                sitterIndexView.removeSubviews('.sitterIndexList');

                //then populate..
                var sitterBanner;
                newCollection.forEach(function(model) {
                    sitterBanner = new CanineCareApp.Views.SitterBanner({ model: model });
                    sitterIndexView.addSubview('.sitterIndexList', sitterBanner.render());
                });

                sitterIndexView.render();
            }
        });

        this.addSubview('.paginationControls', paginationControls);
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

    populateIndex: function() {
        var sitterIndex = this;
        //clear index..
        if (typeof $('.sitterIndexList').get()[0] !== 'undefined' ||
            (typeof this.subviews === 'function' &&
                this.subviews('.sitterIndexList') &&
                this.subviews('.sitterIndexList').length > 0)) {
            this.removeSubviews('.sitterIndexList');
        }

        //then populate..
        var sitterBanner;
        this.collection.forEach(function(model) {
            sitterBanner = new CanineCareApp.Views.SitterBanner({ model: model });
            sitterIndex.addSubview('.sitterIndexList', sitterBanner.render());
        });

        this.render();
    },

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
        this.collection.filterByBounds(swLng, neLng, swLat, neLat).forEach(function(model) {
            sitterBanner = new CanineCareApp.Views.SitterBanner({ model: model });
            sitterIndex.addSubview('.sitterIndexList', sitterBanner.render());
        });

    },

    placeMarkers: function() {
        var map = this.map;

        var image = {
            url: 'https://s3-us-west-1.amazonaws.com/pet-sitter-development/paw_icon3.png',
            size: new google.maps.Size(20, 20),
            origin: new google.maps.Point(0,0),
            anchor: new google.maps.Point(0, 20)
        };

        var shape = {
            coords: [1,1,1,20,20,20,20,1],
            type: 'poly'
        };

        this.collection.each(function(sitter) {
            var lat = sitter.get('latitude'),
                lng = sitter.get('longitude');
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(lat, lng),
                icon: image,
                map: map,
                shape: shape,
                title: sitter.get('sitter_name')
            });

            var sitterLink = "<div><a href='#/sitters/" + sitter.get('id') + "'>" +
                marker.title + "</a><br><img width='75px' height='75px' src=" +
                sitter.get('sitter_photo_small') + "></div>";

            var infowindow = new google.maps.InfoWindow({
                content: sitterLink
            });

            google.maps.event.addListener(marker, 'click', function() {
                infowindow.open(map, marker);
            });
        });
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

    renderMap: function () {
        var view = this;
        var pos = new google.maps.LatLng(37.7810560, -122.4114550);

        var mapOptions = {
            zoom: 12,
            center: pos
        };

        this.map = new google.maps.Map(this.$('#map-canvas')[0], mapOptions);
        google.maps.event.addListener(view.map,
            "bounds_changed",
            view.changeBounds.bind(view));
        google.maps.event.trigger(view.map, 'resize');
        this.placeMarkers();

        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                view.map.setCenter(pos);
            });
        }
    },

    render: function() {
        var renderedContent = this.template({ sitters: this.collection });

        this.$el.html(renderedContent);

        this.renderMap();

        this.attachSubviews();

        return this;
    }
});
