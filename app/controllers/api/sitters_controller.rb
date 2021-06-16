require 'addressable/uri'
require 'rest-client'
require 'json'

module Api
  class SittersController < ApplicationController
    attr_reader :user_id

    wrap_parameters :sitter, 
      format: [ :json ],
      include: [ :sitter_name, :price, :description, :street_address,
                 :city, :state, :zipcode, :small, :medium, :large,
                 :photo_attributes ]

    def create
      @sitter = Sitter.new(sitter_params)
      @sitter.user_id = current_user.id
      if @sitter.save
        @sitter.generate_geocode
        @sitter.save!
        render 'sitters/show'
      else
        render json: @sitter.errors.full_messages, status: :unprocessable_entity
      end
    end

    def index
        per_page = 999
        if params[:page]
            @sitters = Sitter.page(params[:page].to_i).per(per_page)
        elsif params[:user_id]
            sitter_entry = Sitter.find_by_user_id(params[:user_id])
            if sitter_entry
              @sitters = [ sitter_entry ]
            end
        else
            @sitters = Sitter.page(1).per(per_page)
        end

        render "sitters/index"
    end

    def update

      @sitter = Sitter.find(params[:id])

      # if @sitter.user_id == 1
      #   render json: "Can't Modify Guest Account", status: :unprocessable_entity
      #   return
      # end

      if @sitter.user_id == current_user.id && @sitter.update_attributes(sitter_params)
        geo = @sitter.generate_geocode
        if geo
          @sitter.latitude = geo[0]
          @sitter.longitude = geo[1]
        end
        @sitter.save!
        render "sitters/show"
      else
        render json: @sitter.errors.full_messages, status: :unprocessable_entity
      end
    end

    def show
      @sitter = Sitter.find(params[:id])
      if @sitter
        i = 0
        sum = 0
        @sitter.comments.each do |comment|
          sum += comment.rating
          i += 1
        end
        @sitter.avg_rating = sum/i unless i == 0
        @sitter.save
      end

      @current_user = current_user

      unless @current_user
          @current_user = User.new({ id: 0 })
      end

      render "sitters/show"
    end

    def destroy
      @sitter = Sitter.find(params[:id])

      if @sitter.user_id == 1
        render json: "Can't Modify Guest Account", status: :unprocessable_entity
        return
      end

      if @sitter.user_id == current_user.id && @sitter.destroy
        render "sitters/show"
      else
        render json: "Can't destroy some else's sitter profile"
      end
    end

    private

    def sitter_params
      params.require(:sitter).permit(:sitter_name, :description, :price,
                                     :small, :medium, :large,
                                     :street_address, :city, :state, :zipcode,
                                     :sitter_photo, :page,
                                     photo_attributes: [:photo_contents])
    end
  end
end
