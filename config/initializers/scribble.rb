require 'v8'
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

    def full_path
      @controller.request.fullpath
    end
  end

  class Config
    def self.source_files
      load_config
      @config['source']
    end

    def self.layout
      load_config
      @config['layout']
    end

    private
      def self.load_config
        @config ||= YAML.load_file(Rails.root.join('config/scribble.yaml'))
      end
  end

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
      helpers = Helpers.new(@controller)

      js_context = V8::Context.new(with: helpers)
      Config.source_files.each do |file|
        js_context.load(Rails.root.join file)
      end
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
var layout = JST['#{Scribble::Config.layout}'];
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
