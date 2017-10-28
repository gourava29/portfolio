class Project < ApplicationRecord
	include ModelHelper

	validates :name, presence: true

	belongs_to :work
	has_many :techcollabarators, dependent: :destroy
	has_many :technologies, :through => :techcollabarators
	
	def excludedRel
		super([:techcollabarators])
	end
end
