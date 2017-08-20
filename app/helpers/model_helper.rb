module ModelHelper
	def to_relationship_format
		self_json = self.as_json
		self_json["relationships"] = {}
		self.class.reflect_on_all_associations(:has_many).map(&:name).each do |associatedChildModel|
			currentModelJsonList = [];
			self.send(associatedChildModel).each do |childRecord|
				childRecordJson = childRecord.respond_to?(:to_relationship_format) ? childRecord.to_relationship_format : childRecord.as_json
				currentModelJsonList.push(childRecordJson)
			end
			self_json["relationships"][associatedChildModel.to_s] = currentModelJsonList
		end
		self_json
	end
end