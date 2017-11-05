class DownloadsController < ApplicationController
  def show
    respond_to do |format|
      format.pdf { send_resume_pdf }
    end
  end
 
  private
 
  def resume_pdf
    user = User.find(params[:user_id])
    ResumePDF.new(user)
  end
 
  def send_resume_pdf
    send_file(resume_pdf.to_pdf, {
      filename: resume_pdf.filename,
      type: "application/pdf",
      disposition: "attachment"})
  end
end
