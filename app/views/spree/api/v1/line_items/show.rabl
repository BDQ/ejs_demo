object @line_item
attributes *line_item_attributes
child :product do
  extends "spree/api/v1/products/show"
end
