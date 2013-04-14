function clog(msg, err) {
    window.console && console.log && console.log(err?'--ERROR--'+msg+' : '+err:msg);
}

$(function () {

    var defaultTemplate_name = 'DefaultTemplate.html';
    var listTemplate_name = 'ListTemplate.html';
    var listSideTemplate_name = 'ListSideTemplate.html';
    var listItemLinkTemplate_name = 'ListItemLinkTemplate.html';
    var templatesDir = '/jstemplates/';
    var cType = "application/json; charset=utf-8";

    //
    // load templates
    //
    underloader.loadTemplates(templatesDir, [defaultTemplate_name, listTemplate_name, listSideTemplate_name, listItemLinkTemplate_name], function () {

        ListKeepModel = Backbone.Model.extend({
            initialize: function () {
            },
            addList: function (f) {
            }
        });

        var ListEntityModel = Backbone.Model.extend({
            defaults: {
                listItemID: null,
                name: "",
                text: ""
            }
        });

        var ListItemEntityModel = Backbone.Model.extend({
            defaults: {
                listItemClass: "",
                listItemLink: "",
                listItemTitle: ""
            }
        });

        var ListItemEntityCollection = Backbone.Collection.extend({
            model: ListItemEntityModel
        });

        var listCollection = new ListItemEntityCollection;

        var DefaultView = Backbone.View.extend({
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
                $.ajax({
                    type: "POST",
                    url: "/service/List.asmx/CreateList",
                    data: JSON.stringify({ listName: $('#listNameTextbox').val(), listOwnerEmail: $('#emailTextbox').val() }),
                    contentType: cType,
                    dataType: "json",
                    success: function (r) {
                        app.navigate("#/"+r.d, { trigger: true });
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        clog(jqXHR);
                        clog(textStatus, errorThrown);
                    }
                });
            }

        });

        var ListView = Backbone.View.extend({
            renderView: function (listName) {
                var templateContent = underloader.get(listTemplate_name);
                var variables = { listLabel: listName };
                var template = _.template($("#listTemplate", templateContent).prevObject.html(), variables);
                this.$el.html(template);
                return this;
            }
        });

        var ListSideView = Backbone.View.extend({
            renderView: function (id) {
                //
                // TODO: load data for ID from model
                //
                var templateContent = underloader.get(listSideTemplate_name);
                var variables = { listLabel: id };
                var template = _.template($("#listSideTemplate", templateContent).prevObject.html(), variables);
                this.$el.html(template);
                return this;
            },
            events: {
                "click button[id=createListItem]": "addListItem_EventHandler"
            },
            addListItem_EventHandler: function (event) {

                //
                // TODO: Prompt for list item name
                //

                //
                // TODO: call model function
                //

                $.ajax({
                    type: "POST",
                    url: "/service/List.asmx/CreateListItem",
                    data: JSON.stringify({ listID: 'temp1234', name: 'tempNAME' }),
                    contentType: cType,
                    dataType: "json",
                    success: function (r) {
                        clog(r);
                        //app.navigate("list/" + r.d, { trigger: true });

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
                if (this.currentView) {
                    this.currentView.close();
                }
                $(selector).html(view.render().el);
                this.currentView = view;
                return view;
            },
            listViewRoute: function (id) {
                $.ajax({
                    type: "POST",
                    url: "/service/List.asmx/GetListName",
                    data: JSON.stringify({ listID: id }),
                    contentType: cType,
                    dataType: "json",
                    success: function (r) {
                        $('#pageContent').html(new ListView().renderView(r.d).el);
                        $('#sidebarContent').html(new ListSideView().renderView(id).el);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        clog(jqXHR);
                        clog(textStatus, errorThrown);
                    }
                });
            },
            defaultRoute: function (actions) {
                $('#pageContent').html(new DefaultView().renderView().el);
            }
        });


        // Initiate the router
        var app = new ListKeepAppRouter;

        // required for bookmarkable URLs
        Backbone.history.start();
    });


});