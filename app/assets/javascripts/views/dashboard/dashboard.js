CanineCareApp.Views.Dashboard = Backbone.View.extend({
    template: JST['dashboard/dashboard'],

    events: {
        'submit form':'submit',
        'click .errorClose': 'close',
        'click .createButton' : 'submit',
        'click .navToLogin' : 'navToLogin'
    },

    render: function() {
        var AUTH_TOKEN = $('meta[name=csrf-token]').attr('content');
        var renderedContent = this.template({token : AUTH_TOKEN });
        this.$el.html(renderedContent);
        $('#canineCareApp').removeClass();
        $('#canineCareApp').addClass("app header-fixed sidebar-fixed aside-menu-fixed aside-menu-hidden");
        $('.errorMessage').hide();
        return this;
    }
});
