CanineCareApp.Views.DogShow = Backbone.FormView.extend({
    events: {
        'click .removeDog': 'removeDog',
        'click .editDogInfo': 'submitDogEdit',
        'click #commentOnDog': 'addCommentForm',
        'click #addCommentButton': 'addNewComment'
    },

    initialize: function() {
        var view = this;
        this.listenTo(this.model, 'sync add', this.render);
        this.listenTo(this.model.bookings(), 'add', this.addBooking);

        this.listenTo(this.model.comments(), 'add', this.addComment);
        this.model.comments().each(this.addComment.bind(this));

        this.listenTo(this.model.comments(), 'add', this.render);

        $('.dog_bookings').empty();
    },

    handle_files: function(event, attributeName) {
        this.saveFileToAttribute(event, 'dog_photo');
    },


    template: function(options) {
        if (this.model.get('current_user_id') && this.model.get('owner_id') === this.model.get('current_user_id')) {
            return JST['dogs/show_private'](options);
        }else {
            return JST['dogs/show_public'](options);
        }
    },

    addCommentForm: function(event) {
        event.preventDefault();
        var commentForm = new CanineCareApp.Views.NewComment({});

        $(event.currentTarget).replaceWith('<div class="newCommentForm"></div>');

        this.addSubview('.newCommentForm', commentForm);
    },

    addNewComment: function(event) {
        var view = this;
        event.preventDefault();
        var data = $('#newCommentForm').serializeJSON();
        data['commentable_type'] = 'Dog';
        data['commentable_id'] = this.model.get('id');
        var comment = new CanineCareApp.Models.Comment(data);
        CanineCareApp.Collections.dogcomments.create(comment, {
            success: function() {
                view.model.comments().add(comment);
                $(event.currentTarget).replaceWith('<button id="commentOnSitter" class="btn btn-info">Add Comment</button>');

            },
            error: function(model, error) {
                $('.alert').remove();
                _(error.responseJSON).each(function(error){
                    $(event.currentTarget).prepend('<div class="alert alert-danger">'+ error +'</div>');
                });
            }
        });

    },


    addBooking: function (booking) {
        var subview = new CanineCareApp.Views.DogBookingShow({
            model: booking
        });

        this.addSubview('.dog_bookings', subview.render());
    },

    addComment: function (comment) {
        var subview = new CanineCareApp.Views.CommentShow({
            collection: this.model.comments(),
            model: comment
        });

        this.addSubview('.dogComments', subview);
    },

    getFormParameter: function(selector, fieldName) {
        return this.$el.find(selector)[0].value ||
            this.model.attributes[fieldName];
    },

    readFormData: function() {
        this.model.attributes.name = this.getFormParameter('#dogName', 'name');

        this.model.attributes.age = this.getFormParameter('#dogAge', 'age');

        this.model.attributes.description = this.getFormParameter('#dogDescription',
            'description');

        this.model.attributes.size = this.getSelectedSize();
    },

    getSelectedSize: function() {
        if (this.$el.find('#smallOption').checked) {
            return 'small';
        }

        if (this.$el.find('#mediumOption').checked) {
            return 'medium';
        }

        if (this.$el.find('#largeOption').checked ) {
            return 'large';
        }
    },

    submitDogEdit: function(event){
        this.readFormData();
        this.model.save(this.model.attributes, {
            success: function() {
                Backbone.history.navigate("#/dogs", { trigger: true });
            },

            error: function(model, error) {
                _(error.responseJSON).each(function(error){
                    $('.errors').prepend('<div class="alert alert-danger">'+ error +'</div>');
                });
            }
        });
    },


    render: function() {
        var renderedContent = this.template({
            dog: this.model
        });

        this.$el.html(renderedContent);

        this.attachSubviews();

        return this;
    },

    removeDog: function(event) {
        event.preventDefault();
        this.model.destroy();
        Backbone.history.navigate("/dogs", { trigger: true });
    }
});
