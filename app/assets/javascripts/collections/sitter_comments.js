CanineCareApp.Collections.SitterComments = Backbone.Collection.extend({

    url: "api/comments",

    model: CanineCareApp.Models.Comment,

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
            comment = new CanineCareApp.Models.Comment({ id: id });
            comment.fetch({ success: addComment });
        } else {
            comment.fetch();
        }

        return comment;
    }
});

CanineCareApp.Collections.sittercomments = new CanineCareApp.Collections.SitterComments();
