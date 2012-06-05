Spree.Views.Products.Index = Backbone.View.extend({
  initialize: function() {
    this.collection.on('reset paged add remove', this.render, this);
  },

  events: {
    'click a.prev': 'previous',
    'click a.next': 'next'
  },

  previous: function() {
    this.collection.previous_page();
    return false;
  },

  next: function() {
    this.collection.next_page();
    return false;
  },

  render: function () {
    this.$el.html(JST['store/templates/products/index']({ products: this.collection }));
    return this;
  }
});
