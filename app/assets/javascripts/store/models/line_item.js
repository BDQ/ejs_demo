Spree.Models.LineItem = Backbone.Model.extend({
  initialize: function(){
    this.build_associations();
  },

  build_associations: function() {
    this.product = new Spree.Models.Product(this.get('product'));
  },

  toJSON: function() {

    if(this.get('quantity')<=0){
      var object = {
        id: this.get('id'),
        _destroy: 1
      };
    }else{
      var object = {
        id: this.get('id'),
        variant_id: this.get('variant_id'),
        quantity: this.get('quantity')
      };
    }
    return object;
  },

  total: function() {
    return (parseInt(this.get('quantity')) * parseFloat(this.get('price'))).toFixed(2);
  }
});
