class CreateLists < ActiveRecord::Migration[6.0]
  def change
    create_table :lists do |t|
      t.belongs_to :user
      t.string  :title
      t.string 'ordered_ids', array: true

      t.timestamps null: false
    end
  end
end
