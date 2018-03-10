CanineCareApp.Views.SittersMap = Backbone.View.extend({

    template: JST['map/show'],

    initialize: function (options) {
        this.changeBoundsCb = options.changeBoundsCb;
        this.markers = [];
        this.mapLoaded = false;
    },

    renderMap: function () {
        var view = this;
        var pos = new google.maps.LatLng(37.7810560, -122.4114550);

        var mapOptions = {
            zoom: 12,
            center: pos
        };

        this.map = new google.maps.Map(this.$('#map-canvas')[0], mapOptions);

        google.maps.event.addListener(view.map, "bounds_changed",
            this.changeBounds.bind(view));

        google.maps.event.addListenerOnce(this.map, 'tilesloaded', function() {
            view.mapLoaded = true;
        });

        google.maps.event.trigger(view.map, 'resize');

        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                pos = new google.maps.LatLng(position.coords.latitude,
                    position.coords.longitude);
                view.map.setCenter(pos);
            });
        }
    },

    clearMarkers: function() {
        if (this.markers.length < 1) {
            return;
        }
        _.each(this.markers, function(marker) {
            marker.setMap(null);
        });

        this.markers = new Array();
    },

    placeMarkers: function(collection) {
        if (!this.mapLoaded) {
            return;
        }
        var map = this.map,
            view = this;
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

        this.clearMarkers();
        collection.each(function(sitter) {
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
            view.markers.push(marker);
            google.maps.event.addListener(marker, 'click', function() {
                infowindow.open(map, marker);
            });
        });
    },

    changeBounds: function(event) {
        if (!this.mapLoaded) {
            return;
        }
        var swLat, swLng, neLat, neLng;

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

        this.changeBoundsCb(swLng, neLng, swLat, neLat);
    },

    render: function () {
        var renderedContent = this.template();
        this.$el.html(renderedContent);
        this.renderMap();
        return this;
    }
});
