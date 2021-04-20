class AddListToHacks < ActiveRecord::Migration[6.0]
  def change
    add_reference :hacks, :list, index: true
  end
end
