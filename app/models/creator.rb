class Creator < ApplicationRecord
  include PgSearch::Model

  multisearchable against: [:name],
    using: {
      tsearch: {
        prefix: true
      }
    }

  has_many :hackcreators
  has_many :hacks, through: :hackcreators

  validates_uniqueness_of :name
end
