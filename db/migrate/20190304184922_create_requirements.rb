class CreateRequirements < ActiveRecord::Migration[5.2]
  def change
    create_table :requirements do |t|
      t.string :loadingStation
      t.integer :weight
      t.date :loadingDate
      t.string :material
      t.integer :freight
      t.string :truckType

      t.timestamps
    end
  end
end
