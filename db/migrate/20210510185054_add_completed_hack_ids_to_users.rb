class AddCompletedHackIdsToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :completed_hack_ids, :string, array: true, default: []
  end
end
