class SetDefaultAvgRatingForSitters < ActiveRecord::Migration[5.0]
  def change
    change_column :sitters, :avg_rating, :integer, default: 0
  end
end
