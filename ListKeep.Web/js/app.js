$(function () {

    var defaultTemplate_name = 'DefaultTemplate.html';
    var listTemplate_name = 'ListTemplate.html';
    var templatesDir = '/jstemplates/';

    //
    // load templates
    //
    underloader.loadTemplates(templatesDir, [defaultTemplate_name, listTemplate_name], function () {

        ListKeepModel = Backbone.Model.extend({
            initialize: function () {
              console.log('--ListKeepModel.initialize()--');
            },
            addList: function (f) {
              console.log("ListKeepModel.addList(): " + f);
            }
        });

        var ListItemModel = Backbone.Model.extend({
            defaults: function () {
                return {
                    listTitle: "New title...",
                    listValue: ""
                }
            },
            initialize: function () {
                console.log('--ListItemModel.initialize()--');
            },
        });

        var ListCollection = Backbone.Collection.extend({
            model: ListItemModel,
            localStorage: new Backbone.LocalStorage("listItem-Backbone")
        });

        var listCollection = new ListCollection;

        DefaultView = Backbone.View.extend({
            initialize: function () {
                this.renderView();
            },
            renderView: function () {
                var templateContent = underloader.get(defaultTemplate_name);
                var variables = { addListLabel: "Add List" };
                var template = _.template($("#addListTemplate", templateContent).prevObject.html(), variables);
                this.$el.html(template);
                return this;
            },
            events: {
                "click input[type=button]": "addList_EventHandler"
            },
            addList_EventHandler: function (event) {
                // event.currentTarget
                //rfm.addFeed($("#addFeed_URL").val());
                alert('addList_EventHandler');
            }

        });

        ListView = Backbone.View.extend({
            renderView: function (id) {
                var templateContent = underloader.get(listTemplate_name);
                var variables = { listLabel: id };
                //
                // TODO: load data for ID from model
                //
                var template = _.template($("#listTemplate", templateContent).prevObject.html(), variables);
                this.$el.html(template);
                return this;
            }
        });

        var lkm = new ListKeepModel();


        var ListKeepAppRouter = Backbone.Router.extend({
            routes: {
                "list/:id": "listViewRoute",
                "add": "addRoute",
                "*actions": "defaultRoute" // matches http://listkeep.net/#anything-here
            },
            showView: function (selector, view) {
                if (this.currentView)
                    this.currentView.close();
                $(selector).html(view.render().el);
                this.currentView = view;
                return view;
            },
            listViewRoute: function (id) {
                console.log('--route:listViewRoute--' + id);
                $('#pageContent').html(new ListView().renderView(id).el);
            },
            defaultRoute: function () {
                console.log('ACTIONS: ' + actions);
                $('#pageContent').html(new DefaultView().renderView().el);
            }
        });


        // Initiate the router
        var lkar = new ListKeepAppRouter;

        // required for bookmarkable URLs
        Backbone.history.start();
    });


});