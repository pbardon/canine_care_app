Backbone.CompositeView = Backbone.View.extend({
    addSubview: function (selector, subview) {
        this.subviews(selector).push(subview);

        this.attachSubview(selector, subview.render());
    },

    attachSubview: function (selector, subview) {
        $(selector).append(subview.$el);
        subview.delegateEvents();

        if (subview.attachSubviews) {
            subview.attachSubviews();
        }
    },

    attachSubviews: function () {
        var view = this;
        _(this.subviews()).each(function (subviews, selector) {
          view.$(selector).empty();
          _(subviews).each(function (subview) {
            view.attachSubview(selector, subview);
          });
        });
    },

    remove: function () {
        _(this.subviews()).each(function (subviews) {
            _(subviews).each(function (subview) {
                subview.remove();
            });
        });

        Backbone.View.prototype.remove.call(this);
    },

    removeSubview: function (selector, subview) {
        if (!subview) {
            return false;
        }
        var subviews = this.subviews(selector);
        subviews.splice(subviews.indexOf(subview), 1);
        subview.remove();
        subview.undelegateEvents();
    },

    removeSubviews: function(selector) {
        var view = this;
        if (!this._subviews) {
            return;
        }
        this._subviews[selector] = this._subviews[selector] || [];
        var selectorSubviews = this._subviews[selector].slice(0);
        _(selectorSubviews).each(function(subview) {
            view.removeSubview(selector, subview);
        });
    },

    subviews: function (selector) {
        this._subviews = this._subviews || {};

        if (!selector) {
            return this._subviews;
        } else {
            this._subviews[selector] = this._subviews[selector] || [];
            return this._subviews[selector];
        }
    }
});
