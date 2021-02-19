class CreateScreenshot < ActiveRecord::Migration[6.0]
  def change
    create_table :screenshots do |t|
      t.string :url
      t.belongs_to :hack

      t.timestamps null: false
    end
  end
end
