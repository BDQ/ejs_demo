Spree.Models.Order = Backbone.Model.extend({
  urlRoot: '/api/orders',
  idAttribute: "number",

  initialize: function() {
    this.on('sync', this.build_associations, this);
    this.build_associations();
  },

  build_associations: function() {
    this.line_items = new Spree.Collections.LineItems(
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
    object['order']['line_items'] = this.line_items.toJSON();
    return object;
  },

  item_total: function() {
    if(this.line_items==undefined){
      return 0.0;
    }else{
      return (this.line_items.reduce(function(total, li){ return total + parseFloat(li.total()); }, 0.0 )).toFixed(2);
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
    return (this.item_total() + this.adjustments_total()).toFixed(2);
  },

  empty: function(){
    this.line_items.each(function(line_item){ line_item.set('quantity', 0) });
    this.save();
  },

  add_variant: function(attrs){
    if(this.line_items==undefined){
      this.line_items = new Spree.Collections.LineItems();
    }

    var line_item;
    line_item = this.line_items.find(function(li){ return li.get('variant_id') == attrs['variant_id']; });

    if(line_item==undefined){
      line_item = new Spree.Models.LineItem();
      line_item.set(attrs);
      line_item.build_associations();

      this.line_items.add(line_item);
    }else{
      line_item.set({quantity: parseInt(line_item.get('quantity')) + parseInt(attrs['quantity'])});
    }

  },

});
