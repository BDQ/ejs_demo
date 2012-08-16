module Spree
  OrdersController.class_eval do
    helper Spree::Api::ApiHelpers

    #need to use respond_with so Scribble Responder can work.

    def show
      @order = Order.find_by_number!(params[:id])
      respond_with(@order)
    end

    def edit
      @order = current_order(true)
      respond_with(@order)
    end

  end
end
