class AddWorkRefToProject < ActiveRecord::Migration[5.1]
  def change
    add_reference :projects, :work, foreign_key: true
  end
end
