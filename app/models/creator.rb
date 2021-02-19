class Creator < ApplicationRecord
  has_many :hackcreators
  has_many :hacks, through: :hackcreators

  validates_uniqueness_of :name
end
