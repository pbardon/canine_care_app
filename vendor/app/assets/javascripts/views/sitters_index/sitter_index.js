DogSittingApp.Views.SitterIndex = Backbone.View.extend({

  initialize: function(options){
    this.listenTo(this.collection, 'reset', this.render);
  },


  template: JST["sitters/sitter_index"],

  render: function() {
    var renderedContent = this.template({
      sitters: this.collection
    });

    this.$el.html(renderedContent);
    return this;
  }

});
