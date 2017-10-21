require 'rails_helper'

RSpec.describe Techcollabarator, type: :model do
  	it "belongs_to User" do
	  	expect(Techcollabarator.reflect_on_association(:project).macro).to eq (:belongs_to)
	end
	
	it "has_and_belongs_to_many technologies" do
	  	expect(Techcollabarator.reflect_on_association(:technology).macro).to eq (:belongs_to)
	end
end
