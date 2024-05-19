# Semester Project 2: Auction Website

[Hosted Application Demo Link]  (Replace with your Netlify link when ready)

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

This auction website connects to the Noroff API to provide a platform for users to buy and sell items. Registered users receive 1000 credits initially and can earn more by selling items. Unregistered users can browse listings, but only registered users can bid.

## Features

- **User Authentication:**
    - Registration for users with stud.noroff.no email addresses
    - Login/logout functionality
    - Avatar update
    - Credit balance display
- **Listing Management:**
    - Creation of listings with title, deadline, media gallery, and description
- **Bidding:**
    - Adding bids to other users' listings
    - Viewing bids made on a listing
- **Searching:**
    - Unregistered users can search listings
- **Additional Features (Optional):**
    - [List any extra features you've implemented]

## User Stories

- As a user with a stud.noroff.no email, I can register for an account.
- As a registered user, I can log in and out of my account.
- As a registered user, I can update my avatar image.
- As a registered user, I can view my total credit balance.
- As a registered user, I can create a listing with a title, deadline, media gallery, and description.
- As a registered user, I can add a bid to another user's listing.
- As a registered user, I can view all bids made on a specific listing.
- As an unregistered user, I can search through listings to find items of interest.

## Technical Restrictions

- **CSS Framework:** [Your chosen CSS framework] (version > [required version])
- **Static Host:** Netlify
- **Design Application:** [Your chosen design application]
- **Planning Application:** [Your chosen planning application]

## Approved Resources

- **CSS Processors:** SASS/SCSS, PostCSS
- **Hosting Services:** Netlify
- **Design Applications:** Adobe XD, Figma, Sketch
- **Planning Applications:** Trello, GitHub Projects

## Setup & Running Locally

1. **Clone the repository:** `git clone [Your repository URL]`
2. **Install dependencies:** `npm install`
3. **Start development server:** `npm run start`

## Testing

- **Unit Tests:** Run `npm run test:unit` to execute Jest unit tests.
- **End-to-end Tests:** Run `npm run test:e2e` to execute Cypress end-to-end tests.

## Project Management

- **Gantt Chart:** [Link to your Gantt chart]
- **Design Prototype:** [Link to your design prototype]
- **Style Guide:** [Link to your style guide]
- **Kanban Project Board:** [Link to your Kanban board]

## Deployment

This project is deployed to Netlify and will automatically update upon successful completion of the CI pipeline.