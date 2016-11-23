CanineCareApp.Views.DogsIndex = Backbone.CompositeView.extend({
  className: 'dogs',

  template: JST['dogs/index'],

  events: {
    'click .showDogProfile': 'redirectToDogShow'
  },

  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render);
  },

  redirectToDogShow: function(event){
    data = $(event.currentTarget).data('id');
    Backbone.history.navigate('#/dogs/'+ data, {trigger: true})
  },

  render: function () {
    var renderedContent = this.template({
      dogs: this.collection
    });

    this.$el.html(renderedContent);

    return this;
  }

});
