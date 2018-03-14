CanineCareApp.Views.SitterForm = Backbone.CompositeView.extend({
    template: JST['sitters/form'],

    className: "newSitterWrapper",

    events: {
        'submit form':'submit',
        'change #addSitterPic': 'handle_files'
    },

    render: function() {
        var renderedContent = this.template({ sitter: this.model });
        this.$el.html(renderedContent);
        return this;
    },

    handle_files: function(event) {
        var that = this;
        var file = event.currentTarget.files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
            that.model.set('sitter_photo', this.result);
        };
        reader.readAsDataURL(file);
    },

    submit: function (event) {
        event.preventDefault();
        $subbtn = $('.addSubmit');
        $subbtn.replaceWith('<div class="addSubmit" style="float: right; margin-top: 10%">' +
            '<img src="https://s3-us-west-1.amazonaws.com/pet-sitter-development/loading.gif"></div>');
        var data = $(event.currentTarget).serializeJSON();
        this.model.set(data);
        if (this.model.isNew()) {
            this.collection.create(this.model, {
                success: function() {
                    var wait = true;
                    Backbone.history.navigate('/');
                    window.location.reload();
                },

                error: function(model, errors) {
                    $('.alert').remove();
                    $('.addSubmit').replaceWith("<input type='submit' class='addSubmit btn btn-primary' value='Update Information'>");
                    _(errors.responseJSON).each(function(error) {
                        $('#newSitterForm').prepend("<div class='alert alert-danger'>"+ error + "</div>");
                    });
                }
            });
        } else {
            this.model.save({}, {
                success: function() {
                    Backbone.history.navigate("/", { trigger: true });
                },

                error: function(model, errors) {
                    $('.alert').remove();
                    $('.addSubmit').replaceWith("<input type='submit' " +
                        "class='addSubmit btn btn-primary' value='Update Information'>");
                    _(errors.responseJSON).each(function(error) {
                        $('#newSitterForm').prepend("<div class='alert alert-danger'>"+ error + "</div>");
                    });
                }
            });
        }
    }
});
