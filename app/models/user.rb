class User < ApplicationRecord
	include ModelHelper
	
	validates :name, presence: true
	validates :role, presence: true

	has_many :works
	has_many :skills
	has_many :hobbies
end
