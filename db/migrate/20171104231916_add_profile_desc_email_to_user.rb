class AddProfileDescEmailToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :profile_desc, :string
    add_column :users, :email, :string
  end
end
