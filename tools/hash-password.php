<?php

declare(strict_types=1);

if (PHP_SAPI !== 'cli') {
    echo "Run this from the command line.\n";
    exit(1);
}

$password = $argv[1] ?? null;

if (!$password) {
    echo "Usage: php tools/hash-password.php 'YourPasswordHere'\n";
    exit(1);
}

echo password_hash($password, PASSWORD_DEFAULT) . PHP_EOL;
