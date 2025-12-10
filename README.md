# UB Club Management System

A modern web application for managing student clubs at the University of Belize. Built as a prototype for the Human-Computer Interface course.

## Purpose & Use Cases

### Context
The University of Belize (UB) currently lacks a centralized digital platform for managing student club activities. Students rely on physical bulletin boards, word-of-mouth, and fragmented social media groups to discover and join clubs. This creates barriers to student engagement and makes it difficult for club administrators to manage memberships efficiently.

### Target Users
1. **Students** - Anyone seeking to discover campus clubs, join organizations that match their interests, stay informed about club activities, and engage with club content
2. **Club Administrators** - Faculty, Staff, or student leaders who need to manage membership requests, communicate with members, and coordinate club activities
3. **Campus Organizations** - Student affairs offices and campus activity coordinators who oversee club operations

### Primary Use Cases
- **Club Discovery**: Students can browse available clubs, search for specific interests, and learn about each club's mission and activities
- **Membership Management**: Students submit join, create, or update club requests; administrators review and process applications efficiently with filtering and bulk action capabilities
- **Community Engagement**: Members view activity feeds with club announcements, updates, and discussions
- **Event Coordination**: Clubs post upcoming events that members can discover and plan to attend
- **Administrative Oversight**: Administrators access dashboards with statistics and analytics about club membership and requests

This prototype demonstrates how a digital platform can streamline club management, increase student engagement, and reduce administrative overhead at the University of Belize or similar educational institutions.

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

