# This migration comes from spree (originally 20100111205525)
class CimFieldsForCreditcards < ActiveRecord::Migration
  def change
    add_column :creditcards, :gateway_customer_profile_id, :string
    add_column :creditcards, :gateway_payment_profile_id, :string
  end
end
