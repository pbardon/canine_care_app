CanineCareApp.Views.DogShow = Backbone.CompositeView.extend({


  events: {
    'click .removeDog': 'removeDog',
    'click .editDogInfo': 'redirectToDogEdit',
    'click #commentOnDog': 'addCommentForm',
    'click #addCommentButton': 'addNewComment'
  },

  initialize: function() {
    var view = this;
    this.listenTo(this.model, 'sync add', this.render);
    this.listenTo(this.model.bookings(), 'add', this.addBooking);

    this.listenTo(this.model.comments(), 'add', this.addComment);
    this.model.comments().each(this.addComment.bind(this));

    this.listenTo(this.model.comments(), 'add', this.render);


    $('.dog_bookings').empty();

  },


  template: function(options) {
    if (this.model.get('current_user_id') && this.model.get('owner_id') === this.model.get('current_user_id')) {
      return JST['dogs/show_private'](options);
    }else {
      return JST['dogs/show_public'](options);
    }
  },

  addCommentForm: function(event) {
    event.preventDefault();
    var commentForm = new CanineCareApp.Views.NewComment({
    });

    $(event.currentTarget).replaceWith('<div class="newCommentForm"></div>');

    this.addSubview('.newCommentForm', commentForm);
  },

  addNewComment: function(event) {
    var view = this;
    event.preventDefault();
    var data = $('#newCommentForm').serializeJSON();
    data['commentable_type'] = "Dog";
    data['commentable_id'] = this.model.get('id');
    var comment = new CanineCareApp.Models.Comment(data);
    CanineCareApp.Collections.dogcomments.create(comment, {
      success: function() {
        view.model.comments().add(comment);
        $(event.currentTarget).replaceWith('<button id="commentOnSitter" class="btn btn-info">Add Comment</button>');

      },
      error: function(model, error) {
        $('.alert').remove();
        _(error.responseJSON).each(function(error){
          $(event.currentTarget).prepend('<div class="alert alert-danger">'+ error +'</div>');
        });
      }
    });

  },


  addBooking: function (booking) {
    var subview = new CanineCareApp.Views.DogBookingShow({
      model: booking
    });

    this.addSubview('.dog_bookings', subview.render());
  },

  addComment: function (comment) {
    var subview = new CanineCareApp.Views.CommentShow({
      collection: this.model.comments(),
      model: comment
    });

    this.addSubview('.dogComments', subview);
  },

  redirectToDogEdit: function(event){
    data = $(event.currentTarget).data('id');
    Backbone.history.navigate('#/dogs/'+ data +'/edit', {trigger: true})
  },


  render: function() {
    var renderedContent = this.template({
      dog: this.model
    });

    this.$el.html(renderedContent);

    this.attachSubviews();

    return this;
  },

  removeDog: function(event) {

    event.preventDefault();
    this.model.destroy();

    Backbone.history.navigate("/dogs", { trigger: true })
  }
});
