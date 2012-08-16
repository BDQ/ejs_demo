child @order do
  attribute :token
  extends "spree/api/v1/orders/show"
end

node :user do
  attributes :id => current_user.try(:id)
end

