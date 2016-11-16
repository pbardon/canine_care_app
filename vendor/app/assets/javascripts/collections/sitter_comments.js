DogSittingApp.Collections.SitterComments = Backbone.Collection.extend({

  url: "api/comments",

  model: DogSittingApp.Models.Comment,

  comparator: function(item) {
    return -item.get('comment_date')
  },

  getOrFetch: function(id) {
    var comment = this.get(id)

    if(!comment) {
      comment = new DogSittingApp.Models.Comment({ id: id });
      comment.fetch({
        success: function() {
          this.add(comment)
        }.bind(this)
      });
    }else {
      comment.fetch();
    }

    return comment;
  }

});

DogSittingApp.Collections.sittercomments = new DogSittingApp.Collections.SitterComments();
