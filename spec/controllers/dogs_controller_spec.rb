require 'rails_helper'
require 'spec_helper'


def current_user
  FactoryBot.create(:user)
end

RSpec.describe Api::DogsController, type: :controller do
  before(:each) do
    user = FactoryBot.create(:user)
    controller.sign_in user
  end

  describe "#create" do
    it "creates a dog" do
      get :create, { params: 
        { dog: { 
          name: "Spot", age: 7, 
          description: "Nice", size: "small", 
          photo_attributes: { 
              photo_name: "test_photo", 
              photo_contents: generate_base64_encoded_image
          }}
        }, format: :json }
        expect(response).to render_template("dogs/show")
    end
  end
end