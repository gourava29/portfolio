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
	
	def as_json(options = {})
		json = super(options)
		unless options[:include].nil?
			options[:include].each do |md|
				json[md.to_s].map { |s_md| s_md["description"] = self.techcollabarators.where(project_id: s_md["id"]).first.description }
			end
		end
		json
	end
end
