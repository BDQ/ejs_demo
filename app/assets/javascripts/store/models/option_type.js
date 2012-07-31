Spree.Models.OptionType = Backbone.Model.extend({
  initialize: function(){
    this.option_values = new Spree.Collections.OptionValues( this.get('option_values' ) );
  },

  url : function() {
    var base = '/api/option_types';
    if (this.isNew()) return base;
    return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + this.id;
  }

});
