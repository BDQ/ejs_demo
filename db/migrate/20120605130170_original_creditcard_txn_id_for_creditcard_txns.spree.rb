# This migration comes from spree (originally 20100121183934)
class OriginalCreditcardTxnIdForCreditcardTxns < ActiveRecord::Migration
  def change
    add_column :creditcard_txns, :original_creditcard_txn_id, :integer
  end
end
