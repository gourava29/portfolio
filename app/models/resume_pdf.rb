require "render_anywhere"
 
class ResumePDF
  include RenderAnywhere
 
  def initialize(user)
    @user = user
    @technologies = user.skills.map{|skill| skill.technologies.map{|technology| technology.serializable_hash}}.flatten
  end
 
  def to_pdf
    kit = PDFKit.new(as_html)
    kit.to_file("#{Rails.root}/public/resume.pdf")
  end
 
  def filename
    "Resume_of_#{@user.name.gsub(/\s+/, "_")}.pdf"
  end
 
  private
 
    attr_reader :user
    attr_reader :technologies
    def as_html
      render template: "resumes/pdf", layout: "resume_pdf", locals: { user: user, technologies: technologies }
    end
end