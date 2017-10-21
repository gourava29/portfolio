require 'rails_helper'

RSpec.describe WorksController, type: :controller do

	it 'should get all users' do
		user = build(:user)
		work = build(:work)
		work.user = user
		work.save
		user.save
		get :index, params: {user_id: user.id}
		expect(response.body).to eq ([work].to_json)
		work.delete
		user.delete
	end

	it 'should get user with id' do
		user = build(:user)
		work = build(:work)
		work.user = user
		work.save
		user.save
		get :show, params: { id: work.id }
		expect(response.body).to eq (work.as_json(:include => [:projects]).to_json)
		work.delete
		user.delete
	end
end
