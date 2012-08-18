module Scribble

  class Context
    def initialize(controller)
      @controller = controller
    end

    def load_templates
      compile = %Q{JST = {};\n}
      Dir.glob(Rails.root.join("app/assets/javascripts/**/*.jst.ejs")) do |tpl|
          path = tpl.split(/app\/assets\/javascripts\//).last.split(/\.[.a-z]*\z/).first
          controller, action = path.split('/')[2..-1]

          compile << %Q{JST['#{path}'] = #{EJS.compile(Pathname.new(tpl).read)};\n}
      end

      compile
    end

    def js_context
      helpers = ::Scribble::Helpers.new(@controller)

      js_context = V8::Context.new(with: helpers)
      Config.source_files.each do |file|
        js_context.load(Rails.root.join file)
      end
      js_context
    end
  end

end
