Spree::Order.class_eval do
  accepts_nested_attributes_for :line_items, :allow_destroy => true
end
