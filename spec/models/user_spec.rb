require 'rails_helper'

RSpec.describe User, type: :model do

  it "valid with name and role" do
  	user = build(:user)
  	expect(user).to be_valid
  end

  it "not valid with only name" do
  	user = build(:user, role: nil)
  	expect(user).to_not be_valid
  end

  it "not valid with only role" do
  	user = build(:user, name: nil)
  	expect(user).to_not be_valid
  end

  it "not valid with blank data" do
  	user = User.new()
  	expect(user).to_not be_valid
  end

  it "has many works" do
  	expect(User.reflect_on_association(:works).macro).to eq (:has_many)
  end

  it "has many skills" do
  	expect(User.reflect_on_association(:skills).macro).to eq (:has_many)
  end

  it "has many hobbies" do
  	expect(User.reflect_on_association(:hobbies).macro).to eq (:has_many)
  end

  it "responds to to_relationship_format" do
    user = build(:user)
    expect(user.respond_to?(:to_relationship_format)).to be_truthy
  end

end
