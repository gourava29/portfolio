class CreateProjects < ActiveRecord::Migration[5.1]
  def change
    create_table :projects do |t|
      t.string :name
      t.string :description
      t.bigint :start_date
      t.bigint :end_date

      t.timestamps
    end
  end
end
