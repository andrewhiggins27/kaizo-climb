class CreateHack < ActiveRecord::Migration[6.0]
  def change
    create_table :hacks do |t|
      t.string :name, null: false
      t.string :description, null: false
      t.string :date, null: false
      t.string :length, null: false
      t.string :url, null: false

      t.timestamps null: false
    end
  end
end
