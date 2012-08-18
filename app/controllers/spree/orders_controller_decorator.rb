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

      @taxonomies ||= Spree::Taxonomy.includes(:root => :children)
      @taxonomies_json = render_to_string(:file => 'spree/api/v1/taxonomies/index')

      respond_with(@order)
    end

  end
end
