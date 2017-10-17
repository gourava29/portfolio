class Work < ApplicationRecord
	include ModelHelper
	
	validates :name, presence: true
	
	belongs_to :user
	has_many :projects
	
	def excludedRel
		[:projects]
	end
end
