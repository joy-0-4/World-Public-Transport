# World Public Transport
A web application that allows travelers to share information, experiences and tips about public transport systems around the world.

User can browse existing public transport companies, contribute information about new ones, and update existing records to help other travelers navigate public transportation in unfamiliar cities and countries.

The application is designed to make sharing information as accessible as possible. It intentionally does not require user accounts or verification, allowing anyone to contribute.

## Features
- location-based search: Find public transport companies by country and city.
- transportation filtering: Filter results by available modes of transportation.
- community contributions: Add new public transport companies and update existing records.
- travel experiences: Share personal experiences, recommendations and practical tips.
- useful travel information: Access official company websites, ticket tariffs and transport zone information.
- open contributions: No registration or account verification required to contribute.

## Information Shared
Each public transport company record can contain:
- company name
- country and city
- available modes of transportation
- accessibility by travelers with limited mobility
- official company website
- website with ticket tariff information
- website with zone information
- personal experience and tips for other travelers

## Design Philosophy
World Public Transport aims to make community contributions as accessible as possible.

Rather than requiring users to register, create accounts or verify their identities, the application allows anyone to contribute information. This reduces barriers to participation and encourages travelers to share useful knowledge.

## Technologies Used
- React - building user interface
- JavaScript - application logic and functionality
- MongoDB - storing public transport company information and community contributions

## Screenshots
Search Page
<img width="1248" height="670" alt="image" src="https://github.com/user-attachments/assets/8f114eec-5ae3-4fa1-b904-74149ff67672" />

Company Detail
<img width="1248" height="293" alt="image" src="https://github.com/user-attachments/assets/a33a7466-95a0-4cd1-ba8c-ff2c7fceb2dd" />

Company Creation/Editing
<img width="1248" height="636" alt="image" src="https://github.com/user-attachments/assets/8fdf2d66-14aa-416a-84fc-b0dcff032627" />

## Installation and Setup
### Requirements
- Node.js and npm
- a MongoDB database (MongoDB Atlas or a local MongoDB instance)
Demo database: Credentials are available upon request for interviewers who would like to explore the application's backend and database functionality.

### 1. Clone the repository
```bash
git clone https://github.com/joy-0-4/World-Public-Transport.git
cd World-Public-Transport/world-public-transport
```

### 2. Configure the database
Create your local configuration file by copying the example:
```bash
cp backend/config.example.env backend/config.env
```

Open backend/config.env and provide your own MongoDB connection string:
```
ATLAS_URI=your_mongodb_connection_string
```

The configuration file is intentionally excluded from version control to prevent database credentials from being exposed.

### 3. Install dependencies
Install the dependencies in the frontend and backend directories containing their respective package.json files.
```bash
npm install
```

### 4. Start the application
Start the frontend and backend using the development scripts defined in their respective package.json files.
The application requires both services to be running.

## Future Improvements
- ratings and reviews
- interactive maps showing transport networks
- multilingual support
- spam protection
