class User < ApplicationRecord
	include ModelHelper
	
	validates :name, presence: true
	validates :role, presence: true

	has_many :works, dependent: :destroy
	has_many :skills, dependent: :destroy
	has_many :hobbies, dependent: :destroy
	has_many :connections, dependent: :destroy
end
