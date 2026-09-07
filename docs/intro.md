---
id: intro
title: Introduction
sidebar_label: Introduction
description: What OpenSchool is, and where to start if you want to run or contribute to it.
---

# OpenSchool

OpenSchool is a **self-hosted school management system** built for the way
Sri Lankan schools actually run — houses, grades, streams, terms,
attendance, guardians, and the admin/teacher/student/parent roles around
them. It's a monorepo with a Go REST API backend and a React (Carbon
Design System) frontend, authenticating through
[ThunderID](https://github.com/thunderid).

It's free and open source under the [Apache License 2.0](https://github.com/openschool-org/openschool/blob/main/LICENSE) —
you run your own instance, on your own infrastructure, and you own your
data. There's no hosted version and no vendor relationship: OpenSchool
doesn't operate a service on anyone's behalf.

For what the product actually does today, see the [Features](/features)
and [Modules](/modules) pages. This documentation section covers how to
run it and how it's built.

## Getting started

New to the project? Work through these in order:

1. **[Local Development Setup](./contributing)** — clone the repo and get
   Postgres, the backend, and the frontend running locally.
2. **[ThunderID Setup](./thunderid)** — one-time identity-provider
   configuration. OpenSchool has no login system of its own; ThunderID is
   a hard dependency.
3. **[Setup Walkthrough](./setup)** — first-run admin registration, the
   school setup wizard, and a hands-on tour of every module.

Once you're up and running, [Architecture](./architecture) explains how
the pieces fit together, and the [Architecture Decision Records](./adr)
capture the *why* behind the non-obvious choices.

## Source & community

- **Source code:** [github.com/openschool-org/openschool](https://github.com/openschool-org/openschool)
- **Contributing:** see the [Local Development Setup](./contributing) guide
  and the project's `CONTRIBUTING.md` for the PR workflow.
- **Questions, issues, and security reports:** see the
  [Community](/community) page.

This project is fully maintained and operated by open source contributors;
see the
[contributors graph](https://github.com/openschool-org/openschool/graphs/contributors)
for everyone who's helped.
