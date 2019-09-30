Backbone.FormView = Backbone.CompositeView.extend({
    saveFileToAttribute: function(event, attributeName) {
        var form = this;
        var file = event.currentTarget.files[0];
        var reader = new FileReader();
        var loadFunction = function (fileEvent) {
            form.model.set(attributeName, { photo_contents: fileEvent.target.result });
        };

        reader.onload = loadFunction;
        reader.onerror = function () {
          console.log("error", arguments)
        }
        reader.readAsDataURL(file);
    }
});
