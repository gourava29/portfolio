require 'rails_helper'

RSpec.describe Connection, type: :model do
  
  it "valid with name and role" do
  	connection = build(:connection)
  	expect(connection).to be_valid
  end

  it "not valid with only name" do
  	connection = build(:connection, name: nil)
  	expect(connection).to_not be_valid
  end

  it "not valid with only role" do
  	connection = build(:connection, link: nil)
  	expect(connection).to_not be_valid
  end

  it "not valid with blank data" do
  	connection = Connection.new()
  	expect(connection).to_not be_valid
  end

end
