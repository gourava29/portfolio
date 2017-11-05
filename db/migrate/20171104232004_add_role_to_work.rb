class AddRoleToWork < ActiveRecord::Migration[5.1]
  def change
    add_column :works, :role, :string
  end
end
