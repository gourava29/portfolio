class CreateTechcollabarators < ActiveRecord::Migration[5.1]
  def change
    create_table :techcollabarators do |t|
      t.string :description
      t.references :technology, foreign_key: true
      t.references :project, foreign_key: true

      t.timestamps
    end
  end
end
