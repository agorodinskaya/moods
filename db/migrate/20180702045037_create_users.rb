class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :name
      t.string :text
      t.string :email
      t.string :text
      t.string :k_face_id
      t.string :string

      t.timestamps
    end
  end
end
