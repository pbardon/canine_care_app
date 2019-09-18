require 'rails_helper'

RSpec.describe Photo, type: :model do
  before(:all) do
    @photo = create(:photo)
  end

  it 'should validate required parameters' do
      expect(@photo.photo_name).to_not be_nil
      expect(@photo.photo_contents).to_not be_nil
  end

  it 'should be able to provide a url' do
    expect(@photo.img_url).to_not be_nil
    expect(@photo.img_url).to match(/^\/rails\/active_storage\/blobs\/.*\??disposition=attachment$/)
  end
end
