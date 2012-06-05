# This migration comes from spree (originally 20101026184700)
class CreateLogEntries < ActiveRecord::Migration
  def change
    create_table :log_entries do |t|
      t.integer :source_id
      t.string :source_type
      t.text :details

      t.timestamps
    end
  end
end
