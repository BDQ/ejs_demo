Spree.Models.Product = Backbone.Model.extend({
  initialize: function(){
    this.build_associations();
  },

  build_associations: function(){
    this.variants = new Spree.Collections.Variants( this.get('variants' ), {product: this} );
    this.option_types = new Spree.Collections.OptionTypes( this.get('option_types' ) );
    this.images = new Spree.Collections.Images( this.get('images' ) );
  },

  master: function(){
    var master = _.detect(this.variants.models, function(variant) { return variant.get('is_master') });
    if(master==undefined){
      master = new Spree.Admin.Models.Variant();
    }

    return master;
  }
});
