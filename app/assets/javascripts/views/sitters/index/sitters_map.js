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
                view.setMapCenter(position.coords.latitude,
                    position.coords.longitude);
                view.map.setCenter(pos);
            });
        }
    },

    setMapCenter: function(latitude, longitude) {
        var pos = new google.maps.LatLng(latitude, longitude);
        this.map.setCenter = this.map.setCenter(pos);
    },

    clearMarkers: function() {
        if (this.markers.length < 1) {
            return;
        }
        _.each(this.markers, function(marker) {
            marker.setMap(null);
        });

        this.markers = [];
    },

    placeMarkers: function(collection, repeatCount) {
        var mapView = this;
        repeatCount = repeatCount || 0;
        if (!this.mapLoaded) {
            if (repeatCount < 3) {
                setTimeout(function() {
                    mapView.placeMarkers(collection, repeatCount++);
                }, 1000);
            }
            return;
        }
        var map = this.map,
            view = this;

        this.clearMarkers();
        collection.each(function(sitter) {
            var lat = sitter.get('latitude'),
                lng = sitter.get('longitude');
            view.placeMarker(lat, lng, sitter);
        });
    },

    placeMarker: function(lat, lng, sitter) {
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
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, lng),
            icon: image,
            map: this.map,
            shape: shape,
            title: sitter.get('sitter_name')
        });

        var sitterLink = "<div><a href='#/sitters/" + sitter.get('id') + "'>" +
            marker.title + "</a><br><img width='75px' height='75px' src=" +
            sitter.get('sitter_photo_small') + "></div>";

        var infowindow = new google.maps.InfoWindow({
            content: sitterLink
        });
        this.markers.push(marker);
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map, marker);
        });
    },

    changeBounds: function(event) {
        if (!this.mapLoaded) {
            return;
        }
        var minLat, minLng, maxLat, maxLng;

        if (typeof this.map != 'undefined'){
            minLat = this.map.getBounds().getSouthWest().lat();
            minLng = this.map.getBounds().getSouthWest().lng();
            maxLat = this.map.getBounds().getNorthEast().lat();
            maxLng = this.map.getBounds().getNorthEast().lng();
        } else {
            minLat = -90;
            minLng = -180;
            maxLat = 90;
            maxLng = 180;
        }

        this.changeBoundsCb(minLat, maxLat, minLng, maxLng);
    },

    render: function () {
        var renderedContent = this.template();
        this.$el.html(renderedContent);
        this.renderMap();
        return this;
    }
});
