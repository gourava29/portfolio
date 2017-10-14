class CreateTechnologies < ActiveRecord::Migration[5.1]
  def change
    create_table :technologies do |t|
      t.string :name
      t.integer :efficiency

      t.timestamps
    end
  end
end
