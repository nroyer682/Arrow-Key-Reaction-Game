# Arrow-Key-Reaction-Game

A fast-paced, browser-based reaction game where players use arrow keys to match falling arrows before they reach the bottom of the screen. Built with vanilla JavaScript, Node.js/Express backend, and featuring a competitive leaderboard system.

## 🎮 Game Overview

Test your reflexes and reaction time as arrows fall from the top of the screen! Match them by pressing the correct arrow key before they reach the bottom. As you progress through levels, the arrows fall faster and faster, challenging your skills to the limit.

## ✨ Features

- **Dynamic Difficulty**: Arrows fall faster as you level up
- **Lives System**: Start with 3 lives - don't let arrows reach the bottom!
- **Scoring System**: Earn 10 points for each correctly matched arrow
- **Level Progression**: Automatic level-up every 15 seconds with visual feedback
- **Pause/Resume Functionality**: Take a break whenever you need
- **Leaderboard**: Top 10 high scores saved and displayed
- **Audio Feedback**: Sound effects for level-ups and lost lives
- **Responsive Design**: Clean, gradient-styled UI with smooth animations

## 🚀 Getting Started

### Prerequisites

- Node.js (v12 or higher)
- npm (Node Package Manager)
- A modern web browser

### Installation

1. Clone the repository:
```bash
git clone https://github.com/nroyer682/Arrow-Key-Reaction-Game.git
cd Arrow-Key-Reaction-Game
```

2. Install backend dependencies:
```bash
cd Arrow_Drop_Game/backend
npm install
```

### Running the Game

1. Start the backend server:
```bash
cd Arrow_Drop_Game/backend
node server.js
```

2. Open your browser and navigate to:
```
http://localhost:8080
```

3. Enter your player name and start playing!

## 🎯 How to Play

1. **Enter Your Name**: Type your player name on the home screen
2. **Read Instructions**: Press any key to continue from the instructions page
3. **Play the Game**: 
   - Use arrow keys (↑ ↓ ← →) to match falling arrows
   - Match arrows before they reach the bottom
   - Each correct match = 10 points
   - Missing an arrow costs you a life
4. **Level Up**: Every 15 seconds, progress to a faster level
5. **Pause**: Click the pause button (||) to pause the game
6. **Game Over**: When you lose all 3 lives, your score is submitted to the leaderboard

## 🛠️ Technical Stack

### Frontend
- **HTML5**: Structure and layout
- **CSS3**: Styling with gradient backgrounds and animations
- **Vanilla JavaScript**: Game logic, DOM manipulation, and event handling

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web server and API endpoints
- **REST API**: Score submission and leaderboard retrieval

### Testing
- **Vitest**: Testing framework (frontend unit tests)

## 📁 Project Structure

```
Arrow-Key-Reaction-Game/
├── Arrow_Drop_Game/
│   ├── frontend/
│   │   ├── home.html          # Main game page
│   │   ├── script.js          # Game logic
│   │   ├── script.test.js     # Unit tests
│   │   ├── style.css          # Styling
│   │   └── Sound/             # Audio files
│   │       ├── success.mp3    # Level-up sound
│   │       └── error.mp3      # Lost life sound
│   └── backend/
│       ├── server.js          # Express server
│       ├── package.json       # Dependencies
│       └── package-lock.json
├── README.md
└── .gitignore
```

## 🎲 Game Mechanics

- **Arrow Fall Speed**: Falls based on formula 3000ms ÷ current_level (Level 1 = 3000ms, Level 2 = 1500ms, Level 3 = 1000ms)
- **Arrow Generation Rate**: New arrows spawn based on formula 1500ms - (level × 50ms), resulting in 1450ms at Level 1, 1400ms at Level 2, 1350ms at Level 3, etc.
- **Level Progression**: Automatically advances every 15 seconds
- **Lives**: Start with 3 lives (❤️ ❤️ ❤️)
- **Score**: +10 points per matched arrow

## 🌐 API Endpoints

- `GET /` - Serves the game page
- `GET /leaderboard` - Retrieves top 10 scores
- `POST /submit-score` - Submits player score (requires playerName and score)

## 👥 Authors

- **Natalie Royer** - [@nroyer682](https://github.com/nroyer682)
- **Stefan Kupiak**

## 📝 License

This project is open source and available for educational purposes.

## 🎨 Acknowledgments

- Arrow emoji icons for visual representation
- Gradient background design inspired by modern web aesthetics
- Audio feedback for enhanced user experience
