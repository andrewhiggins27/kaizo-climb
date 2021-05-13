class Api::V1::ListsController < ApplicationController
  def create
    user = User.find(params[:user_id])
    List.create({user: user, title: params[:title], ordered_ids: []})
    lists = user.lists

    render json: {lists: lists}
  end

  def index
    user = User.find(params[:user_id])
    lists = user.lists

    render json: {lists: lists}
  end

  def show
    list = List.find(params[:id])
    hacks = list.hacks
    hack_list_serialized = hacks.map { |hack| HackSerializer.new(hack).as_json}

    render json: {list: list, hacks: hack_list_serialized}
  end

  def destroy
    List.find(params[:id]).delete
    user = User.find(params[:user_id])
    lists = user.lists
    
    render json: {lists: lists}
  end

  def position_change
    list = List.find(params[:list_id])
    list.ordered_ids = params["newOrderedList"]
    list.save
    hacks = list.hacks
    hack_list_serialized = hacks.map { |hack| HackSerializer.new(hack).as_json}

    render json: {list: list, hacks: hack_list_serialized}
  end
end

