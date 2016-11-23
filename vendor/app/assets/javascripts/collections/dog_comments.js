CanineCareApp.Collections.DogComments = Backbone.Collection.extend({

  url: "api/comments",

  model: CanineCareApp.Models.Comment,

  getOrFetch: function(id) {
    var comment = this.get(id)

    if(!comment) {
      comment = new CanineCareApp.Models.Comment({ id: id });
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


CanineCareApp.Collections.dogcomments = new CanineCareApp.Collections.DogComments();
