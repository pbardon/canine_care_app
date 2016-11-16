json.array!(@sitters) do |sitter|
  json.partial!("sitters/sitter", sitter: sitter)
end
