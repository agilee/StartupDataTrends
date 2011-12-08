(function(ST) {

  ST.Models || (ST.Models = {});
  ST.Collections || (ST.Collections = {});

  /**
   * A single representation of a startup.
   */
  ST.Models.Startup = Backbone.Model.extend({
    url : function() {
      return "https://api.angel.co/1/startups/" + this.get("id") +"?callback=?";
    }
  });

  /** 
   * A collection of startup objects
   */
  ST.Collections.Startups = Backbone.Collection.extend({
    model : ST.Models.Startup,
    url : function() {
      // TODO: rewrite this eventually to use our collected search tags
      // for now just return a canned list.
      return "https://api.angel.co/1/search?query=health&type=Startup&callback=?" 
    }
    
  });

  ST.Views.Full = Backbone.View.extend({
    template : "#panel-startup-full",

    initialize: function(attributes, options) {
      this.template = _.template($(this.template).html());
      this.el = $(this.el);
    },
    
    render : function() {
      this.el.html(this.template({ startup : this.model.toJSON() }));
      this.$("#tabs").tabs();
      return this;
    }
  });

  /** 
   * A single startup in the list of startups
   */
  ST.Views.Mini = Backbone.View.extend({
    template : "#panel-startup-list-item",
    className : "startup-list-item",
    tagName : "li",
    initialize : function(attributes, options) {
      this.template = _.template($(this.template).html());
    },
    render : function() {
      $(this.el).append(this.template({ startup : this.model.toJSON()}));
      return this;
    },
    assignHeight : function() {
      
      // this is a separate method because this needs to happen AFTER
      // the item has been appended to a parent.
      this.height = $(this.el).height();
      $(this.el).css({
        "height" : this.height,
        "display" : "block",
        "position" : "relative"
      });

      this.top = $(this.el).position().top;
    }
  });

})(ALT.module("startup"));