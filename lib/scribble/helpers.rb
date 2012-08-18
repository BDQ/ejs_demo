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

end
