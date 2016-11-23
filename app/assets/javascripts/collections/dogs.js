CanineCareApp.Collections.Dogs = Backbone.Collection.extend({
    model: CanineCareApp.Models.Dog,
    url: 'api/dogs',

    getOrFetch: function(id) {
        var dog = this.get(id);
        var dogs = this;
        function addDog() {
            dogs.add(dog)
        }
        if(!dog) {
            dog = new CanineCareApp.Models.Dog({ id: id });
            dog.fetch({ success: addDog });
        } else {
            dog.fetch();
        }
        return dog;
    }
});

CanineCareApp.Collections.dogs = new CanineCareApp.Collections.Dogs();
