class RequirementsController < ApplicationController
  
	# http_basic_authenticate_with name: "dhh", password: "secret", except: [:index]
  before_action :authenticate_user!, except: [:index]

  def index
  	@requirements = Requirement.all
  	render json: @requirements
  end

  def new
  end

  def create
  	@requirement = Requirement.new(whitelisted_requirements_params)
  	if @requirement.save!
      ActionCable.server.broadcast "requirements_channel", requirement_to_render: requirement_to_render
  		render json: {success: true}
  	else
  		redirect_to "new"
  	end
  end

  def destroy
  	@requirement = Requirement.find(params[:id])
  	@requirement.destroy
  end

  private
  def whitelisted_requirements_params
  	params.require(:requirement).permit(:loadingStation, :destination, :weight, :freight, :loadingDate, :material, :truckType)  
  end

  def requirement_to_render
    render(partial: 'requirement', locals: {requirement: @requirement})
  end
end
