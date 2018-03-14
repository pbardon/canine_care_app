CanineCareApp.Views.DogsIndex = Backbone.CompositeView.extend({
  className: 'dogs',

  template: JST['dogs/index'],

  events: {
    'click .showDogProfile': 'redirectToDogShow',
    'click #newDogButton' : 'redirectToDogForm'
  },

  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render);

    var dogsList = new CanineCareApp.Views.DogsList(
        {
            collection: this.collection
        }
    );

    this.addSubview('.sitterListCard', dogsList.render());
  },

  render: function () {
    var renderedContent = this.template({
      dogs: this.collection
    });

    this.$el.html(renderedContent);

    this.attachSubviews();

    return this;
  }
});
