require 'rails_helper'

RSpec.describe ModelHelper, type: :module do

	class ChildrenClass
		attr_accessor :name
		def initialize(name)
			@name = name
		end
		
		def as_json
			{name: name}
		end
	end
	
	class Assocation
		def initialize(association_name)
			@association_name = association_name
		end
		
		def name
			@association_name
		end
	end

	class Test
		include ModelHelper
		
		def initialize(childrens)
			@@children = childrens
			class << self
			    @@children.keys.each do |attribute|
			      define_method :"#{attribute}" do ||
			        @@children[attribute]
			      end
			    end
			end
	    end
		
		def self.reflect_on_all_associations(input) 
			if(input.eql? :has_many)
				@@children.keys.map { |u| Assocation.new(u) }
			else
				[]
			end
		end

		def as_json(include = [])
			{name: "Parent1"}
		end
	end


	it "respond to to_relationship_format with one has many association" do
		childClass1 = ChildrenClass.new('child1')
		childClass2 = ChildrenClass.new('child2')
		relName = :rel1
		rel = {}
		rel[relName] = [childClass1, childClass2]
		test = Test.new(rel)
		
		expectedResponse = test.as_json
		expectedResponse["relationships"] = [childClass1.as_json, childClass2.as_json]
		
		expect(test.respond_to?(:to_relationship_format)).to be true
		expect(test.to_relationship_format).to eq(expectedResponse)
	end
	
	it "respond to to_relationship_format with multiple has many association" do
		childClass1 = ChildrenClass.new('child1')
		childClass2 = ChildrenClass.new('child2')
		relName1 = :rel1
		relName2 = :rel2
		rel = {}
		rel[relName1] = [childClass1, childClass2]
		rel[relName2] = [childClass1, childClass2]
		test = Test.new(rel)
		
		expectedResponse = test.as_json
		expectedResponse["relationships"] = []
		expectedResponse["relationships"].push({name: relName1.to_s, relationships: [childClass1.as_json, childClass2.as_json]})
		expectedResponse["relationships"].push({name: relName2.to_s, relationships: [childClass1.as_json, childClass2.as_json]})
		
		
		expect(test.respond_to?(:to_relationship_format)).to be true
		expect(test.to_relationship_format).to eq(expectedResponse)
	end

	it "respond to to_relationship_format with excluded childrens" do
		childClass1 = ChildrenClass.new('child1')
		childClass2 = ChildrenClass.new('child2')
		relName = :rel1
		rel = {}
		rel[relName] = [childClass1, childClass2]
		test = Test.new(rel)
		
		expectedResponse = test.as_json
		expectedResponse["relationships"] = []
		
		expect(test.respond_to?(:to_relationship_format)).to be true
		expect(test.to_relationship_format([relName])).to eq(expectedResponse)
	end

end