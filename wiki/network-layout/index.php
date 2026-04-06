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
    <title>Network Layout | North Valley Monitoring Wiki</title>
    <meta
      name="description"
      content="Protected Network Layout page for the North Valley Monitoring customer wiki."
    />
    <link rel="stylesheet" href="../wiki.css?v=2" />
  </head>
  <body>
    <main class="wiki-shell">
      <section class="wiki-card">
        <div class="wiki-header">
          <div>
            <p class="eyebrow">North Valley Monitoring Wiki</p>
            <h1>Network Layout</h1>
            <p class="lede">
              Use this section to map the customer network from ISP handoff through local equipment and coverage.
            </p>
          </div>
          <div class="wiki-actions">
            <a class="button button-secondary" href="/logout.php">Log Out</a>
            <a class="text-link" href="/wiki/">Back to wiki</a>
          </div>
        </div>

        <section class="wiki-grid">
          <article class="wiki-section">
            <h2>Document</h2>
            <ul class="wiki-list">
              <li>ISP connection and handoff point</li>
              <li>Main router, switch, and rack locations</li>
              <li>Access points and bridge links</li>
              <li>Static IP assignments and VLAN notes</li>
              <li>Known weak spots or coverage gaps</li>
            </ul>
          </article>
          <article class="wiki-section">
            <h2>Outcomes</h2>
            <ul class="wiki-list">
              <li>Faster site troubleshooting</li>
              <li>Cleaner change management</li>
              <li>Better onboarding for technicians</li>
              <li>Fewer return trips</li>
              <li>More professional customer documentation</li>
            </ul>
          </article>
        </section>
      </section>
    </main>
  </body>
</html>
