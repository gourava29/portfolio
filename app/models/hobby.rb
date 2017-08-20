class Hobby < ApplicationRecord
	include ModelHelper
	
	validates :name, presence: true

	belongs_to :user
end
