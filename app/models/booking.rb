class Booking < ActiveRecord::Base

  validates :sitter_id, :dog_id, :date_start, :date_end, presence: true

  validate :validate_date

  belongs_to :dog
  belongs_to :sitter

  def validate_date
    if date_start.nil? || date_end.nil?
      errors.add(:base, "There was a problem with your dates")
    else
      unless date_start < date_end
        errors.add(:base, "Start date must be before end date")
      end
    end
  end
end
