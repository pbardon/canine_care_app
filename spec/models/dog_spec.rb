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
end
