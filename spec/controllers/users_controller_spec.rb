require 'rails_helper'

RSpec.describe UsersController, type: :controller do

	it 'should get all users' do
		user = create(:user)
		get :index
		expect(response.body).to eq ([user].to_json)
		user.delete
	end

	it 'should get user with id' do
		user = create(:user)
		get :show, params: { id: user.id }
		expect(response.body).to eq (user.to_relationship_format([:connections]).to_json)
		user.delete
	end
end
