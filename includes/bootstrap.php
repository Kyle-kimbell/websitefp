<?php

declare(strict_types=1);

$configPath = __DIR__ . '/../config.php';

if (!file_exists($configPath)) {
    http_response_code(500);
    echo 'Missing config.php. Copy config.example.php to config.php and fill in your database settings.';
    exit;
}

$config = require $configPath;

if (session_status() !== PHP_SESSION_ACTIVE) {
    session_name($config['app']['session_name'] ?? 'nvm_session');
    session_start();
}
