require 'rails_helper'

RSpec.describe Sitter, type: :model do
    before(:each) do
        allow_any_instance_of(Paperclip::Attachment).to receive(:save)
            .and_return(true)
        @sitter = create(:sitter)
    end
  it 'should validate required parameters' do
      expect(@sitter.user_id).to_not be_nil
      expect(@sitter.avg_rating).to_not be_nil
      expect(@sitter.sitter_name).to_not be_nil
      expect(@sitter.description).to_not be_nil
      expect(@sitter.price).to_not be_nil
      expect(@sitter.street_address).to_not be_nil
      expect(@sitter.city).to_not be_nil
      expect(@sitter.state).to_not be_nil
      expect(@sitter.zipcode).to_not be_nil
  end

  it 'should be able to generate a geocode from the address' do
      @sitter.latitude = nil
      @sitter.longitude = nil
      @sitter.street_address = '400 Broad St'
      @sitter.city = 'Seattle'
      @sitter.state =  'WA'
      @sitter.zipcode = 98109
      @sitter.generate_geocode
      expect(@sitter.latitude).to_not be_nil
      expect(@sitter.latitude).to_not be_nil
  end
end
