CanineCareApp.Views.NewComment = Backbone.View.extend({

  initialize: function(options) {

  },

  events: {
    'click .bookNow': 'redirectToBooking',
    'submit form' : 'addComment'
  },

  template: JST['comments/new'],

  render: function () {
    var renderedContent = this.template({
      booking: this.model
    });

    this.$el.html(renderedContent);

    return this;
  },

  addNewComment: function(event) {
    event.preventDefault();
    var data = $(event.currentTarget).serializeJSON();
    data['commentable_type'] = "Sitter";
    data['commentable_id'] = this.model.get('dog_id');
    var comment = new CanineCareApp.Models.Comment(data);
    this.collection.create(comment, {
      success: function() {
        $(event.currentTarget).remove();

      },
      error: function(model, error) {
        $('.alert').remove();
        _(error.responseJSON).each(function(error){

          $('#newCommentForm').addClass('.has-error')
          $(event.currentTarget).prepend('<div class="alert alert-danger">'+ error +'</div>');
        });
      }
    });

  }





});
