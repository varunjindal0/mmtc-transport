class AddUserToRequirements < ActiveRecord::Migration[5.2]
  def change
    add_reference :requirements, :user, foreign_key: true
  end
end
