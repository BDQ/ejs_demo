Spree.Models.Order = Backbone.Model.extend({
  urlRoot: '/api/orders',
  idAttribute: "number",

  initialize: function() {
    this.on('sync', this.build_associations, this);
  },

  build_associations: function() {
    this.lineItems = new Spree.Collections.LineItems(
                             this.get('line_items'));
    this.adjustments = new Spree.Collections.Adjustments(
                             this.get('adjustments'));

  },

  toJSON: function() {
    var object = { 'cid': this.cid,
                   'order': {}
                 }
    object['order']['email'] = this.get('email');
    object['order']['special_instructions'] = this.get('special_instructions');
    object['order']['line_items'] = this.lineItems.toJSON();
    return object;
  },

  item_total: function() {
    if(this.lineItems==undefined){
      return 0.0;
    }else{
      return this.lineItems.reduce(function(total, li){ return total + li.total(); }, 0.0 );
    }
  },

  adjustments_total: function() {
    if(this.adjustments==undefined){
      return 0.0;
    }else{
      return this.adjustments.reduce(function(total, adj){ return total + parseFloat(adj.get('amount')); }, 0.0 );
    }
  },

  total: function() {
    return this.item_total() + this.adjustments_total();
  },

  add_variant: function(attrs){
    if(this.lineItems==undefined){
      this.lineItems = new Spree.Collections.LineItems();
    }

    var line_item;
    line_item = this.lineItems.find(function(li){ return li.get('variant_id') == attrs['variant_id']; });

    if(line_item==undefined){
      line_item = new Spree.Models.LineItem();
      line_item.set(attrs);

      this.lineItems.add(line_item);
    }else{
      line_item.set({quantity: line_item.get('quantity') + attrs['quantity']});
    }

  },

});
