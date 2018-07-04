class AddEmotionsToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :emotions, :json, default: {}
  end
end
