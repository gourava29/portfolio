require 'rails_helper'

RSpec.describe Project, type: :model do
	  
	before(:all) do
	    @work = build(:work)
	end

	it "valid with name" do
	  	project = build(:project)
	  	project.work = @work
	  	project.save
	  	expect(project).to be_valid
	end

	it "not valid with only name" do
	  	project = Project.new()
	  	project.work = @work
	  	project.save
	  	expect(project).to_not be_valid
	end

	it "not valid without user" do
	  	project = Project.new()
	  	expect(project).to_not be_valid
	end

	it "belongs_to User" do
	  	expect(Project.reflect_on_association(:work).macro).to eq (:belongs_to)
	end
	
	it "has_and_belongs_to_many technologies" do
	  	expect(Project.reflect_on_association(:technologies).macro).to eq (:has_many)
	end

	it "responds to to_relationship_format" do
		project = build(:project)
		expect(project.respond_to?(:to_relationship_format)).to be_truthy
	end

end
