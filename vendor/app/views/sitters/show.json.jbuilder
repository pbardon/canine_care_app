json.partial!("sitters/sitter", sitter: @sitter)

json.current_user_id(@current_user.id)

json.bookings do
  json.array!(@sitter.bookings) do |booking|
    json.(booking, :id, :sitter_id, :dog_id, :date_start, :date_end, :message, :confirmed, :completed)
  end
end

json.comments do
  json.array!(@sitter.comments) do |comment|
    json.(comment, :rating, :content, :comment_date)
  end
end
