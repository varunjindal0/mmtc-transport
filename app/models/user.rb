class User < ApplicationRecord
	has_many :requirements
	has_many :quotations
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable,                  
         :recoverable, :rememberable, :validatable, :registerable
end
