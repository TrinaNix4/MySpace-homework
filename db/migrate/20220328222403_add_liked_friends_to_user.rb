class AddLikedFriendsToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :liked_friends, :text
  end
end
