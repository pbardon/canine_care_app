Backbone.FormView = Backbone.CompositeView.extend({
    saveFileToAttribute: function(event, attributeName) {
        var that = this;
        var file = event.currentTarget.files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
            that.model.set(attributeName, this.result);
        };
        reader.readAsDataURL(file);
    },
});
