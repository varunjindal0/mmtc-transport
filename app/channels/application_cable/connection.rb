module ApplicationCable
  class Connection < ActionCable::Connection::Base
  	identified_by :current_user

    def connect
      self.current_user = find_verified_user
    end

    def disconnect
      # Any cleanup work needed when the cable connection is cut.
    end

    protected
      def find_verified_user
      																				# Why the following code isn't working.

        # if verified_user = User.find_by(id: cookies.signed[:user_id])
        #   verified_user
        # else
        #   reject_unauthorized_connection
        # end

        if verified_user = env['warden'].user
        	verified_user
      	else
        	reject_unauthorized_connection
      	end
      end
  end
end
