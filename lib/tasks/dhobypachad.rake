namespace :dhobypachad do
  desc 'run NPM tests'
  task :test_js do
  	unless system 'npm test'
        exit
  	end
  end
  task :test_rspec do
    unless system 'rspec'
        exit
  	end
  end
   
end

task :dhobypachad do
  Rake::Task['dhobypachad:test_js'].invoke
  Rake::Task['dhobypachad:test_rspec'].invoke
end

task :dp => :dhobypachad

