class AddUserRefToHobby < ActiveRecord::Migration[5.1]
  def change
    add_reference :hobbies, :user, foreign_key: true
  end
end
