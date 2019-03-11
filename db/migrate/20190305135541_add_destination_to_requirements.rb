class AddDestinationToRequirements < ActiveRecord::Migration[5.2]
  def change
    add_column :requirements, :destination, :string
  end
end
