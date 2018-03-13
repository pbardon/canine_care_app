CanineCareApp.Views.PaginationControls = Backbone.CompositeView.extend({
    template: JST['controls/pagination'],

    className: "paginationControls",

    initialize: function(options) {
        this.collection = options.collection;
        this.perPage = this.collection.perPage;
        this.firstSelect = true;
        this.mapRef = options.mapRef;
        this.currentFirstPage = 1;
        this.buttonOne = this.currentFirstPage;
        this.buttonTwo = 2;
        this.buttonThree = 3;
        this.maxPages = 5;
    },

    calculateNumberOfPages: function(collection) {
        var newMaxPages = Math.ceil(collection.length / this.perPage);
        if (this.collection.pageNumber > newMaxPages) {
            this.collection.setPageNumber(newMaxPages);
        }
        return newMaxPages;
    },

    events: {
        'click .buttonOne': 'getPage',
        'click .buttonTwo': 'getPage',
        'click .buttonThree': 'getPage',
        'click .nextButton' : 'incrementCounter',
        'click .previousButton' : 'decrementCounter'
    },

    getPage: function(event) {
        event.preventDefault();
        var pageNumber = parseInt($(event.target).html());
        this.collection.setPageNumber(pageNumber);
        this.collection.trigger('sync');
    },

    processNewCollection: function(newCollection) {
        this.maxPages = this.calculateNumberOfPages(newCollection);
        this.render();
    },

    incrementCounter: function() {
        this.currentFirstPage++;
        this.buttonOne++;
        this.buttonTwo++;
        this.buttonThree++;
        this.render();
    },

    decrementCounter: function() {
        this.currentFirstPage--;
        this.buttonOne--;
        this.buttonTwo--;
        this.buttonThree--;
        this.render();
    },

    render: function() {
        this.$el.html(this.template());
        return this;
    }
});
