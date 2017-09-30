namespace :dhobypachad do
  desc 'run NPM tests'
  task :test_js do
  	unless system 'npm test'
        exit 1
  	end
  end
  task :test_rspec do
    unless system 'rspec'
        exit 1
  	end
  end
   
end

task :dhobypachad do
  Rake::Task['dhobypachad:test_js'].invoke
  Rake::Task['dhobypachad:test_rspec'].invoke
end

task :dp => :dhobypachad

