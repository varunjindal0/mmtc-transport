class RequirementsChannel < ApplicationCable::Channel
  def subscribed
     stream_from "requirements_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
