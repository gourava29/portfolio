namespace :dhobypachad do
  desc 'run NPM tests'
  task :test_js do
    puts `npm test`
  end
  task :test_rspec do
    puts `rspec`
  end
   
end

task :dhobypachad do
  Rake::Task['dhobypachad:test_js'].invoke
  Rake::Task['dhobypachad:test_rspec'].invoke
end

task :dp => :dhobypachad

