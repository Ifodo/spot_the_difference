Product Requirements Document (PRD)
Product Name

Igethouse – Identify the Missing Items (Web Game)

Version

1.1 (Local-Only Architecture)

Platform

Web (HTML5 / CSS3 / Vanilla JavaScript)

1. Product Overview

The Igethouse Identify the Missing Items Game is a fully client-side, browser-based interactive game designed to engage users with real estate imagery. Players identify missing objects within property scenes across multiple difficulty levels and categories.

The application will run entirely in the browser, with no backend services, no APIs, and no server-side logic. All assets, rules, and scoring logic will be handled locally.

2. Objectives

Increase user engagement on Igethouse digital platforms

Gamify real estate education and visual awareness

Deliver a fast, offline-capable experience

Maintain zero infrastructure cost (no servers, no APIs)

3. Target Users

Property buyers and renters

Real estate enthusiasts

Casual website visitors

Mobile and desktop users

4. Game Structure
4.1 Difficulty Levels
Easy

2–3 missing items

Obvious and large objects

No time pressure or generous timer

Categories:

Living Room

Bedroom

Kitchen

Medium

4–6 missing items

Moderately subtle objects

Timer enabled

Categories:

Office

Bathroom

Balcony

Hard

7–10 missing items

Small or background objects

Shorter timer

Categories:

Luxury Homes

Outdoor Spaces

Commercial Properties

5. Categories

Each category defines the type of items removed from the image:

Furniture (sofas, beds, tables)

Decor (art, lamps, plants)

Appliances (TVs, fridges, ovens)

Property Features (windows, doors, railings)

Outdoor Elements (trees, pool items)

6. Core Gameplay Logic (Local Only)
6.1 Game Flow

User selects:

Difficulty

Category

Game loads:

Base image (complete scene)

Altered image (missing items)

User:

Clicks on areas where items are missing

System:

Validates clicks using predefined coordinates

Awards or deducts points

Game ends when:

All items are found, or

Timer runs out

6.2 Missing Item Detection (No AI, No APIs)

Missing items will be handled using manual data definitions:

{
  id: "sofa",
  x: 320,
  y: 180,
  radius: 40,
  points: 100
}


Click detection via coordinate matching

Each item has a hit zone

No image recognition

Fully deterministic and fast

6.3 Scoring System

Correct click: +Points

Incorrect click: −Points

Faster completion = bonus points

Final score shown at end of round

6.4 Hint System

Limited hints per level

Hint highlights an area briefly

Implemented with CSS overlays

6.5 Progression

Levels unlock sequentially

Stored locally using:

localStorage

7. User Interface Requirements
7.1 Design Language

Modern, real-estate-inspired UI

Clean typography

Card-based navigation

Subtle animations

Brand-aligned colors (Igethouse)

7.2 Key Screens

Home / Level Select

Category Select

Game Play Screen

End Game Summary

Local Leaderboard

8. Technical Architecture
8.1 Frontend Stack
Technology	Usage
HTML5	Structure
CSS3	Styling, animations
JavaScript (ES6)	Game logic
LocalStorage	Progress & scores
8.2 Folder Structure
/assets
  /images
  /icons
/css
  main.css
/js
  game.js
  levels.js
  ui.js
  storage.js
index.html

9. Data Handling (Local Only)
9.1 Storage

Scores

Progress

Level unlocks

Stored using:

localStorage.setItem("igethouse_progress", JSON.stringify(data));


No user authentication required.

10. Performance Requirements

Initial load under 2 seconds

Images optimized (WebP preferred)

No blocking scripts

Mobile-first responsive design

11. Browser Support

Chrome

Edge

Firefox

Safari

Mobile browsers (Android / iOS)

12. Development Workflow (Cursor AI)

Cursor AI used for:

Code generation

Refactoring

UI logic iteration

No dependency management required

Fully static project

13. Success Metrics

Session duration

Level completion rate

Replay frequency

Local high score activity

14. Future Enhancements (Still Local)

Sound effects toggle

Image packs per property type

Daily challenge mode

Exportable score screenshots

PWA offline installation