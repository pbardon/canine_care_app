require 'rails_helper'
require 'spec_helper'


def current_user
  FactoryBot.create(:user)
end

RSpec.describe Api::DogsController, type: :controller do
  before(:each) do
    user = FactoryBot.create(:user)
    controller.sign_in user
    @dog = FactoryBot.create(:dog)
  end

  describe "#create" do
    it "creates a dog" do
      post :create, { params: 
        { dog: { 
          name: "Spot", age: 7, 
          description: "Nice", size: "small", 
          photo_attributes: { 
              img: generate_base64_encoded_image
          }
        }, format: :json }}
        expect(response).to render_template("dogs/show")
    end
  end

  describe "#show" do
    render_views
    it "renders the dog as json" do
      get :show, { params: { id: @dog.id }, format: :json }
      expect(response).to render_template("dogs/show")
    end
  end
end 