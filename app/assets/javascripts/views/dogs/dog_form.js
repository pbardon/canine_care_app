CanineCareApp.Views.DogForm = Backbone.FormView.extend({
    template: JST['dogs/dog_form'],

    className: "dogFormWrapper",

    initialize: function(options) {

    },

    events: {
        'submit form' : 'submit',
        'change #addPic': 'encodeFile'
    },

    render: function() {
        var renderedContent = this.template({ dog: this.model });

        this.$el.html(renderedContent);

        return this;
    },

    encodeFile: function (event) {
        var file = event.currentTarget.files[0];
        var reader = new FileReader();
        reader.onload = function (fileEvent) {
          this.model.set({
            photo_attributes: { photo_name: "foo", photo_contents: fileEvent.target.result }
          });
        }.bind(this)
        reader.onerror = function () {
          console.log("error", arguments)
        }
        reader.readAsDataURL(file);
    },

    submit: function (event) {
        event.preventDefault();
        $('.addSubmit').replaceWith('<img class="addSubmit" src="https://s3-us-west-1.amazonaws.com/pet-sitter-development/loading.gif">');
        var data = $(event.currentTarget).serializeJSON();
        this.model.set(data);
        if (this.model.isNew()) {
            this.collection.create({dog: this.model.attributes}, {
                success: function() {
                    Backbone.history.navigate("#/dogs", { trigger: true });
                },
                error: function(model, error) {
                    $('.alert').remove();
                    $('.addSubmit').replaceWith("<button type='submit' class='addSubmit btn btn-primary'>Add Dog</button>");
                    _(error.responseJSON).each(function(error){
                        $('.errors').prepend('<div class="alert alert-danger">'+ error +'</div>');
                    });
                }
            });
        } else {
            this.model.save({}, {
                success: function() {
                    Backbone.history.navigate("#/dogs", { trigger: true });
                },

                error: function(model, error) {
                    $('.alert').remove();
                    $('.addSubmit').replaceWith(
                        "<button type='submit' class='addSubmit btn btn-primary'>Add Dog</button>");
                    _(error.responseJSON).each(function(error){
                        $('#newDogForm').prepend('<div class="alert alert-danger">'+ error +'</div>');
                    });
                }
            });
        }
    }
});
