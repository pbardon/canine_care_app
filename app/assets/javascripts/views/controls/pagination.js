CanineCareApp.Views.PaginationControls = Backbone.CompositeView.extend({
    template: JST['controls/pagination'],

    className: "paginationControls",

    initialize: function(options) {
        this.collection = options.collection;
        this.perPage = 5;
        this.originalCollection = this.collection;
        this.firstSelect = true;
        this.newPageCallback = options.cb;
        this.mapRef = options.mapRef;

        this.currentFirstPage = 1;
        this.buttonOne = this.currentFirstPage;
        this.buttonTwo = 2;
        this.buttonThree = 3;
        this.maxPages = 5;
    },

    calculateNumberOfPages: function(collection) {
        return collection.length / this.perPage;
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
        this.newPageCallback();
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
        var renderedContent = this.template();

        this.$el.html(renderedContent);

        return this;
    }
});
