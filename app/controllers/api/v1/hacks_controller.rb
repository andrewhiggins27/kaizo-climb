class Api::V1::HacksController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
  end

  def show
    render json: Hack.find(params[:id])
  end

  def pagination
    hack_list = Hack.paginate(page: params[:id])
    hack_list_serialized = hack_list.map { |hack| HackSerializer.new(hack).as_json}

    render json: { hacks: hack_list_serialized, page_number: hack_list.current_page , total_pages: hack_list.total_pages }
  end
end