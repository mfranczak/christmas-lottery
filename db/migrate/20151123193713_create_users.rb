class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name
      t.integer :login_status, default: 0
      t.integer :lotery_status, default: 0

      t.timestamps null: false
    end
  end
end
