class WorksController < ApplicationController
	def index
		render :json => Work.where({user_id: params[:user_id]}).to_json
	end

	def show
		render :json => Work.find(params[:id]).as_json(:include => {:projects => {:include => [:technologies]}})
	end
end


