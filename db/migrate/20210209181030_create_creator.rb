class CreateCreator < ActiveRecord::Migration[6.0]
  def change
    create_table :creators do |t|
      t.string :name, null: false
      
      t.timestamps null: false
    end
  end
end
