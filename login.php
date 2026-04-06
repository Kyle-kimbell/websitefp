<?php

declare(strict_types=1);

require_once __DIR__ . '/includes/auth.php';

$user = current_user();
if ($user) {
    header('Location: /wiki/');
    exit;
}

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';

    if (attempt_login((string) $email, (string) $password)) {
        header('Location: /wiki/');
        exit;
    }

    $error = 'The email or password is not correct.';
}
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Login | North Valley Monitoring</title>
    <meta
      name="description"
      content="Sign in to access the protected North Valley Monitoring customer wiki."
    />
    <link rel="stylesheet" href="/login/login.css?v=2" />
  </head>
  <body>
    <main class="login-shell">
      <section class="login-card">
        <p class="eyebrow">North Valley Monitoring</p>
        <h1>Customer Login</h1>
        <p class="lede">
          Sign in to access the protected customer wiki and internal site records.
        </p>

        <form class="login-form" method="post" action="/login.php">
          <label for="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autocomplete="username"
            required
          />

          <label for="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autocomplete="current-password"
            required
          />
          <button class="button" type="submit">Sign In</button>
        </form>

        <p class="message <?= $error ? 'error' : '' ?>">
          <?= $error ? htmlspecialchars($error, ENT_QUOTES, 'UTF-8') : 'This login is now intended to be backed by your server and database.' ?>
        </p>

        <div class="login-actions">
          <a class="text-link" href="/">Back to site</a>
        </div>
      </section>
    </main>
  </body>
</html>
