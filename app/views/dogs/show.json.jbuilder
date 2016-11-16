json.partial!("dogs/dog", dog: @dog)

json.current_user_id(@current_user.id)

json.bookings do
  json.array!(@dog.bookings) do |booking|
    json.(booking, :sitter_id, :dog_id, :date_start, :date_end, :message, :confirmed, :completed)
  end
end

json.comments do
  json.array!(@dog.comments) do |comment|
    json.(comment, :rating, :content, :comment_date)
  end
end
