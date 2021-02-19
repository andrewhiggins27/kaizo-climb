class CreateHackcreator < ActiveRecord::Migration[6.0]
  def change
    create_table :hackcreators do |t|
      t.belongs_to :hack
      t.belongs_to :creator

      t.timestamps null: false
    end
  end
end
