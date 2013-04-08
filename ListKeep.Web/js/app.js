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
            initialize: function () {
                this.renderView();
            },
            renderView: function () {
                var templateContent = underloader.get(listTemplate_name);
                var variables = { listLabel: "--LIST--TITLE--" };
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
            }
        });


        // Initiate the router
        var lkar = new ListKeepAppRouter;

        lkar.on('route:defaultRoute', function (actions) {
            console.log('ACTIONS: ' + actions);
            $('#pageContent').html(new DefaultView().renderView().el);
        });

        lkar.on('route:listViewRoute', function (id) {
            console.log('--route:listViewRoute--');
            $('#pageContent').html(new ListView().renderView().el);
        });

        // required for bookmarkable URLs
        Backbone.history.start();
    });













});