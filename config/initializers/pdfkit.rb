PDFKit.configure do |config|
  config.wkhtmltopdf = `which wkhtmltopdf`.to_s.strip
  config.default_options = {
    :encoding=>"UTF-8",
    :page_size=>"A4",
    :margin_top=>"0in",
    :margin_right=>"0in",
    :margin_bottom=>"0in",
    :margin_left=>"0in",
    :disable_smart_shrinking=>false
  }
end