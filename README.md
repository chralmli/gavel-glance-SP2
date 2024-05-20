# Semester Project 2: Auction Website

[https://gavelglance.netlify.app/#home]

This project is a front-end auction website built using [your chosen CSS framework] and Vite.js. It allows users to create listings, bid on items, and manage their credits.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [User Stories](#user-stories)
- [Technical Restrictions](#technical-restrictions)
- [Approved Resources](#approved-resources)
- [Setup & Running Locally](#setup--running-locally)
- [Testing](#testing)
- [Project Management](#project-management)
- [Deployment](#deployment)

## Project Overview

This auction website connects to the Noroff API to provide a platform for users to buy and sell items. Registered users receive 1000 credits initially. Unregistered users can browse listings, but only registered users can bid.

## Features

- **User Authentication:**
    - Registration for users with stud.noroff.no email addresses
    - Login/logout functionality
    - Avatar update
    - Credit balance display
- **Listing Management:**
    - Creation of listings with title, deadline, media, and description
- **Bidding:**
    - Adding bids to other users' listings
    - Viewing bids made on a listing
- **Searching:**
    - Unregistered users can search listings
- **Additional Features (Optional):**
    - Filter by recently created, ending soon, and by amount of bids

## User Stories

- As a user with a stud.noroff.no email, I can register for an account.
- As a registered user, I can log in and out of my account.
- As a registered user, I can update my avatar image.
- As a registered user, I can view my total credit balance.
- As a registered user, I can create a listing with a title, deadline, media, and description.
- As a registered user, I can add a bid to another user's listing.
- As a registered user, I can view all bids made on a specific listing.
- As an unregistered user, I can search through listings to find items of interest.

## Technical Restrictions

- **CSS Framework:** [Tailwind CSS] (version > [3.4.3])
- **Static Host:** Netlify
- **Design Application:** [Figma]
- **Planning Application:** [Kanban Board & Gantt Chart]

## Approved Resources

- **CSS Processors:** Tailwind CSS, PostCSS
- **Hosting Services:** Netlify
- **Design Applications:** Adobe XD, Figma, Sketch
- **Planning Applications:** Trello, GitHub Projects

## Setup & Running Locally

1. **Clone the repository:** `git clone [https://github.com/chralmli/gavel-glance-SP2]`
2. **Install dependencies:** `npm install`
3. **Start development server:** `npm run dev`

## Testing

- **Unit Tests:** Run `npm run test:unit` to execute Jest unit tests.
- **End-to-end Tests:** Run `npm run test:e2e` to execute Cypress end-to-end tests.

## Project Management

- **Gantt Chart:** [[Link to your Gantt chart](https://app.teamgantt.com/projects/gantt?ids=3932185)]
- **Design Prototype:** [[Link to your design prototype](https://www.figma.com/proto/palCV8vPByLAx7UNvjQMiD/Auction-WebsitePrototype?page-id=0%3A1&type=design&node-id=7-9&viewport=396%2C456%2C0.36&t=fR57zrO6EuP9H00E-1&scaling=scale-down)]
- **Style Guide:** [[Link to your style guide](https://www.figma.com/proto/OsGtXBheePyh6yKPDWe2Gd/GavelGlance-Styleguide?page-id=0%3A1&node-id=1-2&viewport=1056%2C675%2C1.02&t=YSzUg7RHte8Q2TP7-1&scaling=min-zoom)]
- **Kanban Project Board:** [[Link to your Kanban board](https://trello.com/invite/b/jijdZPox/ATTI831ebe60bb9a16e4f441acc540931309FD56E99A/semester-project-2-auction-website)]

## Deployment

This project is deployed to Netlify and will automatically update upon successful completion of the CI pipeline.