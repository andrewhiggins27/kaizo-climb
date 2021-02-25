class HackSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :length, :date, :url 

  has_many :creators
  has_many :screenshots
end