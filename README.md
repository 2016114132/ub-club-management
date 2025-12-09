# UB Club Management System

A modern web application for managing student clubs at the University of Belize. Built as a prototype for the Human-Computer Interface course.

## Overview

UB Clubs allows students to discover, join, and engage with campus clubs. Administrators can manage membership requests and oversee club activities.

## Features

### For Students
- **Discover Clubs** - Browse and search available clubs
- **Join Clubs** - Submit membership requests with a simple form
- **Activity Feed** - See posts and updates from your clubs
- **Events** - View upcoming club events and activities
- **My Clubs** - Quick access to clubs you're a member of

### For Administrators
- **Dashboard** - Overview of pending requests and statistics
- **Request Management** - Approve or deny membership requests
- **Bulk Actions** - Process multiple requests at once

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: TypeScript
- **Icons**: [Lucide React](https://lucide.dev/)
- **State**: React Context + localStorage (for demo purposes)

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository (development branch)
```bash
git clone -b development https://github.com/2016114132/ub-club-management.git
cd ub-club-management
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Demo Accounts

This is a prototype with simulated authentication:

- **Student**: Browse clubs, join clubs, create posts, view events
- **Admin**: Manage membership requests, view dashboard

Select your role on the login page to explore the different experiences.

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── admin/          # Admin dashboard & requests
│   ├── clubs/          # Club listing & details
│   ├── events/         # Events page
│   ├── feed/           # Activity feed
│   ├── login/          # Login page
│   ├── my-clubs/       # User's clubs
│   └── profile/        # User profile
├── components/         # React components
│   ├── admin/          # Admin-specific components
│   ├── clubs/          # Club-related components
│   ├── layout/         # Layout components (Navbar, Sidebar, etc.)
│   ├── posts/          # Post-related components
│   └── ui/             # Reusable UI components
├── context/            # React Context providers
├── lib/                # Utilities and data
│   └── data/           # Mock data for demo
└── types/              # TypeScript type definitions
```

## Design

The UI follows a clean, modern design with:
- Primary color: Purple (#6B2D5B)
- Accent color: Gold (#D4A843)
- Responsive layout for desktop and mobile
- Accessible components with proper focus states

## Notes

- This is a **prototype/demo** application for educational purposes
- Data is stored in localStorage and can be reset using the "Reset Data" button
- No actual backend or database - all data is simulated
