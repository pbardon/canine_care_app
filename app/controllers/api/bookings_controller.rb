module Api
  class BookingsController < ApplicationController
    wrap_parameters :booking, 
      format: [ :json],
      include: [:sitter_id, :date_start, :date_end, :dog_id, :message, :confirmed, :completed]

    def index
      if (params[:sitter_id])
        @bookings = Booking.where(sitter_id: params[:sitter_id])
      elsif (params[:dog_id])
        @bookings = Booking.where(dog_id: params[:dog_id])
      else
        @bookings = Booking.all
      end

      render json: @bookings
    end

    def create
      @booking = Booking.new(booking_params)

      if booking_params['date_start']
        unless booking_params['date_start'] == ""
          @booking.date_start = Date.strptime(booking_params['date_start'],
          '%m/%d/%Y').to_s.split(" ")[0].to_s
        end
      end

      if booking_params['date_end']
        unless booking_params['date_end'] == ""
          @booking.date_end = Date.strptime(booking_params['date_end'],
          '%m/%d/%Y').to_s.split(" ")[0].to_s
        end
      end


      if @booking.save
        render json: @booking
      else
        render json: @booking.errors.full_messages, status: :unprocessable_entity
      end
    end

    def show
      @booking = Booking.find(params[:id])

      if @booking
        if Time.now > @booking.date_end && @booking.confirmed
          @booking.completed = true
          @booking.save
        end
        render 'bookings/show'
      else
        render json: @booking.errors.full_messages
      end
    end

    def update
      @booking = Booking.find(params[:id])
      if @booking.update_attributes(booking_params)
        render json: @booking
      else
        render json: "Can't edit this booking"
      end
    end

    def destroy
      @booking = Booking.find(params[:id])
      @booking.destroy
      render json: @booking
    end

    private

    def booking_params
      params.require(:booking).permit(:sitter_id, :date_start, :date_end, :dog_id, :message, :confirmed, :completed)
    end
  end

end
