class CreateQuotations < ActiveRecord::Migration[5.2]
  def change
    create_table :quotations do |t|
      t.string :value
      t.references :requirement, foreign_key: true
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
