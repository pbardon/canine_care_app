CanineCareApp.Collections.SitterComments = Backbone.Collection.extend({

  url: "api/comments",

  model: CanineCareApp.Models.Comment,

  comparator: function(item) {
    return -item.get('comment_date')
  },

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

CanineCareApp.Collections.sittercomments = new CanineCareApp.Collections.SitterComments();
