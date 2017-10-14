class AddSkillRefToTechnology < ActiveRecord::Migration[5.1]
  def change
    add_reference :technologies, :skill, foreign_key: true
  end
end
