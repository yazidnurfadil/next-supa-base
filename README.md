# Next + Supabase Biolerplate

A multi-tenancy boilerplate project to get started with Next.js and Supabase

## Getting Started

### Install dependencies

```bash
bun install
```

### Migrate & seed the database

```bash
bun db:reset:seed
```

### Run the development server

```bash
bun dev
```

## Other Commands

### Build the project

```bash
bun build
```

### Start the production server

```bash
bun start
```

### Generate types from database

```bash
bun db:gentypes
```

### Migrate database schema

```bash
bun db:migrate
```

### Seed the database

```bash
bun db:seed
```

### Reset the database

```bash
bun db:reset
```

### Reset -> migrate -> seed the database

```bash
bun db:reset
```

### Clean Supabase

```bash
bun db:nuke
```

### Run Storybook

```bash
bun storybook
```

### Lint

```bash
bun lint
```

### Format

```bash
bun format
```

## Accounts

### Super User

```
email: super@example.com
password: superpassword123
```

### Owner Users

```
email: user1@example.com
password: password123

email: user2@example.com
password: password123
```

## Features

- **Personal accounts**: Every user that signs up using Supabase auth automatically gets their own personal account.
  Billing on personal accounts can be enabled/disabled.
- **Team accounts**: Team accounts are billable accounts that can be shared by multiple users. Team accounts can be
  disabled if you only wish to allow personal accounts. Billing on team accounts can also be disabled.
- **Permissions**: Permissions are handled using RLS, just like you're used to with Supabase. Basejump provides
  convenience methods that let you restrict access to rows based on a user's account access and role within an account
- **Billing**: Basejump provides out of the box billing support for Stripe, but you can add your own providers easily.
  If you do, please consider contributing them so others can benefit!
- **Testing**: Basejump is fully tested itself, but also provides a suite of testing tools that make it easier to test
  your own Supabase functions and schema. You can check it out
  at [database.dev/basejump/supabase_test_helpers](https://database.dev/basejump/supabase_test_helpers). You do not need
  to be using Basejump to use the testing tools.
