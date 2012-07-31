module Spree
  ProductsController.class_eval do
    helper Spree::Api::ApiHelpers

    def show
      return unless @product

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
