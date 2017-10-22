module ModelHelper
	def excludedRel(excluded = [])
		excluded
	end
	
	def to_relationship_format(excludedModels = [])
		self_json = self.as_json(:include => excludedModels)
		self_json["relationships"] = []
		has_many_reflections = self.class.reflect_on_all_associations(:has_many)
		excludedModels = excludedModels.concat(self.excludedRel)
		has_many_reflections.map(&:name).each do |associatedChildModel|
			unless excludedModels.include? associatedChildModel
				currentModelJsonList = [];
				self.send(associatedChildModel).each do |childRecord|
					childRecordJson = childRecord.respond_to?(:to_relationship_format) ? childRecord.to_relationship_format : childRecord.as_json
					currentModelJsonList.push(childRecordJson)
				end
				if has_many_reflections.length > 1
					self_json["relationships"].push({name: associatedChildModel.to_s, relationships: currentModelJsonList})
				else
					self_json["relationships"] = currentModelJsonList
				end
			end
		end
		self_json
	end
	
	def as_json(options = {})
		@includedOptions = options[:include]
		options[:include] = nil
		json = super(options)
		unless @includedOptions.nil?
			@includedOptions.each do |childModelName| 
				@associatedModel = self.send(childModelName)
				json[childModelName] = @associatedModel.kind_of?(Array) ? @associatedModel.map {|childModel| childModel.as_json} : @associatedModel
			end
		end
		json[:link] = Rails.application.routes.url_helpers.url_for(self)  
		json
	end
end
