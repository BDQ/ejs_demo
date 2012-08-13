class StatusController < Spree::BaseController
  def index
    @current_order = current_order(true)
    render :json => {:order => {:number => @current_order.number, 
                                :total => @current_order.total,
                                :count => @current_order.line_items.size,
                                :token => @current_order.token} }
  end

end
