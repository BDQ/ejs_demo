module Spree
  HomeController.class_eval do
    helper Spree::Api::ApiHelpers

    def index
      @searcher = Spree::Config.searcher_class.new(params)
      @products = @searcher.retrieve_products

      @products_json = render_to_string(:file => 'spree/api/v1/products/index')

      respond_with @products
    end

  end

end
