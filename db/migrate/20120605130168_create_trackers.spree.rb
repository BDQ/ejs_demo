# This migration comes from spree (originally 20100113203104)
class CreateTrackers < ActiveRecord::Migration
  def change
    create_table :trackers do |t|
      t.string :environment, :analytics_id
      t.boolean :active, :default => true

      t.timestamps
    end
  end
end
