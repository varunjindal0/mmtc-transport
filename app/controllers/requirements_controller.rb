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
    @requirement[:user_id] = current_user.id
  	if @requirement.save!
      ActionCable.server.broadcast "requirements_channel", requirement_to_render: @requirement
  		render json: {success: true}
  	else
  		redirect_to "new"
  	end
  end

  def destroy
  	@requirement = Requirement.find(params[:id])
  	if @requirement.destroy
      ActionCable.server.broadcast "requirements_channel", requirement_to_render: {delete: true, requirement_id: @requirement.id}
    end
  end

  private
  def whitelisted_requirements_params
  	params.require(:requirement).permit(:loadingStation, :destination, :weight, :freight, :loadingDate, :material, :truckType, :user_id)  
  end

  # def requirement_to_render
  #   render json: @requirement
  # end
end
