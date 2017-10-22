class ProjectsController < ApplicationController
	def index
		render :json => Project.where({work_id: params[:work_id]}).to_json
	end

	def show
		render :json => Project.find(params[:id]).as_json(:include => [:technologies])
	end
end


