require 'rails_helper'

RSpec.describe Hobby, type: :model do
  
  before(:all) do
    @user = build(:user)
  end

  it "valid with name, role and user" do
  	hobby = build(:hobby)
  	hobby.user = @user
  	hobby.save
  	expect(hobby).to be_valid
  end

  it "not valid with only name" do
  	hobby = Hobby.new()
  	hobby.user = @user
  	hobby.save
  	expect(hobby).to_not be_valid
  end

  it "not valid without user" do
  	hobby = Hobby.new()
  	expect(hobby).to_not be_valid
  end

  it "belongs_to User" do
  	expect(Hobby.reflect_on_association(:user).macro).to eq (:belongs_to)
  end

end
