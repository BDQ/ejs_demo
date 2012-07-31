module Spree
  BaseController.class_eval do
    helper_method :api_key

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
