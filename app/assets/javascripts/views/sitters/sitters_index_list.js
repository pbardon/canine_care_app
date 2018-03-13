CanineCareApp.Views.SittersIndexList = Backbone.CompositeView.extend({

    events: {
        "click .moreInfo": 'showInfo'
    },

    template: JST["sitters/sitters_index_list"],

    initialize: function(options) {
        var sitterIndexListView = this;
        this.listenTo(this.collection, 'sync', this.render);

        this.collection.fetch();
        this.collection.comparator = function(item) {
            return item.get('id');
        };
        this.collection.sort();

        this.paginationControls = new CanineCareApp.Views.PaginationControls({
            collection: this.collection
        });

        this.addSubview('.paginationControls', this.paginationControls);

        this.placeMarkersFn = options.placeMarkersFn.bind(this);
    },

    showInfo: function(event) {
        var $ct = $(event.currentTarget);
        var sitterId = $ct.data('id');
        Backbone.history.navigate("#/sitters/" + sitterId, {trigger: true});
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

    mapChangeBounds: function(swLng, neLng, swLat, neLat) {
        var sitterIndex = this;
        // filter the collection ...
        var locationCollection = this.collection.filterByBounds(swLng, neLng, swLat, neLat);
        // calculate the new number of pages, refresh the pagination controls
        this.paginationControls.processNewCollection(locationCollection);

        // replace the sitters index with the correct entries
        this.removeSubviews('.sitterIndexList');
        locationCollection.forEach(function(model) {
            sitterBanner = new CanineCareApp.Views.SitterBanner({ model: model });
            sitterIndex.addSubview('.sitterIndexList', sitterBanner);
        });

        this.sitterMap.placeMarkers(locationCollection);
    },

    render: function() {
        var sitterIndexList = this;
        var renderedContent = this.template({ sitters: this.collection });

        this.removeSubviews('.sitterIndexList');

        this.$el.html(renderedContent);

        var mapFilteredCollection = this.collection.filterByBounds();

        this.paginationControls.processNewCollection(mapFilteredCollection);
        mapFilteredCollection.pageNumber = this.collection.pageNumber || 1;
        this.collection.paginate(mapFilteredCollection).forEach(function(model) {
            sitterBanner = new CanineCareApp.Views.SitterBanner({ model: model });
            sitterIndexList.addSubview('.sitterIndexList', sitterBanner);
        });

        this.placeMarkersFn(mapFilteredCollection);

        if (mapFilteredCollection.length < 1) {
            this.addSubview('.sitterIndexList', new CanineCareApp.Views.NoSitterMessage());
        }

        this.attachSubviews();

        return this;
    }
});
