module Api
  class EventsController < ApplicationController
    respond_to :json
    before_action :set_event, only: [:update, :destroy]

    def index
      respond_with Event.order("#{sort_by} #{order}")
    end

    def search
      query = params[:query]
      events = Event.where('name LIKE ? OR place LIKE ? OR description LIKE ?',
                           "%#{query}%", "%#{query}%", "%#{query}%")

      respond_with events
    end

    def create
      event = Event.new(event_params)
      if event.save
        respond_with :api, event, status: :ok
      else
        render json: { errors: event.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def update
      if @event.update(event_params)
        respond_with @event, status: :ok
      else
        render json: { errors: @event.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def destroy
      @event.destroy
      head :ok
    end

    private

    def event_params
      params.require(:event).permit(:name, :description, :event_date, :place)
    end

    def set_event
      @event = Event.find(params[:id])
    end

    def sort_by
      %w(name
         place
         description
         event_date).include?(params[:sort_by]) ? params[:sort_by] : 'name'
    end

    def order
      %w(asc desc).include?(params[:order]) ? params[:order] : 'asc'
    end
  end
end
