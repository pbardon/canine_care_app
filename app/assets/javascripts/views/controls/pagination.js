CanineCareApp.Views.PaginationControls = Backbone.CompositeView.extend({
    template: JST['controls/pagination'],

    className: "paginationControls",

    initialize: function(options) {
        this.collection = options.collection;
    },

    events: {
        'click .buttonOne': 'getPage',
        'click .buttonTwo': 'getPage',
        'click .buttonThree': 'getPage'
    },

    getPage: function(event) {
        event.preventDefault();
        var pageNumber = parseInt($(event.target).html());
        this.collection.fetch({data: { page: pageNumber }});
    },

    render: function() {
        var renderedContent = this.template();

        this.$el.html(renderedContent);

        return this;
    }
});
