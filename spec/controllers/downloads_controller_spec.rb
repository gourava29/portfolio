require 'rails_helper'

RSpec.describe DownloadsController, type: :controller do
    it 'responds with pdf for valid user_id' do
        work = build(:work)
		user = build(:user)
		project = build(:project)
		project.work = work
		work.user = user
		work.save
		project.save
		request.headers["accept"] = 'application/pdf'
        get :show, params: { user_id: user.id }
        expect(response.headers["Content-Type"]).to eq ("application/pdf")
        expect(response.headers["Content-Disposition"]).to eq ("attachment; filename=\"Resume_of_"+user.name+".pdf\"")
        project.delete
		work.delete
		user.delete
    end
end
