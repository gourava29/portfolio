class UsersController < ApplicationController
	def index
		render :json => User.all().to_json
	end

	def show
		@user = User.find(params[:id])
        render :json => @user.to_json(:include => [:works, :hobbies, :skills])
	end
end
