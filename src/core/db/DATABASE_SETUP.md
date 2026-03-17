# Database Setup Guide

This guide explains how to set up and use the MySQL database with TypeORM in this NestJS application.

## Prerequisites

- MySQL Server installed and running
- Node.js and npm installed
- Access to MySQL with appropriate permissions

## Installation

All required dependencies are already installed. If you need to reinstall them:

```bash
npm install
```

## Configuration

1. **Copy the environment template:**

   ```bash
   cp .env.example .env
   ```

2. **Update the `.env` file with your MySQL credentials:**

   ```
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   DB_DATABASE=xfootball
   DB_SYNCHRONIZE=false
   DB_LOGGING=true
   ```

   **Important:** Never commit the `.env` file to version control as it contains sensitive information.

## Database Schema

The database includes the following tables:

- **users** - User accounts with authentication
- **projects** - Project definitions
- **sources** - Content sources (ESPN, BBC Sport, etc.)
- **consumers** - API consumers/clients
- **articles** - News articles
- **users_projects** - Many-to-many relationship between users and projects
- **projects_sources** - Many-to-many relationship between projects and sources
- **projects_consumers** - Many-to-many relationship between projects and consumers

## Database Setup - Quick Start

The easiest way to set up the database is to use the combined setup command:

```bash
npm run db:setup
```

This will:

1. Create the `xfootball` database if it doesn't exist
2. Run all migrations to create tables, indexes, and foreign keys

### Manual Setup (Step by Step)

If you prefer to run the steps individually:

1. **Create the database:**

   ```bash
   npm run db:create
   ```

2. **Run migrations (create tables):**
   ```bash
   npm run migration:run
   ```

### Revert the last migration:

```bash
npm run migration:revert
```

### Generate a new migration (after modifying entities):

```bash
npm run migration:generate -- src/db/migrations/MigrationName
```

### Create an empty migration:

```bash
npm run migration:create -- src/db/migrations/MigrationName
```

## Seeding the Database

After running migrations, you can populate the database with sample data:

```bash
npm run seed
```

This will create:

- 5 sample users
- 3 sample projects
- 3 sample sources (ESPN, BBC Sport, Goal.com)
- 3 sample consumers
- 10 sample articles
- All necessary relationships between entities

## Starting the Application

After the database is set up, you can start the application:

```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod
```

## Entity Relationships

```
Users ←→ Projects (many-to-many)
Projects ←→ Sources (many-to-many)
Projects ←→ Consumers (many-to-many)
Projects → Articles (one-to-many)
Sources → Articles (one-to-many)
```

## Troubleshooting

### Connection Issues

If you encounter connection errors:

1. Verify MySQL is running: `mysql -u root -p`
2. Check credentials in `.env` file
3. Ensure the database user has appropriate permissions

### Migration Errors

If migrations fail:

1. Check if the database already exists
2. Verify database user permissions
3. Review the migration logs for specific errors

### Seeder Errors

If seeding fails:

1. Ensure migrations have been run first
2. Check database connection
3. Review console output for specific errors

## Production Considerations

Before deploying to production:

1. **Set `DB_SYNCHRONIZE=false`** in production `.env`
2. **Disable logging** by setting `DB_LOGGING=false`
3. Use strong passwords for database users
4. Use environment-specific configuration
5. Run migrations as part of deployment process
6. Don't use the seeder in production (it's for development only)

## Available Scripts

- `npm run db:create` - Create the database (xfootball)
- `npm run db:setup` - Create database and run migrations (one command setup)
- `npm run migration:run` - Run pending migrations
- `npm run migration:revert` - Revert last migration
- `npm run migration:generate` - Generate migration from entity changes
- `npm run migration:create` - Create empty migration file
- `npm run seed` - Populate database with sample data
- `npm run start:dev` - Start development server

## Entity Status Enums

Most entities have a status field with these values:

- `new` - Newly created, not yet activated
- `active` - Currently active and in use
- `stopped` - Deactivated or archived

Articles have:

- `new` - Draft or unpublished
- `published` - Published and visible

## Password Hashing

In production, remember to properly hash passwords before storing them. The seeder uses placeholder hashed values. Consider using bcrypt:

```bash
npm install bcrypt
npm install -D @types/bcrypt
```

Then implement proper password hashing in your user service.
