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
		project = build(:project)
		technology = build(:technology)
		skill = build(:skill)
		technology.skill = skill
		project.technologies.concat(technology)
		project.save
		work.projects.concat(project)
		user.works.concat(work)
		user.save
		get :show, params: { id: work.id }
		expect(response.body).to eq (work.as_json(:include =>  {:projects => {:include => [:technologies]}}).to_json)
		project.destroy
		work.destroy
		user.destroy
	end
end
