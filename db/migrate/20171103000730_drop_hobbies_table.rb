class DropHobbiesTable < ActiveRecord::Migration[5.1]
  def change
    drop_table :hobbies
  end
end
