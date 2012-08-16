module Spree
  TaxonsController.class_eval do
    helper Spree::Api::ApiHelpers

    caches_page :show

    def show
      @taxon = Taxon.find_by_permalink!(params[:id])
      return unless @taxon

      @searcher = Spree::Config.searcher_class.new(params.merge(:taxon => @taxon.id))
      @products = @searcher.retrieve_products
      @products_json = render_to_string(:file => 'spree/api/v1/products/index')

      @taxonomies ||= Spree::Taxonomy.includes(:root => :children)
      @taxonomies_json = render_to_string(:file => 'spree/api/v1/taxonomies/index')

      respond_with(@taxon)
    end
  end
end
