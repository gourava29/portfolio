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
		_includedOptions = options[:include]
		_json = super(options.deep_dup.except!(:include))
		unless _includedOptions.nil?
			_includedOptionsList = _includedOptions
			if _includedOptions.class.eql?(Hash)
				_includedOptionsList = _includedOptions.to_a
			end
			_includedOptionsList.each do |childModel| 
				_associatedModelName = childModel.class.eql?(Array) ? childModel[0] : childModel
				_associatedModelOptions = childModel.class.eql?(Array) ? childModel[1] : {}
				_associatedModel = self.send(_associatedModelName)
				_json[_associatedModelName] = get_child_json(_associatedModel, _associatedModelOptions)
			end
		end
		_json[:link] = Rails.application.routes.url_helpers.url_for(self)  
		_json
	end
		
	def get_child_json(child_model, options)
		_child_options = options
		unless child_model.is_a?(ActiveRecord::Base)
			child_model.map do |childModel|
				child_json = childModel.as_json(_child_options)
				 if self.respond_to?(:techcollabarators)
					 if childModel.class.name.eql?("Technology")
						 child_json["tc_description"] = self.techcollabarators.where(technology_id: childModel.id).first.description
					 elsif childModel.class.name.eql?("Project")
						 child_json["tc_description"] = self.techcollabarators.where(project_id: childModel.id).first.description
					 end
				 end
				 child_json
			end
		else 
			child_model.as_json(options)
		end
	end
end
