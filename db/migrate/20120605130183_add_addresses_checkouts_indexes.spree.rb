# This migration comes from spree (originally 20100504142133)
class AddAddressesCheckoutsIndexes < ActiveRecord::Migration
  def change
    add_index :addresses, :firstname
    add_index :addresses, :lastname
    add_index :checkouts, :order_id
    add_index :checkouts, :bill_address_id
  end
end