- **Framework**: [Next.js (React Framework)](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: TypeScript
- **Icons**: [Lucide React](https://lucide.dev/)
- **State**: React Context + localStorage (for demo purposes)

## Installation Requirements

### System Requirements
This prototype is designed to run with minimal installation requirements:

**Required Software:**
- **Node.js** (version 18.0 or higher) - [Download from nodejs.org](https://nodejs.org/)
  - Node.js includes npm (Node Package Manager) automatically
  - To verify installation, run: `node --version` and `npm --version`

**Optional:**
- **Git** - For cloning the repository (alternatively, download as ZIP from GitHub)
- A modern web browser (Chrome, Firefox, Safari, or Edge)

**No Additional Software Required:**
- No database installation needed (uses browser localStorage)
- No backend server setup required
- No authentication service configuration
- No third-party API keys or credentials

### Installation Steps

**Step 1: Obtain the Source Code**

Option A - Using Git:
```bash
git clone https://github.com/2016114132/ub-club-management.git
cd ub-club-management
```

Option B - Direct Download:
1. Visit https://github.com/2016114132/ub-club-management
2. Click "Code" → "Download ZIP"
3. Extract the ZIP file
4. Open a terminal/command prompt in the extracted folder

**Step 2: Install Project Dependencies**
```bash
npm install
```
This downloads all required packages (~200MB). Internet connection required for first-time setup only.

**Step 3: Start the Application**
```bash
npm run dev
```
The development server will start on port 3000.

**Step 4: Access the Application**
Open your web browser and navigate to:
```
http://localhost:3000
```

The application should load immediately with no additional configuration needed.

## Operating Instructions

### Getting Started with the Application

1. **Launch the Application**
   - After starting the development server (`npm run dev`), navigate to http://localhost:3000
   - You will be directed to the landing page
   - Click on "Sign In" to be directed to the login page

2. **Select Your Role**
   - This prototype uses simulated authentication for demonstration purposes
   - Choose either **Student** or **Admin** role on the login page
   - No username or password required - simply click your desired role

### Using the Application as a Student

**Discovering Clubs:**
1. From the homepage, click "Explore Clubs" or navigate to "Clubs" in the navigation bar
2. Browse through available clubs or use the search functionality
3. Click on any club card to view detailed information about the club

**Joining a Club:**
1. Navigate to a club's detail page
2. Click the "Join This Club" button
3. Fill out the membership request form with:
   - Your Student ID & Full Name
4. Submit the form - your request will be sent to administrators for review

**Viewing Your Clubs:**
1. Click "My Clubs" in the navigation bar to see clubs you've joined
2. Access each club's page directly from this view

**Engaging with Content:**
1. Navigate to "Feed" to view posts from all clubs
2. Click on "+ Post" to share updates (if you're a club member)
3. View "Events" to see upcoming club activities

### Using the Application as an Administrator

**Accessing the Dashboard:**
1. After selecting "Administrator" role, you'll see the admin dashboard
2. View statistics including:
   - Total pending requests
   - Number of active clubs
   - Total number of posts
   - Total number of events
   - Recent requests

**Managing Membership Requests:**
1. Once signed in as "Administrator", Navigate to "Requests" from the navigation bar
2. View all pending membership requests in a table format
3. Use filters to narrow down requests by:
   - Student name or ID
   - Request type
   - Request status 
   - Date range

**Processing Individual Requests:**
1. Review each request's details 
2. Click the green "Approve" button to approve a request
3. Click the red "Deny" button to deny a request
4. Confirm your action in the modal that appears

**Using Bulk Actions:**
1. Select multiple requests using the checkboxes in each row
2. Use "Approve All" or "Deny All" buttons to process multiple requests at once
3. Confirm your action in the modal that appears

### Role Switching

- To switch roles, simply sign out and choose a different role from the login screen.

### Data Management

**Resetting the Application:**
- If you need to restore the application to its initial state, look for the "Reset Data" button in the bottom right of the screen
- This clears all changes and restores default clubs, events, and sample data
- Useful for demonstrations or testing scenarios

**Data Persistence:**
- All changes (new requests, posts, club memberships) are saved automatically in your browser's localStorage
- Data persists across sessions until you clear browser data or reset the application
- Each browser maintains separate data (e.g., Chrome and Firefox will have independent datasets)

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

## Troubleshooting

### Installation Issues

**Problem**: Port 3000 is already in use
- **Solution**: Either stop the application using port 3000, or run on a different port: `npm run dev -- -p 3001`

**Problem**: Module not found errors after installation
- **Solution**: Delete the `node_modules` folder and `package-lock.json`, then run `npm install` again

### Runtime Issues

**Problem**: Page not loading or showing blank screen
- **Solution**: Check browser console for errors (F12), clear browser cache, or try a different browser

**Problem**: Data disappeared after closing browser
- **Solution**: Some browsers clear localStorage in private/incognito mode. Use normal browsing mode.

**Problem**: Changes not appearing
- **Solution**: The dev server may need restart. Stop the server (Ctrl+C) and run `npm run dev` again

**Problem**: Styles look broken
- **Solution**: Ensure Tailwind CSS compiled correctly. Try stopping and restarting the dev server.

### For Additional Help
- Check the browser console (F12) for error messages
- Ensure you're using Node.js 18 or higher: `node --version`
- Verify all dependencies installed correctly: `npm list`
- Try clearing browser cache and localStorage

## Limitations of the Implementation

As a prototype, this application has several limitations that would need to be addressed before production deployment:

### Authentication & Security
- **No Real Authentication**: Uses simulated role selection instead of actual login credentials
- **No User Verification**: No email confirmation, password requirements, or account security features
- **No Authorization Checks**: Role-based access control is UI-only without backend enforcement
- **No Session Management**: No timeout, token refresh, or secure session handling
- **Security Risk**: All data is stored in browser localStorage, which is accessible via browser developer tools

### Data Management
- **No Backend Database**: All data stored in browser localStorage (limited to ~5-10MB depending on browser)
- **Data Not Synchronized**: Each user's browser has independent data; no shared database
- **No Data Persistence**: Clearing browser data or using a different browser/device loses all information
- **Limited Scalability**: Cannot handle large numbers of users, clubs, or historical data
- **No Backup/Recovery**: No mechanism to backup or restore data if lost

### Functional Limitations
- **No Real-Time Updates**: Changes made by one user are not visible to others (no WebSocket or polling)
- **No Email Notifications**: Users don't receive notifications about request approvals or new content
- **Limited Search**: Basic string matching only; no advanced search filters or full-text search
- **No File Uploads**: Cannot upload club logos, event flyers, or profile pictures
- **No Rich Media**: Posts support text only; no image, video, or document attachments
- **Static Event Management**: Events are display-only; no RSVP functionality or calendar integration
- **No Reporting**: Limited analytics; no comprehensive reports or data export beyond basic CSV

### User Experience
- **No Mobile App**: Web-based only; no native iOS/Android applications
- **Limited Accessibility**: Basic accessibility features; not fully WCAG compliant
- **No Internationalization**: English only; no multi-language support
- **Basic Responsive Design**: Optimized for common screen sizes but may have issues on unusual displays

### Administrative Features
- **No Role Management**: Only two roles (Student/Admin); cannot create custom roles or permissions
- **No Audit Trail**: No logging of who made changes or when
- **No User Management**: Cannot ban users, reset passwords, or manage accounts
- **Limited Club Management**: Cannot delete clubs, transfer ownership, or archive inactive clubs
- **No Moderation Tools**: Cannot flag inappropriate content or moderate posts

### Technical Limitations
- **Development Server Only**: Running on Next.js development server; not production-optimized
- **No Load Balancing**: Single-threaded; cannot handle high concurrent traffic
- **No Caching Strategy**: No CDN, Redis, or caching layer for performance
- **No Error Handling**: Limited error boundaries and fallback mechanisms
- **No Testing Suite**: No automated tests for quality assurance
- **No CI/CD Pipeline**: Manual deployment process; no automated testing or deployment

### Integration Limitations
- **No External Integrations**: Cannot connect to university student information systems, email servers, or calendar systems
- **No Payment Processing**: Cannot handle club fees or event ticket sales
- **No Social Media Integration**: Cannot share content to external platforms or import data

Despite these limitations, this prototype successfully demonstrates the core user interface concepts, user workflows, and key features needed for a club management system.

---

## About This Project

This prototype was developed as part of the Human-Computer Interface (CMPS3141) course at the University of Belize. It demonstrates user-centered design principles, interface design best practices, and modern web development techniques.

**Course**: CMPS3141 - Human Computer Interface  
**Institution**: University of Belize  
**Semester**: 2025-1  
**Project Type**: Prototype

The application showcases how thoughtful interface design can improve user experience in administrative and student-facing systems. While not production-ready, it serves as a proof-of-concept for modernizing student organization management at educational institutions.
