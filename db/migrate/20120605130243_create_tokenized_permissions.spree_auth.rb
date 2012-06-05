# This migration comes from spree_auth (originally 20101217012656)
class CreateTokenizedPermissions < ActiveRecord::Migration
  def change
    create_table :tokenized_permissions do |t|
      t.integer :permissable_id
      t.string  :permissable_type
      t.string  :token

      t.timestamps
    end

    add_index :tokenized_permissions, [:permissable_id, :permissable_type], :name => 'index_tokenized_name_and_type'
  end
end
