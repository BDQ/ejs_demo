Spree.Models.Variant = Backbone.Model.extend({
  initialize: function(){
    this.option_values = new Spree.Collections.OptionValues( this.get('option_values' ) );
  },

  options: function(){
    return this.option_values.reduce(function(txt, ov){

      var option_type = this.collection.product.option_types.find(function(ot){
        return ot.id == ov.get('option_type_id');
      });

      return txt + option_type.get('presentation') + ': ' + ov.get('presentation') + ' ';
    }, '', this);
  }

});
