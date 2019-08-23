class Photo < ActiveRecord::Base
  include Rails.application.routes.url_helpers
  

  has_one_attached :img
  belongs_to :imageable, polymorphic: true, optional: true
  attr_accessor :photo_contents
  attr_accessor :photo_name

  after_create :parse_photo
  validate :photo_validations, on: :create

  def img_url
    #generate url for attachement
    return rails_blob_path(self.img, disposition: "attachment", only_path: true)
  end

  def parse_photo
    # If directly uploaded
    unless self.photo_contents.nil? || self.photo_contents[/(image\/[a-z]{3,4})|(application\/[a-z]{3,4})/] == ''
      content_type = self.photo_contents[/(image\/[a-z]{3,4})|(application\/[a-z]{3,4})/]
      content_type = content_type[/\b(?!.*\/).*/]
      contents = self.photo_contents.sub /data:((image|application)\/.{3,}),/, ''
      decoded_data = Base64.decode64(contents)
      filename = self.photo_name || 'photo_' + Time.zone.now.to_s + '.' + content_type
      File.open("#{Rails.root}/tmp/images/#{filename}", 'wb') do |f|
        f.write(decoded_data)
      end
      puts "Filename is #{filename}"
      puts "file content: #{File.open("#{Rails.root}/tmp/images/#{filename}")}"
      self.img.attach(io: File.open("#{Rails.root}/tmp/images/#{filename}"), filename: filename)
      FileUtils.rm("#{Rails.root}/tmp/images/#{filename}")
    end
  end

  private

  def photo_validations
    if self.photo_contents.nil?
      errors.add(:base, I18n.t('errors.photos.file_required'))
    end
  end
end