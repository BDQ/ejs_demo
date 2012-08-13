Spree::Api::V1::OrdersController.class_eval do
  after_filter :set_order_session

  # pass access_token to authorize
  #
  def update
    authorize! :update, Spree::Order, session[:access_token]
    if @nested_params.key? :line_items_attributes
      @nested_params[:line_items_attributes].each do |line_item|
        next if line_item.key? :id
        @nested_params[:line_items_attributes].delete line_item
        variant = Spree::Variant.find(line_item[:variant_id])
        order.add_variant(variant, line_item[:quantity].to_i)
      end

    end
    if order.update_attributes(@nested_params)
      order.update!
      render :show
    else
      invalid_resource!(order)
    end
  end

  private

    # allows regular requests access to order created
    # via backbone / API
    #
    def set_order_session
      return if @order.nil?
      session[:order_id] = @order.id 
      session[:access_token] = @order.token
    end
end
