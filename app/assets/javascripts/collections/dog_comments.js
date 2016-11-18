DogSittingApp.Collections.DogComments = Backbone.Collection.extend({

    url: "api/comments",

    model: DogSittingApp.Models.Comment,

    getOrFetch: function(id) {
        var comment = this.get(id);
        var comments = this;
        function addComment() {
            comments.add(comment);
        }
        if(!comment) {
            comment = new DogSittingApp.Models.Comment({ id: id });
            comments.fetch({
            success: addComment
            });
        }else {
            comment.fetch();
        }

        return comment;
    }

    });


DogSittingApp.Collections.dogcomments = new DogSittingApp.Collections.DogComments();
