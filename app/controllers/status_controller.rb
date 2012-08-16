class StatusController < Spree::BaseController
  helper Spree::Api::ApiHelpers

  def index
    @order = current_order(true)
  end

end
