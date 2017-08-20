class UsersController < ApplicationController
	def index
		render :json => User.all().to_json
	end

	def show
		@user = User.find(params[:id])
        render :json => @user.to_relationship_format
	end
end

# format do 
# 	self.reflect_on_all_associations.map(&:name).each do |item|
# 		self.relationships.push(self[item])
# 	end
# end


# 	 ---->  Work   ----> Project ----> React
# 	|
# User|
# 	|
#      ----> Skills  ----> React


# Skills Schema
# -------------
# id: 1
# name: React
# proficiency: intermediate

# id: 2
# name: ROR
# proficiency: intermediate

# id: 3
# name: Angular
# proficiency: Advanced

# Project Schema
# --------------
# id: 1
# name: BGP
# startDate:
# endDate:
# Url:
# description:
# highlights:
# technologiesUsed: [React, ROR]

# id: 2
# name: MyMaps
# startDate:
# endDate:
# Url:
# description:
# highlights:
# technologiesUsed: [Angular, ROR]

# Project_Skills
# --------------
# id: 1
# project_id: 1
# skill_id: 1

# id: 2
# project_id: 1
# skill_id: 2

# id: 3
# project_id: 2
# skill_id: 3

# id: 4
# project_id: 2
# skill_id: 2

# has_and_belongs_to_many
# Skills belongs to Projects
# Projects have multiple skills


# skills.parent


