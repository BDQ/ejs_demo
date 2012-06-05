# This migration comes from spree_promo (originally 20110331094351)
class PromotionChangesToSubclassOfActivator < ActiveRecord::Migration
  def up
    drop_table :promotions
    rename_column :promotion_rules, :promotion_id, :activator_id
  end

  def down
    create_table :promotions, :force => true do |t|
      t.string   :name
      t.string   :code
      t.string   :description
      t.integer  :usage_limit
      t.boolean  :combine
      t.datetime :expires_at
      t.datetime :starts_at
      t.string   :match_policy, :default => 'all'

      t.timestamps
    end
    rename_column :promotion_rules, :activator_id, :promotion_id
  end
end
