![hero](github.png)

<p align="center">
	<h1 align="center"><b>Gonurse</b></h1>
<p align="center">
   <strong>Modern telemedicine platform for virtual consultations and health monitoring.</strong>
</p>
</p>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Introduction](#introduction)
- [Features](#features)
- [Architecture](#architecture)
  - [Tech Stack](#tech-stack)
  - [Hosting](#hosting)
  - [Services](#services)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Deployment](#deployment)
- [Other links](#other-links)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction

Welcome to **Gonurse**, a cutting-edge telemedicine platform designed to connect patients and healthcare providers seamlessly. Gonurse offers a modern and intuitive interface for virtual consultations, health monitoring, and medical record management.

This repository contains both, backend, frontend and mobile source code, destined to manage all main features of the platform.

## Features

- **Virtual Consultations**: Secure video conferencing between patients and healthcare providers.
- **Health Monitoring**: Track and record vital health metrics.
- **Medical Record Management**: Secure storage and easy access to patient medical histories.
- **User Authentication**: Secure login and user management system.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Modern UI/UX**: Based on the color scheme with hexadecimal code `#8167EC`.

## Architecture

Gonurse is built using a modern tech stack that includes Next.js, Supabase, Prisma, and Trigger.dev. The frontend is built with Next.js, while the backend is also built with Next.js and uses Supabase for the database and Prisma for ORM. Trigger.dev is used for background jobs, and Better-auth is used for authentication.

### Tech Stack

- [Next.js](https://nextjs.org) (frontend and backend)
- [Postgres](https://postgresql.org) (database)
- [Redis](https://upstash.com) (cache)
- [Better Auth](https://betterauth.com) (authentication)
- [Tailwindcss](https://tailwindcss.com) (styles)
- [Shadcn](https://shadcn.com) (components)
- [Payload](https://payloadcms.com) (cms)

### Hosting

- [Supabase](https://supabase.com) (database, storage, realtime)
- [Vercel](https://vercel.com/home) (Website, edge-config, and metrics)
- [Upstash](https://upstash.com) (redis)

### Services

- [Trigger.dev](https://trigger.dev) (background jobs)
- [Betterstack](https://betterstack.com) (logs)
- [OpenPanel](https://openpanel.dev) (observability)
- [Stream](https://getstream.io) (video-chat)
- [Resend](https://resend.io) (email)
- [Anthropic](https://anthropic.com) (AI)
- [Polar](https://polar.sh) (Payments)

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16.x or later)
- npm or yarn
- PostgresQL (for local development)
- Docker (optional, for containerized setup)

### Installation

1. **Clone the repository**:

   ```bash
   git clone 
   cd gonurse
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   Create a `.env` file for each app:

   ```bash
    NODE_ENV=development
    PORT=3000
    NEXT_PUBLIC_BASE_URL=http://localhost:3000

    DATABASE_URL="postgresql://postgres:123456@localhost:6543/postgres"
    DIRECT_URL="postgresql://postgres:123456@localhost:6543/postgres"

    UPSTASH_REDIS_REST_TOKEN=your-upstash-token
    UPSTASH_REDIS_REST_URL=https://subdomain.upstash.io

    VOYAGE_API_KEY=your-voyage-key
    ANTHROPIC_API_KEY=your-anthropic-key

    RESEND_API_KEY=your-resend-key

    BETTER_AUTH_SECRET="secret-phrase"

    FACEBOOK_CLIENT_SECRET=facebook-secret
    FACEBOOK_CLIENT_ID=facebook-client-id
    GOOGLE_CLIENT_SECRET=google-secret
    GOOGLE_CLIENT_ID=google-client-id

    TRIGGER_SECRET_KEY=trigger-secret-key
    TRIGGER_PROJECT_ID=trigger-project-id

    NEXT_PUBLIC_STREAM_CLIENT_SECRET=stream-secret
    NEXT_PUBLIC_STREAM_CLIENT_KEY=stream-key

    NEXT_PUBLIC_OPENPANEL_CLIENT_ID=open-panel-key
    NEXT_PUBLIC_OPENPANEL_CLIENT_SECRET=open-panel-secret

    BETTER_STACK_API_KEY=better-stack-key
    BETTER_STACK_URL=https://in.logs.betterstack.com
    LOGTAIL_SOURCE_TOKEN=logtail-token

    NEXT_PUBLIC_SUPABASE_URL=https://subdomain.supabase.co
    NEXT_PUBLIC_SUPABASE_KEY=supabase-key

    DEEPSEEK_API_KEY=deepseek-key

   ```

4. **Run the development server**:

   ```bash
   npm run dev -w $app
   ```

   Open [http://localhost:$port](http://localhost:3000) with your browser to see the result.

### Deployment

Gonurse is designed to be deployed on Vercel, but you can deploy it on any platform that supports Node.js.

1. **Deploy to Vercel**:

   - Sign in to your [Vercel](https://vercel.com/) account.
   - Link your repository and import your project.
   - Set up the environment variables in the Vercel dashboard.
   - Deploy your project.

# Docs

- [Gitflow Diagram](docs/gitflow-diagram.md)
- [ER Diagram](docs/er-diagram.md)
