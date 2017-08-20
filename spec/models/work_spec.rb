require 'rails_helper'

RSpec.describe Work, type: :model do
  before(:all) do
    @user = build(:user)
  end

  it "valid with name, role and user" do
  	work = build(:work)
  	work.user = @user
  	work.save
  	expect(work).to be_valid
  end

  it "not valid with only name" do
  	work = Work.new()
  	work.user = @user
  	work.save
  	expect(work).to_not be_valid
  end

  it "not valid without user" do
  	work = Work.new()
  	expect(work).to_not be_valid
  end

  it "belongs_to User" do
  	expect(Work.reflect_on_association(:user).macro).to eq (:belongs_to)
  end

  it "has many projects" do
    expect(Work.reflect_on_association(:projects).macro).to eq (:has_many)
  end

  it "responds to to_relationship_format" do
    work = build(:work)
    expect(work.respond_to?(:to_relationship_format)).to be_truthy
  end
end
