json.array!(@dogs) do |dog|
  json.partial!("dogs/dog", dog: dog)
end
