DogSittingApp.Collections.SitterComments = Backbone.Collection.extend({

    url: "api/comments",

    model: DogSittingApp.Models.Comment,

    comparator: function(item) {
        return -item.get('comment_date')
    },

    getOrFetch: function(id) {
        var comment = this.get(id);
        var comments = this;
        function addComment() {
            comments.add(comment);
        }

        if(!comment) {
            comment = new DogSittingApp.Models.Comment({ id: id });
            comment.fetch({ success: addComment });
        }else {
            comment.fetch();
        }

        return comment;
    }
});

DogSittingApp.Collections.sittercomments = new DogSittingApp.Collections.SitterComments();
