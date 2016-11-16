DogSittingApp.Collections.DogComments = Backbone.Collection.extend({

  url: "api/comments",

  model: DogSittingApp.Models.Comment,

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


DogSittingApp.Collections.dogcomments = new DogSittingApp.Collections.DogComments();
