class Api::V1::HacksController < ApplicationController
  include PgSearch

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

  def add_hack_to_list
    hack = Hack.find(params[:hack_id])
    list = List.find(params["listId"])
    
    if !list.hacks.include?(hack)
      list.hacks << hack
      list.ordered_ids << hack.id.to_s
      list.save
      
      render json: { hackAdded: true }
    else
      render json: { hackAdded: false }
    end
  end

  def remove_hack_from_list
    hack = Hack.find(params[:hack_id])
    list = List.find(params["listId"])

    new_ordered_ids = list.ordered_ids.select {|id| id != hack.id.to_s}

    list.hacks.delete(hack)
    list.ordered_ids = new_ordered_ids
    list.save

    hacks = list.hacks
    hack_list_serialized = hacks.map { |hack| HackSerializer.new(hack).as_json}

    render json: {list: list, hacks: hack_list_serialized}
  end

  def search
    search_results = PgSearch.multisearch(params[:query])
    results_hacks = []

    search_results.each do |result|
      if result[:searchable_type] == "Creator"
        hacks = Creator.find(result[:searchable_id]).hacks
        results_hacks.concat(hacks)
      elsif result[:searchable_type] == "Hack"
        results_hacks << Hack.find(result[:searchable_id])
      end
    end

    hack_list_serialized = results_hacks.map { |hack| HackSerializer.new(hack).as_json}

    render json: {hacks: hack_list_serialized}
  end

  def completed_hack
    user = User.find(params["user_id"])
    hack = Hack.find(params["hack_id"])

    if !user.completed_hack_ids.include?(hack.id.to_s)
      user.completed_hack_ids << hack.id.to_s
      user.save
    else
      user.completed_hack_ids.delete(hack.id.to_s)
      user.save
    end
    
    render json: {user: user}
  end
end