require 'rails_helper'

RSpec.describe ProjectsController, type: :controller do

	it 'should get all project for work id' do
		work = build(:work)
		user = build(:user)
		project = build(:project)
		project.work = work
		work.user = user
		work.save
		project.save
		get :index, params: { work_id: work.id }
		expect(response.body).to eq ([project].to_json)
		project.delete
		work.delete
	end

	it 'should get user with id' do
		work = build(:work)
		user = build(:user)
		project = build(:project)
		project.work = work
		work.user = user
		work.save
		project.save
		get :show, params: { id: project.id }
		expect(response.body).to eq (project.as_json(:include => [:technologies]).to_json)
		project.delete
		work.delete
	end
end
