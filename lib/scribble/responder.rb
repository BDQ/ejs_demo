module Scribble

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
var layout = JST['#{Scribble::Config.layout}'];
layout()}

        @controller.response_body =  ctx.js_context.eval(compile)
      else
        super #fallback to built rails method
      end
    end
  end

end
