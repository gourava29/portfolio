class Technology < ApplicationRecord
    include ModelHelper
    
    validates :name, presence: true
    validates :efficiency, presence: true
    
    belongs_to :skill
    
	has_many :techcollabarators
	has_many :projects, :through => :techcollabarators

	def excludedRel
		super([:projects, :techcollabarators])
	end
end
