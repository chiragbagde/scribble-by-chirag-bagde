# Scribble

A full-stack blogging platform built during my internship at BigBinary. Supports article creation, categories, versioning, and role-based publishing workflows.

Reached 97% test coverage through unit and integration tests.

**Stack**

Ruby on Rails · React · Tailwind CSS · PostgreSQL · Webpack

**Setup**

```bash
git clone https://github.com/chiragbagde/scribble-by-chirag-bagde.git
cd scribble-by-chirag-bagde
bundle install
rails db:create db:migrate
./bin/webpack-dev-server &
rails s
```

**Features**

- Create, edit, and publish articles with rich text
- Organize content by categories
- Filter articles by status, category, and title, and sort by title/status/date (`?sort_by=&sort_order=`)
- Draft and publish workflow with version history
- Role-based access for authors and admins
- 97% test coverage
