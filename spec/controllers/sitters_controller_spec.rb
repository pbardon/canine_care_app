require 'rails_helper'
require 'spec_helper'
require 'byebug'

RSpec.describe Api::SittersController, type: :controller do
  before(:each) do
    @sitter = FactoryBot.create(:sitter)
    @user = @sitter.user
    controller.sign_in @user
  end

  describe "#create" do
    it "creates a sitter account" do
      post :create, { params: 
        { sitter: { 
          sitter_name: "Best Sitter Around", 
          description: "Takes care of your pets", 
          price: "34",
          medium: "true",
          street_address: "1727 NE 29th St",
          city: "Bellevue",
          state: "WA",
          zipcode: "98008",
          photo_attributes: { 
              photo_contents: generate_base64_encoded_image
          }
        }, format: :json }}
        expect(response).to render_template("sitters/show")
        expect(@user.sitter_account.id).to eq(@sitter.id)
    end
  end

  describe '#show' do
    it "renders a sitter account as json" do
      get :show, { params: { id: @sitter.id }, format: :json }
      expect(response).to render_template("sitters/show")
    end
  end
end 