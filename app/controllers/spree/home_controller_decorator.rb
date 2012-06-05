require 'v8'
module Spree
  HomeController.class_eval do 
    helper Spree::Api::ApiHelpers
    helper_method :api_key

    def index
      @products = Product.where(:deleted_at => nil).page(1)
      @products_json = render_to_string(:file => 'spree/api/v1/products/index')

#       cxt = V8::Context.new
#       cxt.load(Rails.root.join("vendor/assets/javascripts/underscore.js"))
#       cxt.load(Rails.root.join("vendor/assets/javascripts/backbone.js"))
#       cxt.load(Rails.root.join("app/assets/javascripts/store/config.js"))
#       cxt.load(Rails.root.join("app/assets/javascripts/store/paginated_collection.js"))
#       cxt.load(Rails.root.join("app/assets/javascripts/store/underscore_mixins.js"))
#       cxt.load(Rails.root.join("app/assets/javascripts/store/models/product.js"))
#       cxt.load(Rails.root.join("app/assets/javascripts/store/models/variant.js"))
#       cxt.load(Rails.root.join("app/assets/javascripts/store/models/image.js"))
#       cxt.load(Rails.root.join("app/assets/javascripts/store/collections/products.js"))
#       cxt.load(Rails.root.join("app/assets/javascripts/store/collections/variants.js"))
#       cxt.load(Rails.root.join("app/assets/javascripts/store/collections/images.js"))

#       product_index = EJS.compile(Rails.root.join("app/assets/javascripts/store/templates/products/index.jst.ejs").read)
#       compile = %Q{
# Spree.Views.Products.Index = #{product_index}

# Spree.api_key = '#{ api_key }';
# Spree.internal_subdomain = '#{ ENV['INTERNAL_SUBDOMAIN'] }';
# Spree.preload.products = #{ @products_json };

# Spree.init();
#       }

      # render :text => cxt.eval(compile)
      respond_to :html
    end

    private

      def api_key
        admins = Spree::Role.where(:name => 'admin').first.users

        if api_admin = admins.detect(&:api_key)
          api_admin.api_key
        else
          admins.first.generate_api_key!
        end
      end
  end

end
