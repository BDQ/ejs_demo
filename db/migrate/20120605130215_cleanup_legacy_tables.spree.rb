# This migration comes from spree (originally 20101026192225)
class CleanupLegacyTables < ActiveRecord::Migration
  def up
    drop_table :checkouts
    drop_table :transactions
    drop_table :open_id_authentication_associations
    drop_table :open_id_authentication_nonces
  end

  def down
  end
end
