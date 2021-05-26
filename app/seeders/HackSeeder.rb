# require 'faraday'
# require 'httparty'
# require 'nokogiri'
# require 'mechanize'


# def create_screenshots(hack_screenshot_url, new_hack_model)
#   screenshot_url = hack_screenshot_url.gsub("details", "images")
#   screenshot_html = HTTParty.get(screenshot_url)
#   screenshot_response = Nokogiri::HTML(screenshot_html)
#   image_array = screenshot_response.xpath("//td[.//img[contains(@alt, 'Image')]]")[3].children.css('img')

#   if image_array.length > 0 
#     image_array.each do |image|
#       screenshot_string = "https:" + image.attributes["src"].value
#       Screenshot.create(url: screenshot_string, hack: new_hack_model)
#     end
#   end
# end

# def hack_scrape (url)
#   hack_url = "https://www.smwcentral.net#{url}"
#   hack_html = HTTParty.get(hack_url)
#   hack_response = Nokogiri::HTML(hack_html)
#   age_restriction_msg = "This file contains content unsuitable for minors. Please login to confirm your age."
#   age_restricted = hack_response.content.include?(age_restriction_msg)

#   if !age_restricted
#     hack_name = hack_response.xpath('//td[contains(text(), "File Name:")]').first.parent.children[3].children[1].text
#     hack_release = hack_response.xpath('//td[contains(text(), "Added:")]').first.parent.children[3].children[1].text
#     hack_length = hack_response.xpath('//td[contains(text(), "Length:")]').first.parent.children[3].text.strip
#     hack_description = hack_response.xpath('//td[contains(text(), "Description:")]').first.parent.children[3].text.strip
#     hack_creator_names = hack_response.xpath('//td[contains(text(), "Authors:")]').first.parent.children[3].text.strip

#     new_hack = Hack.new
#     new_hack.name = hack_name
#     new_hack.length = hack_length
#     new_hack.description = hack_description
#     new_hack.date = hack_release
#     new_hack.url = hack_url
    
#     creator_names_array = hack_creator_names.split(',')
#     creator_names_array.each do |creator|
#       creator_name = creator.strip
#       one =  1
#       creator_model = Creator.find_or_create_by(name: creator_name)
#       new_hack.creators << creator_model
#     end

#     new_hack.save

#     create_screenshots(hack_url, new_hack)
#   end
# end

# def smw_central_scrape
#   [1, 2, 3, 4, 5, 6].each do |n|
#     baseUrl = "https://www.smwcentral.net/?p=section&s=smwhacks&u=0&g=0&f%5Bdifficulty%5D%5B0%5D=107&n=#{n}&o=date&d=desc"
  
#     html = HTTParty.get(baseUrl)
#     response = Nokogiri::HTML(html)
#     hack_table = response.at_css("div#list_content")
#     table_rows = hack_table.css('tr')
#     table_rows.shift

#     table_rows.each do |row|
#       hack_link = row.at_css('a')
#       hack_url = hack_link.attributes["href"].value

#       hack_scrape(hack_url)
#     end
    
#   end

# end
# smw_central_scrape
