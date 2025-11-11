# POSSESSION

**Build your repo empire from the ground up!**

Start with nothing but a folding table and a dream. Take on repossession jobs, earn cash, upgrade your office, hire skilled employees, and invest in professional equipment. Watch your business grow from a struggling solo operation into a thriving corporate powerhouse!

## About

**POSSESSION** is a browser-based repo company management game where you climb the ladder of success through smart job selection, strategic resource management, and steady progression.

Choose from various repo jobs each day, assign your team and equipment, and watch the money roll in. Every successful repo brings you closer to that executive desk, those dual monitors, and the corner office setup you've always wanted.

**Repo. Earn. Upgrade. Repeat.**

## How to Play

### Setup & Running

1. **Clone this repository**
   ```bash
   git clone https://github.com/tymonaghan/possessery.git
   cd possessery
   ```

2. **Open in browser**
   - Simply open `index.html` in any modern web browser
   - No build step, no server needed
   - Works offline

3. **Start building your empire!**
   - The game auto-saves to browser localStorage
   - Refresh the page to continue from where you left off

### Gameplay Loop

1. **Review Jobs**: Check out available repo assignments for the day
2. **Select Jobs**: Pick 1-4 jobs based on difficulty and payout
3. **Assign Resources**: Match employees and equipment to each job for maximum success
4. **Execute**: Hit "Go to Work" and watch the results
5. **Get Paid**: Successful repos earn cash minus overhead costs
6. **Upgrade**: Spend your earnings on better equipment and office improvements
7. **Grow**: Hire more employees, take on tougher jobs, expand your operation!

### Game Mechanics

- **Success Rate**: Match employee skills to job requirements for better odds
- **Difficulty Levels**: Higher difficulty = higher payout (but riskier!)
- **Equipment Bonuses**: Better gear increases your success probability
- **Office Progression**: Earn money and complete repos to unlock office upgrades
- **Three Territories**: Progress from small town → suburbs → big city operations
- **Employees**: Start with basic staff, hire specialists as you grow
- **Smart Strategy**: Balance risk vs reward to maximize profits

### Tips for Success

- Match employee skills (negotiator, investigator, intimidator) to job types
- Invest in better equipment early - it pays for itself quickly
- Don't take on too many high-difficulty jobs at once
- Watch your daily overhead costs vs potential earnings
- Steady progress beats risky gambles - build your empire smart!

## Game Structure

```
possession/
├── index.html          # Main game page
├── css/
│   └── styles.css      # All visual styling
├── js/
│   ├── data.js         # Job templates, employees, equipment
│   ├── game.js         # Core game logic and state management
│   └── ui.js           # UI rendering and event handling
└── assets/
    └── office/         # Office upgrade background images (optional)
```

## Adding Custom Office Images

Want to add your own office photos for the three main tiers?

1. Place three images in the `assets/office/` directory:
   - `office-low.jpg` (Starting office - struggling phase)
   - `office-mid.jpg` (Mid-game office - getting established)
   - `office-high.jpg` (End-game office - corporate success)

2. The game will automatically use them as backgrounds in the office view!

Recommended image size: 800x600px or similar aspect ratio

## Technical Details

- **Built with**: Vanilla JavaScript (ES6+), HTML5, CSS3
- **No dependencies**: No frameworks, no build tools
- **Storage**: Browser localStorage for save games
- **Compatibility**: Works in all modern browsers (Chrome, Firefox, Safari, Edge)

## Development

The game uses a simple modular structure:

- **data.js**: All game content (job templates, employees, equipment)
- **game.js**: Game state, logic functions, save/load system
- **ui.js**: DOM manipulation and rendering

To modify game content, edit `data.js`.
To change game mechanics, edit `game.js`.
To adjust visuals or layout, edit `styles.css`.

## Credits

**Design & Concept**: tymonaghan
**Implementation**: Claude (Anthropic)
**Inspired by**: *Papers, Please* by Lucas Pope

## License

This project is a creative prototype. Feel free to explore, learn from, and build upon it.

---

*Build your repo empire. One recovery at a time.*
