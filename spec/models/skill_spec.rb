require 'rails_helper'

RSpec.describe Skill, type: :model do
  
  before(:all) do
    @user = build(:user)
  end

  it "valid with name, role and user" do
  	skill = build(:skill)
  	skill.user = @user
  	skill.save
  	expect(skill).to be_valid
  end

  it "not valid with only name" do
  	skill = Skill.new()
  	skill.user = @user
  	skill.save
  	expect(skill).to_not be_valid
  end

  it "not valid without user" do
  	skill = Skill.new()
  	expect(skill).to_not be_valid
  end

  it "belongs_to User" do
  	expect(Skill.reflect_on_association(:user).macro).to eq (:belongs_to)
  end
  
  it "has_many technologies" do
  	expect(Skill.reflect_on_association(:technologies).macro).to eq (:has_many)
  end

  it "responds to to_relationship_format" do
    skill = build(:skill)
    expect(skill.respond_to?(:to_relationship_format)).to be_truthy
  end

end
