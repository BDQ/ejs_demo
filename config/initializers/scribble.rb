require 'action_controller/base'
require 'action_controller/metal/responder'

module Scribble

  class Helpers
    def initialize(controller)
      @controller = controller
    end

    def get(name, *args)

      if @controller.instance_variables.include? "@#{name}".to_sym
        return @controller.instance_variable_get "@#{name}".to_sym
      end

      if @controller.view_context.methods.include? name.to_sym
        return @controller.view_context.send(name.to_sym, *args)
      end

    end
  end

  class Context
    def initialize(controller)
      @controller = controller
    end

    def load_templates
      compile = %Q{JST = {};\n}
      Dir.glob(Rails.root.join("app/assets/javascripts/store/templates/**/*.jst.ejs")) do |tpl|
          path = tpl.split(/app\/assets\/javascripts\//).last.split(/\.[.a-z]*\z/).first
          controller, action = path.split('/')[2..-1]

          compile << %Q{JST['#{path}'] = #{EJS.compile(Pathname.new(tpl).read)};\n}
      end

      compile
    end

    def js_context
      helpers = Helpers.new(@controller)

      js_context = V8::Context.new(with: helpers)
      js_context.load(Rails.root.join("vendor/assets/javascripts/underscore.js"))
      js_context.load(Rails.root.join("vendor/assets/javascripts/backbone.js"))
      js_context.load(Rails.root.join("app/assets/javascripts/store/config.js"))
      js_context.load(Rails.root.join("app/assets/javascripts/store/paginated_collection.js"))
      js_context.load(Rails.root.join("app/assets/javascripts/store/underscore_mixins.js"))
      js_context.load(Rails.root.join("app/assets/javascripts/store/models/product.js"))
      js_context.load(Rails.root.join("app/assets/javascripts/store/models/variant.js"))
      js_context.load(Rails.root.join("app/assets/javascripts/store/models/option_type.js"))
      js_context.load(Rails.root.join("app/assets/javascripts/store/models/option_value.js"))
      js_context.load(Rails.root.join("app/assets/javascripts/store/models/image.js"))
      js_context.load(Rails.root.join("app/assets/javascripts/store/models/order.js"))
      js_context.load(Rails.root.join("app/assets/javascripts/store/models/line_item.js"))
      js_context.load(Rails.root.join("app/assets/javascripts/store/models/adjustment.js"))
      js_context.load(Rails.root.join("app/assets/javascripts/store/collections/products.js"))
      js_context.load(Rails.root.join("app/assets/javascripts/store/collections/orders.js"))
      js_context.load(Rails.root.join("app/assets/javascripts/store/collections/line_items.js"))
      js_context.load(Rails.root.join("app/assets/javascripts/store/collections/adjustments.js"))
      js_context.load(Rails.root.join("app/assets/javascripts/store/collections/variants.js"))
      js_context.load(Rails.root.join("app/assets/javascripts/store/collections/option_types.js"))
      js_context.load(Rails.root.join("app/assets/javascripts/store/collections/option_values.js"))
      js_context.load(Rails.root.join("app/assets/javascripts/store/collections/images.js"))
      js_context
    end
  end

  class Responder < ActionController::Responder
    # ugly hack, should use template resolver
    # also needs to disable Spree::Responder to work
    def to_html
      options = @controller.send :_normalize_render, {}, nil
      base_path = @controller.view_paths.first
      base_path = "#{@controller.view_paths.first}/#{options[:prefixes].first}/"
      # template = Pathname.new("#{base_path}#{options[:template]}.html.scribble.erb")
      template = Pathname.new("#{base_path}#{options[:template]}.jst.ejs")

      if template.exist?
        ctx = Scribble::Context.new(@controller)

        compile = ctx.load_templates
        compile << %Q{var _view = #{EJS.compile(Pathname.new(template).read)};
var layout = JST['store/templates/layouts/spree_application'];
layout()}

        @controller.response_body =  ctx.js_context.eval(compile)
      else
        super #fallback to built rails method
      end
    end
  end
end
ActionController::Base.responder = Scribble::Responder

#HAAAACK
Kaminari.config.default_per_page = 12
