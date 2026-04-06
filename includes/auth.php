<?php

declare(strict_types=1);

require_once __DIR__ . '/db.php';

function current_user(): ?array
{
    $userId = $_SESSION['user_id'] ?? null;

    if (!$userId) {
        return null;
    }

    $statement = db()->prepare('SELECT id, email, full_name, role FROM users WHERE id = :id LIMIT 1');
    $statement->execute(['id' => $userId]);
    $user = $statement->fetch();

    if (!$user) {
        logout_user();
        return null;
    }

    return $user;
}

function attempt_login(string $email, string $password): bool
{
    $statement = db()->prepare('SELECT id, email, full_name, role, password_hash FROM users WHERE email = :email LIMIT 1');
    $statement->execute(['email' => strtolower(trim($email))]);
    $user = $statement->fetch();

    if (!$user) {
        return false;
    }

    if (!password_verify($password, $user['password_hash'])) {
        return false;
    }

    session_regenerate_id(true);
    $_SESSION['user_id'] = (int) $user['id'];

    return true;
}

function require_login(): array
{
    $user = current_user();

    if (!$user) {
        header('Location: /login.php');
        exit;
    }

    return $user;
}

function logout_user(): void
{
    $_SESSION = [];

    if (ini_get('session.use_cookies')) {
        $params = session_get_cookie_params();
        setcookie(
            session_name(),
            '',
            time() - 42000,
            $params['path'],
            $params['domain'],
            (bool) $params['secure'],
            (bool) $params['httponly']
        );
    }

    session_destroy();
}
