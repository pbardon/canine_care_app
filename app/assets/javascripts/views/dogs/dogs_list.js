CanineCareApp.Views.DogsList = Backbone.CompositeView.extend({
  className: 'dogs',

  template: JST['dogs/dogs_list'],

  events: {
    'click .showDogProfile': 'redirectToDogShow',
    'click #newDogButton' : 'redirectToDogForm'
  },

  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render);
  },

  redirectToDogShow: function(event){
    data = $(event.currentTarget).data('id');
    Backbone.history.navigate('#/dogs/'+ data, {trigger: true});
  },

  redirectToDogForm: function(event){
      Backbone.history.navigate('#/dogs/new', {trigger: true});
  },

  render: function () {
    var renderedContent = this.template({
      dogs: this.collection
    });

    this.$el.html(renderedContent);

    return this;
  }
});
