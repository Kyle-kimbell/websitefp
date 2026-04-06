# GoDaddy Portal Deploy Checklist

This project is being converted from a GitHub Pages static site into a GoDaddy-hosted PHP/MySQL customer portal.

## Goal

- Keep the public marketing site.
- Replace browser-only login with real server-side login.
- Protect the wiki and future customer pages with PHP sessions.

## Before You Upload Anything

1. Buy or enable a GoDaddy hosting plan that supports:
   - PHP
   - MySQL
   - cPanel
   - SSH or File Manager access
2. Keep the current GitHub Pages site live until the PHP version is ready.
3. Do not upload `config.example.php` as your live config.

## Local Preparation

1. Copy `config.example.php` to `config.php`.
2. Fill in the real database credentials from GoDaddy.
3. Keep `config.php` out of git.

Example:

```php
<?php

return [
    'db' => [
        'host' => 'localhost',
        'port' => 3306,
        'name' => 'your_database_name',
        'user' => 'your_database_user',
        'pass' => 'your_database_password',
        'charset' => 'utf8mb4',
    ],
    'app' => [
        'session_name' => 'nvm_session',
    ],
];
```

## Database Setup

1. Open GoDaddy cPanel.
2. Create a MySQL database.
3. Create a MySQL user.
4. Assign the user to the database with full privileges.
5. Import `setup/schema.sql`.

This creates the `users` table.

## Create the First User

1. Generate a password hash locally:

```bash
php tools/hash-password.php 'ChooseAStrongPassword'
```

2. Copy the output hash.
3. Insert your first user into the database with phpMyAdmin:

```sql
INSERT INTO users (email, full_name, password_hash, role)
VALUES (
  'you@example.com',
  'Your Name',
  '$2y$10$REPLACE_WITH_HASH_OUTPUT',
  'admin'
);
```

## Upload Files to GoDaddy

Upload these items to your GoDaddy web root:

- `index.html`
- `styles.css`
- `script.js`
- `robots.txt`
- `sitemap.xml`
- `login.php`
- `logout.php`
- `config.php`
- `includes/`
- `wiki/`
- `demo/index.php`
- `login/login.css`

Do not upload:

- `.git/`
- `config.example.php`
- local-only test files

## Routing Notes

- Public site entry remains `index.html`
- Login page is `login.php`
- Protected wiki lives under `wiki/`
- `demo/index.php` redirects to `/wiki/`

If GoDaddy prefers `index.php` before `index.html` and you later want the homepage to become PHP-driven too, you can convert the public homepage later. It is not required for this first phase.

## First Live Test

1. Visit `/login.php`
2. Log in with your database-backed user
3. Confirm `/wiki/` loads
4. Confirm section pages open:
   - `/wiki/device-inventory/`
   - `/wiki/network-layout/`
   - `/wiki/customer-sops/`
   - `/wiki/maintenance/`
5. Confirm `Log Out` returns you to login

## Cutover

Once GoDaddy hosting is working:

1. Point your GoDaddy domain to the GoDaddy hosting account if needed.
2. Remove dependence on GitHub Pages.
3. Keep GitHub only as source control.

## Next Build Steps

After first deploy, the next useful upgrades are:

1. Add an admin-only page to create users.
2. Store wiki content in MySQL instead of hardcoded files.
3. Add customer accounts so users only see their own wiki.
4. Add device inventory records to the database.
