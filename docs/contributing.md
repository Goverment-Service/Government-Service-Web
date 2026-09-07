---
id: contributing
title: Local Development Setup
sidebar_label: Local Development Setup
---

This guide walks through setting up the full local development environment for the **Government Service Navigator (GSN)** — the .NET Backend, React Dashboard, Flutter Mobile App, and Postgres database.

## Prerequisites

Install the following tools before starting:

- [Git](https://git-scm.com/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (for local database)
- [.NET SDK (8.0+ recommended)](https://dotnet.microsoft.com/en-us/download)
- [Node.js (18+ recommended)](https://nodejs.org/)
- [Flutter SDK](https://docs.flutter.dev/get-started/install)

Optional but useful tools:
- PostgreSQL client (e.g., pgAdmin, psql, DBeaver)
- Code Editor: Visual Studio Code, JetBrains Rider, or Visual Studio 2022

---

## 1. Clone the repository

```bash
git clone https://github.com/Krishmal2004/Government_Service_Navigator.git
cd Government_Service_Navigator
```

## 2. Start the database (PostgreSQL)

From the repository root, start the Postgres container in detached mode:

```bash
docker compose up -d
```

This starts the database instance required for the backend API and AI agent data storage.

---

## 3. Backend API Setup (.NET Core)

The backend powers the entire system, including the AI orchestrator agents.

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. **Configure Environment:** Create or modify `appsettings.Development.json` to include your Postgres connection string and any necessary API keys (like LLM provider keys for the Agent layer in `GSN.Agents`).

3. **Restore & Build:**
   ```bash
   dotnet restore
   dotnet build
   ```

4. **Apply Migrations:**
   Ensure the database schema is created:
   ```bash
   dotnet ef database update --project src/GSN.Infrastructure --startup-project src/GSN.Api
   ```
   *(Note: If `dotnet ef` is not installed, run: `dotnet tool install --global dotnet-ef`)*

5. **Run the API:**
   ```bash
   dotnet run --project src/GSN.Api
   ```
   The API will be available at `https://localhost:7xxx` or `http://localhost:5xxx` depending on your `launchSettings.json`.

---

## 4. Web Dashboard Setup (React)

The React web application is the control panel for Verifying Officers and Administrators.

1. Navigate to the web directory:
   ```bash
   cd web
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment:** Create a `.env` file in the `web` folder to point to your local .NET API:
   ```env
   VITE_API_BASE_URL=http://localhost:5000
   ```

4. **Run the Dashboard:**
   ```bash
   npm run dev
   ```
   The dashboard runs on `http://localhost:5173`.

---

## 5. Mobile App Setup (Flutter)

The Flutter mobile app is the portal for Citizens and Applicants.

1. Navigate to the mobile directory:
   ```bash
   cd mobile
   ```

2. **Fetch packages:**
   ```bash
   flutter pub get
   ```

3. **Run the App:**
   ```bash
   flutter run
   ```

Make sure your target device (iOS Simulator or Android Emulator) is running.
*Note: Android emulators often use `10.0.2.2` instead of `localhost` to connect to your host machine's API.*

---

## Development Workflow & Tests

If you are contributing code, always run the associated tests before submitting a Pull Request:

**Backend/API Tests**
```bash
cd backend
dotnet test
```

**Agent AI Tests (Golden Cases)**
```bash
cd backend
dotnet test tests/GSN.Agents.Tests
```

**Web Tests**
```bash
cd web
npm test
```

**Flutter Mobile Tests**
```bash
cd mobile
flutter test
```

For major architectural changes, please submit an Architecture Decision Record (ADR) in `docs/adr/`.
