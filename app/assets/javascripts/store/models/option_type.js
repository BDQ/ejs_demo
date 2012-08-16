Spree.Models.OptionType = Backbone.Model.extend({
  initialize: function(){
    this.option_values = new Spree.Collections.OptionValues( this.get('option_values' ) );
  },

  urlRoot: '/api/option_types'

});
