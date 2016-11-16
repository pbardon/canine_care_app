class SetDefaultAvgRatingForSitters < ActiveRecord::Migration
  def change
    change_column :sitters, :avg_rating, :integer, default: 0
  end
end
