//
// http://lostechies.com/derickbailey/2011/09/15/zombies-run-managing-page-transitions-in-backbone-apps/
// http://stackoverflow.com/questions/6569704/destroy-or-remove-a-view-in-backbone-js
// http://coenraets.org/blog/2012/01/backbone-js-lessons-learned-and-improved-sample-app
//
Backbone.View.prototype.destroyView = function () {
/*
    if (this.beforeClose) {
        this.beforeClose();
    }
    this.remove();
    this.unbind();
*/
    //COMPLETELY UNBIND THE VIEW
    this.undelegateEvents();
    this.$el.removeData().unbind();
    //Remove view from DOM
    this.remove();
    Backbone.View.prototype.remove.call(this);
};
