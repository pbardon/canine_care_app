require 'rails_helper'

RSpec.describe Dog, type: :model do
    before(:all) do
        @dog = create(:dog)
    end

    it 'should validate required parameters' do
        expect(@dog.name).to_not be_nil
        expect(@dog.age).to_not be_nil
        expect(@dog.size).to_not be_nil
        expect(@dog.description).to_not be_nil
        expect(@dog.user_id).to_not be_nil
    end

    it 'should belong to an owner' do
        expect(@dog.user.id).to_not be_nil
    end

    it 'should be able to make a booking' do
        booking = create(:booking)
        sitter = create(:sitter)
        expect(booking).to_not be_nil
        expect(sitter).to_not be_nil
        booking.sitter = sitter
        booking.dog = @dog
        expect(booking.dog_id).to eq @dog.id
    end
end
