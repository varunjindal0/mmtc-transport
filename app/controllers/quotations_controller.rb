class QuotationsController < ApplicationController

	before_action :authenticate_user!

	def index
		requesting_user_id = Requirement.find(params[:requirement_id]).user_id
		puts "-------------======================---==-=-=-=-========================:: #{requesting_user_id}"
		if current_user.id == requesting_user_id
			requirement = Requirement.find(params[:requirement_id])
			@quotations = requirement.quotations.includes(:user).as_json(include: { user: { only: [:email] } })
			render json: @quotations
		else
			render json: {unauthorized_access: true}
		end
		
	end

	def create
		@quotation = Quotation.new(whitelisted_quotation_params)
		if @quotation.save!
			render json: {success: true}
		else
			render json: {success: false}
		end
	end

	private
	def whitelisted_quotation_params
		params.permit(:value, :user_id, :requirement_id)
	end
end
