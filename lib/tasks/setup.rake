desc 'drops the db, creates db, migrates db and populates sample data'
task setup: [:environment, 'db:drop', 'db:create', 'db:migrate'] do
 Rake::Task['populate_with_sample_data'].invoke if Rails.env.development?
end

task populate_with_sample_data: [:environment] do
  if Rails.env.production?
    puts "Skipping deleting and populating sample data in production"
  else
    create_sample_data!
    puts "Sample data has been added."
  end
end

def create_sample_data!
  puts "Seeding sample data..."
  create_sample_user_data!
  create_sample_organisation_data!
  create_sample_category_data!
  create_sample_article_data!
  create_sample_redirection_data!
end

def create_sample_user_data!
  puts "Seeding with sample user..."
  User.create!(
    name: 'Oliver Smith',
    email: 'oliver@example.com'
  )
  puts "Done! site is created successfully."
 end

def create_sample_organisation_data!
  puts "Seeding with sample user..."
  Organisation.create!(
    site_name: 'spinkart',
    status: 'checked',
    password: 'welcome1'
  )
  puts "Done! site is created successfully."
end

def create_sample_category_data!
  puts "Seeding with sample category..."
  Category.create!(
    category: "General",
    assigned_organisation_id: 1
  )
  puts "Done! category is created successfully"
end

def create_sample_article_data!
  puts "Seeding with sample article..."
  Article.create!(
    title: "Scribble",
    description: "Hello world",
    status: "Published",
    author: "Oliver Smith",
    assigned_organisation_id: 1,
    assigned_category_id: 1
  )
  puts "Done! article is created successfully."
end

def create_sample_redirection_data!
  puts "Seeding with sample user..."
  Redirection.create!(
    old_url: '/1',
    new_url: '/2',
    assigned_organisation_id: 1
  )
  puts "Done! redirection is created successfully."
 end
