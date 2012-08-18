module Scribble
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
end
