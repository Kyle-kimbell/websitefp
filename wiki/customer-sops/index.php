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
    <title>Customer SOP's | North Valley Monitoring Wiki</title>
    <meta
      name="description"
      content="Protected Customer SOP's page for the North Valley Monitoring customer wiki."
    />
    <link rel="stylesheet" href="../wiki.css?v=2" />
  </head>
  <body>
    <main class="wiki-shell">
      <section class="wiki-card">
        <div class="wiki-header">
          <div>
            <p class="eyebrow">North Valley Monitoring Wiki</p>
            <h1>Customer SOP's</h1>
            <p class="lede">
              Use this section to document what the customer should do during normal use, alerts, outages, and escalations.
            </p>
          </div>
          <div class="wiki-actions">
            <a class="button button-secondary" href="/logout.php">Log Out</a>
            <a class="text-link" href="/wiki/">Back to wiki</a>
          </div>
        </div>

        <section class="wiki-grid">
          <article class="wiki-section">
            <h2>Suggested SOPs</h2>
            <ul class="wiki-list">
              <li>How to verify systems are online</li>
              <li>What to do when an alert triggers</li>
              <li>Who to contact for support</li>
              <li>How to power cycle approved devices</li>
              <li>When to escalate to North Valley Monitoring</li>
            </ul>
          </article>
          <article class="wiki-section">
            <h2>Audience</h2>
            <ul class="wiki-list">
              <li>Owners and managers</li>
              <li>On-site operators</li>
              <li>Maintenance staff</li>
              <li>Service technicians</li>
              <li>Future customer contacts</li>
            </ul>
          </article>
        </section>
      </section>
    </main>
  </body>
</html>
