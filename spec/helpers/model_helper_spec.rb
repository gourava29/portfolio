require 'rails_helper'

RSpec.describe ModelHelper, type: :module do

	class ChildrenClass
		def name
			:ChildrenClass
		end

		def as_json
			{name: "Child1"}
		end
	end

	class Test
		include ModelHelper

		def initialize(childrens)
			@@children = childrens
	    end
		
		def self.reflect_on_all_associations(input) 
			if(input.eql? :has_many)
				@@children
			else
				[]
			end
		end

		def ChildrenClass 
			@@children
		end

		def as_json(include = [])
			{name: "Parent1"}
		end
	end


	before(:all) do
		@childClass = ChildrenClass.new
		@test = Test.new([@childClass])
	end

	it "respond to to_relationship_format" do
		expectedResponse = @test.as_json
		expectedResponse["relationships"] = {}
		expectedResponse["relationships"][@childClass.name.to_s] = [@childClass.as_json]
		
		expect(@test.respond_to?(:to_relationship_format)).to be true
		expect(@test.to_relationship_format).to eq(expectedResponse)
	end

	it "respond to to_relationship_format with excluded childrens" do
		expectedResponse = @test.as_json
		expectedResponse["relationships"] = {}
		
		expect(@test.respond_to?(:to_relationship_format)).to be true
		expect(@test.to_relationship_format([@childClass.name])).to eq(expectedResponse)
	end

end