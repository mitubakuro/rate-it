module Api
  module V1
    class ItemsController < ApplicationController
      protect_from_forgery with: :null_session

      # GET /api/v1/items
      def index
        items = Item.all

        render json: ItemSerializer.new(items, options).serialized_json
      end

      # GET /api/v1/items/:slug
      def show
        item = Item.find_by(slug: params[:slug])

        render json: ItemSerializer.new(item, options).serialized_json
      end

      # POST /api/v1/items
      def create
        item = Item.new(item_params)
        if item.save
          render json: ItemSerializer.new(item).serialized_json
        else
          render json: {error: item.errors.messages}, status:422
        end
      end

      # PATCH /api/v1/items/:slug
      def update
        item = Item.find_by(slug: params[:slug])
        if item.update(item_params)
          render json: ItemSerializer.new(item, options).serialized_json
        else
          render json: {error: item.errors.messages}, status:422
        end
      end

      # DELETE /api/v1/items/:slug
      def destroy
        item = Item.find_by(slug: params[:slug])
        if item.destroy
          head :no_content
        else
          render json: {error: item.errors.messages}, status:422
        end
      end

      private
      def item_params
        params.require(:item).permit(:name, :image_url)
      end

      def options
        @options ||= {include: %i[reviews]}
      end
    end
  end
end