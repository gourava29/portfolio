require 'rails_helper'

RSpec.describe TechnologiesController, type: :controller do

	it 'should get all users' do
		user = create(:user)
		skill = build(:skill)
		technology = build(:technology)
		technology.skill = skill
		technology.save
		skill.user = user
		skill.save
		get :index
		expect(response.body).to eq ([technology].to_json)
		technology.delete
		skill.delete
		user.delete
	end

	it 'should get user with id' do
		user = create(:user)
		skill = build(:skill)
		technology = build(:technology)
		technology.skill = skill
		technology.save
		skill.user = user
		skill.save
		get :show, params: { id: technology.id }
		expect(response.body).to eq (technology.as_json(:include => [:projects]).to_json)
		technology.delete
		skill.delete
		user.delete
	end
end
