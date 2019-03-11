class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable,                   #removing :registrable so that no new user can signup
         :recoverable, :rememberable, :validatable
end
