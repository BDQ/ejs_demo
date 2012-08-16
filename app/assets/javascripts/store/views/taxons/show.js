Spree.Views.Taxons.Show = Backbone.View.extend({
  events: {
    'click a[data-push-state]': Spree._navigate
  },

  initialize: function(){
    this.model.on('sync', this.render, this);
  },

  render: function () {
    this.$el.html(JST['store/templates/taxons/show']({ order: this.model }));
    return this;
  },
});
