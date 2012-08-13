module Spree
  OrdersController.class_eval do
    helper Spree::Api::ApiHelpers

    def show
      @order = Order.find_by_number!(params[:id])
      respond_with(@order)
    end

    def edit
      @order = current_order(true)
      @order_json = render_to_string(:file => 'spree/api/v1/orders/show')
      respond_with(@order)
    end

  end
end
