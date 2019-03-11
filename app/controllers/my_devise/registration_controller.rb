class MyDevise::RegistrationsController < Devise::RegistrationsController
	def destroy
		super
		redirect_to "/welcome/index"
	end
end