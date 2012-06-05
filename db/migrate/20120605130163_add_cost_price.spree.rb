# This migration comes from spree (originally 20100105090147)
class AddCostPrice < ActiveRecord::Migration
  def change
    add_column :variants, :cost_price, :decimal, :null => true, :default => nil, :precision => 8, :scale => 2
  end
end
