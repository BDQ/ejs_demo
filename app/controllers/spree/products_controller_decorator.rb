module Spree
  ProductsController.class_eval do
    helper Spree::Api::ApiHelpers

    def index
      @searcher = Config.searcher_class.new(params)
      @products = @searcher.retrieve_products

      @products_json = render_to_string(:file => 'spree/api/v1/products/index')

      respond_with(@products)
    end

    def show
      return unless @product

      @searcher = Spree::Config.searcher_class.new(params)
      @products = @searcher.retrieve_products.where(:permalink => @product.permalink)

      params[:page] = 0
      @products_json = render_to_string(:file => 'spree/api/v1/products/index')
      @product_json = render_to_string(:file => 'spree/api/v1/products/show')

      referer = request.env['HTTP_REFERER']
      if referer
        referer_path = URI.parse(request.env['HTTP_REFERER']).path
        if referer_path && referer_path.match(/\/t\/(.*)/)
          @taxon = Taxon.find_by_permalink($1)
        end
      end

      respond_with(@product)
    end

  end
end
