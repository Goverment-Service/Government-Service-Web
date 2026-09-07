---
title: Automation & Watchers
icon: Bot
order: 23
group: operations
homeFeatured: false
summary: Scheduled background jobs that watch for data issues and nightly-back up the database, without sitting on any request's critical path.
---

- 15 scheduled jobs covering nightly backups, data-consistency watchers, and cleanup tasks
- Findings surface as dismissible banners on the relevant admin page, plus a central Automation panel
- Every job independently toggleable except the nightly backup, which is always on
- Runs on its own schedule or via an admin-triggered "Run now" - never as part of a page load
