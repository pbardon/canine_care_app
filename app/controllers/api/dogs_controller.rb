require 'byebug'

module Api
  class DogsController < ApplicationController
    wrap_parameters :dog, include: [:name, :age, :description, :size, :photo_attributes]

    def create
      @dog = current_user.dogs.create(dog_params)
      if @dog.save()
        render "dogs/show"
      else
        render json: @dog.errors.full_messages, status: :unprocessable_entity
      end
    end

    def index
      @dogs = current_user.dogs
      render "dogs/index"
    end

    def show
      @current_user = current_user
      @dog = Dog.find(params[:id]);
      if @dog
        if @dog.comments.count > 0
          @dog.comments.each do |comment|
            sum += comment.rating
          end
          @dog.avg_rating = sum/@dog.comments.count
        end
        render "dogs/show"
      else
        render json: @dog.errors.full_messages, status: :unprocessable_entity
      end
    end

    def update
      @dog = Dog.find(params[:id]);
      if @dog.user_id == current_user.id && @dog.update_attributes(dog_params)
        render "dogs/show"
      else
        render json: @dog.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @dog = Dog.find(params[:id]);
      clone = @dog.clone
      if @dog.destroy
          @dog = clone
          render "dogs/show"
          return
      end
      render json: @dog.errors.full_messages, status: :unprocessable_entity
    end

    private

    def dog_params
      params.require(:dog).permit(:name, :age, :description, :size, photo_attributes: [:photo_name, :photo_contents])
    end
  end
end
