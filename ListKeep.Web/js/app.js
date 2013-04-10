function clog(msg, err) {
    window.console && console.log && console.log(err?'--ERROR--'+msg+' : '+err:'--DEBUG--'+msg);
}

$(function () {

    var defaultTemplate_name = 'DefaultTemplate.html';
    var listTemplate_name = 'ListTemplate.html';
    var listSideTemplate_name = 'ListSideTemplate.html';
    var templatesDir = '/jstemplates/';

    //
    // load templates
    //
    underloader.loadTemplates(templatesDir, [defaultTemplate_name, listTemplate_name, listSideTemplate_name], function () {

        ListKeepModel = Backbone.Model.extend({
            initialize: function () {
                clog('ListKeepModel.initialize()');
            },
            addList: function (f) {
                clog("ListKeepModel.addList(): " + f);
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
                clog('--ListItemModel.initialize()--');
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
                "click button[id=addListButton]": "addList_EventHandler"
            },
            addList_EventHandler: function (event) {
                // event.currentTarget
                //rfm.addFeed($("#addFeed_URL").val());
                //alert('addList_EventHandler');
                clog('--addList_EventHandler()--');

                var params = "{'name':'test', 'email':'me@me.com'}";
                $.ajax({
                    type: "POST",
                    url: "/service/List.asmx/CreateList",
                    data: params,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (r) {
                        clog(r);
                        lkar.navigate("list/"+r.d, { trigger: true });
                    }
                });

            }

        });
        function displayArticleList(a) {
            if (a !== undefined && a.d !== undefined) {
                clearTable();
                $.each(a.d, function () {
                });
            }
            $('div#output').append('------- displayArticleList()<br/>');
        }

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

        ListSideView = Backbone.View.extend({
            renderView: function (id) {
                var templateContent = underloader.get(listSideTemplate_name);
                var variables = { listLabel: id };
                //
                // TODO: load data for ID from model
                //
                var template = _.template($("#listSideTemplate", templateContent).prevObject.html(), variables);
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
                clog('--route:listViewRoute--' + id);
                $('#pageContent').html(new ListView().renderView(id).el);
                $('#sidebarContent').html(new ListSideView().renderView(id).el);
            },
            defaultRoute: function (actions) {
                clog('ACTIONS: ' + actions);
                $('#pageContent').html(new DefaultView().renderView().el);
            }
        });


        // Initiate the router
        var lkar = new ListKeepAppRouter;

        // required for bookmarkable URLs
        Backbone.history.start();
    });


});