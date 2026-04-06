<?php

declare(strict_types=1);

require_once __DIR__ . '/../includes/auth.php';
require_login();
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>North Valley Monitoring Wiki</title>
    <meta
      name="description"
      content="Protected North Valley Monitoring wiki for customer documentation, system notes, and service references."
    />
    <link rel="stylesheet" href="wiki.css?v=2" />
  </head>
  <body>
    <main class="wiki-shell">
      <section class="wiki-card">
        <div class="wiki-header">
          <div>
            <p class="eyebrow">North Valley Monitoring</p>
            <h1>Customer Wiki</h1>
            <p class="lede">
              This protected space is the starting point for customer guides,
              installation records, troubleshooting notes, and service history.
            </p>
          </div>
          <div class="wiki-actions">
            <a class="button button-secondary" href="/logout.php">Log Out</a>
            <a class="text-link" href="/">Back to site</a>
          </div>
        </div>

        <section class="wiki-intro">
          <article class="wiki-panel wiki-panel-hero">
            <span class="panel-label">Status</span>
            <strong class="panel-value">Wiki foundation ready</strong>
            <span class="panel-meta">
              Signed in users now land here instead of the old live sensor page.
            </span>
          </article>
          <article class="wiki-panel">
            <span class="panel-label">Purpose</span>
            <strong class="panel-value panel-value-small">Operations and support knowledge</strong>
            <span class="panel-meta">
              Build out customer-specific pages, equipment notes, passwords, maps,
              and maintenance records from here.
            </span>
          </article>
        </section>

        <section class="wiki-grid">
          <a class="wiki-link-card" href="/wiki/device-inventory/">
            <span class="section-kicker">Section 01</span>
            <h2>Device Inventory</h2>
            <p class="section-copy">
              Track installed equipment, serial numbers, locations, IPs, and support notes.
            </p>
            <span class="card-link-text">Open section</span>
          </a>

          <a class="wiki-link-card" href="/wiki/network-layout/">
            <span class="section-kicker">Section 02</span>
            <h2>Network Layout</h2>
            <p class="section-copy">
              Document internet handoff, routers, switches, wireless bridges, and site connectivity.
            </p>
            <span class="card-link-text">Open section</span>
          </a>

          <a class="wiki-link-card" href="/wiki/customer-sops/">
            <span class="section-kicker">Section 03</span>
            <h2>Customer SOP's</h2>
            <p class="section-copy">
              Capture operating procedures, alert response steps, and who the customer should call.
            </p>
            <span class="card-link-text">Open section</span>
          </a>

          <a class="wiki-link-card" href="/wiki/maintenance/">
            <span class="section-kicker">Section 04</span>
            <h2>Maintenance</h2>
            <p class="section-copy">
              Keep recurring maintenance, firmware reviews, inspections, and follow-up records in one place.
            </p>
            <span class="card-link-text">Open section</span>
          </a>
        </section>
      </section>
    </main>
  </body>
</html>
