class Api::V1::CreatorsController < ApplicationController
  def show
    creator = Creator.find(params[:id])
    hacks = creator.hacks

    hack_list_serialized = hacks.map { |hack| HackSerializer.new(hack).as_json}
    
    render json: {creator: creator, hacks: hack_list_serialized}
  end
end