def generate_base64_encoded_image
  rand_int = rand(1..8)
  return "data:image/jpeg;base64,#{Base64.encode64(File.open("/Users/oldComputer/Desktop/seedphotos/sitter#{rand_int}.jpg", "rb").read)}"
end
