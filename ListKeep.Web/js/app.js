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
            defaults: {
                listItemID: null,
                name: "",
                text: ""
            }
        });

        var ListCollection = Backbone.Collection.extend({
            model: ListItemModel
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
                        lkar.navigate("#/"+r.d, { trigger: true });
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
            },
            events: {
                "click button[id=createListItem]": "addListItem_EventHandler"
            },
            addListItem_EventHandler: function (event) {
                clog('--addListItem_EventHandler()--');

                //
                // TODO: Prompt for list item name
                //

                //
                // TODO: call model function
                //

                var p = JSON.stringify({ listID: 'temp1234', name: 'tempNAME' });
                //var p = "{'listID':'temp1234', 'name':'tempNAME'}";
                $.ajax({
                    type: "POST",
                    url: "/service/List.asmx/CreateListItem",
                    data: p,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (r) {
                        clog(r);
                        alert(r.d);
                        //lkar.navigate("list/" + r.d, { trigger: true });

                        //
                        // TODO: create ListItemModel
                        //
                        var m = ListItemModel({listItemID: r.d, name:"", text:""});
                        m.listItem = r.d;
                        m.name = "";
                        m.text = "";

                        //
                        // TODO: create new ListItemView, pass in Model
                        //
                    }
                });
            }
        });

        var lkm = new ListKeepModel();


        var ListKeepAppRouter = Backbone.Router.extend({
            routes: {
                "list/:id": "listViewRoute",
                "add": "addRoute",
                ":id": "listViewRoute",
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