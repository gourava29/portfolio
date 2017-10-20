require 'rails_helper'

RSpec.describe Project, type: :model do
	  
	before(:all) do
	    @project = build(:project)
	    work = build(:work)
	    @project.work = work
	    @skill = build(:skill)
	end

	it "valid with name" do
	  	technology = build(:technology)
	  	technology.projects = [@project]
	  	technology.skill = @skill
	  	technology.save
	  	expect(technology).to be_valid
	end

	it "not valid with only name" do
	  	technology = Technology.new()
	  	technology.skill = @skill
	  	technology.save
	  	expect(technology).to_not be_valid
	end
	
	it "not valid without skill" do
	  	technology = build(:technology)
	  	technology.save
	  	expect(technology).to_not be_valid
	end

	it "belongs_to Skill" do
	  	expect(Technology.reflect_on_association(:skill).macro).to eq (:belongs_to)
	end
	
	it "has_and_belongs_to_many projects" do
	  	expect(Technology.reflect_on_association(:projects).macro).to eq (:has_many)
	end

	it "responds to to_relationship_format" do
		technology = build(:technology)
		expect(technology.respond_to?(:to_relationship_format)).to be_truthy
	end

end
