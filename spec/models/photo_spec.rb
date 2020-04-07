require 'rails_helper'

RSpec.describe Photo, type: :model do
  before(:all) do
      @photo = create(:photo)
  end

  it 'should validate required parameters' do
      expect(@photo.img).to_not be_nil
      expect(@photo.img_url).to_not be_nil
  end
end
