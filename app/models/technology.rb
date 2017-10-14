class Technology < ApplicationRecord
    include ModelHelper
    
    validates :name, presence: true
    validates :efficiency, presence: true
    
    belongs_to :skill
	has_and_belongs_to_many :projects
end
