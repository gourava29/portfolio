class UsersController < ApplicationController
	def index
		render :json => User.all().to_json
	end

	def show
		@user = User.includes(:connections).find(params[:id])
		render :json => @user.to_relationship_format([:connections])
	end
end


