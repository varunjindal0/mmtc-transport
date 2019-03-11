class ApplicationController < ActionController::Base
	# How dangerous this is: some dudes at stackoverflow say its ok :P
	skip_before_action :verify_authenticity_token
end
