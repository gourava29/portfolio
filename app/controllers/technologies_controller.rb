class TechnologiesController < ApplicationController
	def index
		render :json => Technology.all.to_json
	end

	def show
		render :json => Technology.find(params[:id]).as_json(:include => [:projects])
	end
end


