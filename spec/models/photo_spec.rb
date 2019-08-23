require 'rails_helper'

RSpec.describe Photo, type: :model do
  before(:all) do
    @dog = create(:photo)
  end

  it 'should validate required parameters' do
      expect(@dog.photo_name).to_not be_nil
      expect(@dog.photo_contents).to_not be_nil
  end
end
