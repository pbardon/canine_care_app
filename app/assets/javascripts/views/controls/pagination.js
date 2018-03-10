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
    },

    calculateNumberOfPages: function(collection) {
        return collection.length / this.perPage;
    },

    events: {
        'click .buttonOne': 'getPage',
        'click .buttonTwo': 'getPage',
        'click .buttonThree': 'getPage',
        'click .nextButton' : 'incrementCounter'
    },

    getPage: function(event) {
        event.preventDefault();
        var pageNumber = parseInt($(event.target).html());
        this.collection.setPageNumber(pageNumber);
        this.newPageCallback();
    },

    processNewCollection: function(newCollection) {
        this.maxPages = this.calculateNumberOfPages(newCollection);
        if (this.currentPage > this.maxPages) {
            this.currentPage = 1;
            this.resetCounter();
        }
    },

    incrementCounter: function() {
        this.incrementHtmlValue(this.$el.find('.buttonOne'));
        this.incrementHtmlValue(this.$el.find('.buttonTwo'));
        this.incrementHtmlValue(this.$el.find('.buttonThree'));
    },

    incrementHtmlValue: function(element) {

    },

    render: function() {
        var renderedContent = this.template();

        this.$el.html(renderedContent);

        return this;
    }
});
