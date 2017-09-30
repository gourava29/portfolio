class AddUserRefToConnection < ActiveRecord::Migration[5.1]
  def change
  	add_reference :connections, :user, foreign_key: true
  end
end
