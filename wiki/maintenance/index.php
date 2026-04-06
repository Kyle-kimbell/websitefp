<?php

declare(strict_types=1);

require_once __DIR__ . '/../../includes/auth.php';
require_login();
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Maintenance | North Valley Monitoring Wiki</title>
    <meta
      name="description"
      content="Protected Maintenance page for the North Valley Monitoring customer wiki."
    />
    <link rel="stylesheet" href="../wiki.css?v=2" />
  </head>
  <body>
    <main class="wiki-shell">
      <section class="wiki-card">
        <div class="wiki-header">
          <div>
            <p class="eyebrow">North Valley Monitoring Wiki</p>
            <h1>Maintenance</h1>
            <p class="lede">
              Use this section to record recurring service work, firmware review, inspections, and follow-up actions.
            </p>
          </div>
          <div class="wiki-actions">
            <a class="button button-secondary" href="/logout.php">Log Out</a>
            <a class="text-link" href="/wiki/">Back to wiki</a>
          </div>
        </div>

        <section class="wiki-grid">
          <article class="wiki-section">
            <h2>Recurring Tasks</h2>
            <ul class="wiki-list">
              <li>Firmware and software review</li>
              <li>Camera or sensor health check</li>
              <li>Network uptime review</li>
              <li>Credential review and updates</li>
              <li>Physical inspection schedule</li>
            </ul>
          </article>
          <article class="wiki-section">
            <h2>Record Keeping</h2>
            <ul class="wiki-list">
              <li>Date completed</li>
              <li>Technician name</li>
              <li>What changed</li>
              <li>Open issues found</li>
              <li>Recommended follow-up</li>
            </ul>
          </article>
        </section>
      </section>
    </main>
  </body>
</html>
