class Requirement < ApplicationRecord
	belongs_to :user
	has_many :quotations, dependent: :destroy
end
