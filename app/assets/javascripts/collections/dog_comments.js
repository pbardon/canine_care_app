CanineCareApp.Collections.DogComments = Backbone.Collection.extend({

    url: "api/comments",

    model: CanineCareApp.Models.Comment,

    getOrFetch: function(id) {
        var comment = this.get(id);
        var comments = this;
        function addComment() {
            comments.add(comment);
        }
        if(!comment) {
            comment = new CanineCareApp.Models.Comment({ id: id });
            comments.fetch({ success: addComment });
        }else {
            comment.fetch();
        }

        return comment;
    }
    });
CanineCareApp.Collections.dogcomments = new CanineCareApp.Collections.DogComments();
