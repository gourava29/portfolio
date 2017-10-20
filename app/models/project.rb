class Project < ApplicationRecord
	include ModelHelper

	validates :name, presence: true

	belongs_to :work
	has_many :techcollabarators
	has_many :technologies, :through => :techcollabarators

	def as_json(options = {})
		json = super(options)
		p options[:include]
		unless options[:include].nil?
			options[:include].each do |md|
				json[md.to_s].map { |s_md| s_md["description"] = self.techcollabarators.where(technology_id: s_md["id"]).first.description }
			end
		end
		json
	end
end
