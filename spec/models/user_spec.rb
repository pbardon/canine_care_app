require 'rails_helper'

RSpec.describe User, type: :model do
    before(:all) do
        @user = create(:user)
    end

    it 'should validate required fields' do
        expect(@user.name).to_not be_nil
        expect(@user.email).to_not be_nil
        expect(@user.session_token).to_not be_nil
        expect(@user.password).to_not be_nil
        expect(@user.password_digest).to_not be_nil
    end

    it 'should be able to find a user by credentials' do
        found_user = User
            .find_by_credentials(@user.email, @user.password)
        expect(found_user.name).to eq(@user.name)
    end

    it 'should be able to check a password' do
        expect(@user.is_password?(
            @user.password)).to be true
        expect(@user.is_password?(
            Faker::Internet.password)).to be false
    end

    it 'should be able to reset the session_token' do
        token = @user.session_token
        @user.reset_session_token!
        expect(@user.session_token).to_not eq token
    end
end
