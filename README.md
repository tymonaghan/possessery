# POSSESSION

A repo company management game about accumulating better office equipment and upgrades through successful repossessions. The better you are at your job, the nicer your stuff gets - but gradually, the game reveals the human cost of your efficiency.

## About

**POSSESSION** is a browser-based narrative management game that explores the moral complexity of debt collection through incremental gameplay mechanics. What starts as a straightforward "cookie clicker" style progression system gradually reveals deeper consequences of your professional success.

You manage a repossession company, selecting jobs, assigning employees and equipment, and watching your office transform from a folding table and CRT monitor into a sleek corporate space. But as your material success grows, fragments of the human impact of your work accumulate - overheard conversations, news snippets, lawsuit notices. Your family texts get shorter. The photo on your desk fades, then disappears.

The game never tells you this is wrong. It just shows you what happens.

### Design Philosophy

POSSESSION is inspired by games that use systemic mechanics to create moral weight without explicit moralizing. The progression hook is genuine - getting upgrades feels good - but the environmental storytelling creates an emotional counterweight that the player must reconcile themselves.

**Special thanks to *Papers, Please* for pioneering this design space of games that make you complicit in systems you might question.**

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

3. **Start playing**
   - The game auto-saves to browser localStorage
   - Refresh the page to continue from where you left off

### Gameplay Loop

1. **Morning**: Review available repo jobs for the day
2. **Selection**: Choose 3-4 jobs to pursue
3. **Assignment**: Assign employees and equipment to each job
4. **Execute**: Click "Go to Work" and see the results
5. **Evening**: Return to your office, check messages, see news
6. **Progress**: Watch your office upgrade as you succeed
7. **Repeat**: Start the next day

### Game Mechanics

- **Success Rate**: Each job has a difficulty rating and required skills
- **Employee Skills**: Match employee skills to job requirements for better success rates
- **Equipment**: Better equipment increases success probability
- **Progression**: Successful repos earn money and upgrade your office
- **Consequences**: Some jobs generate delayed consequences (news items, complaints, family strain)
- **Acts**: The game progresses through three acts as your career advances:
  - **Act 1**: Small town - Personal and direct consequences
  - **Act 2**: Suburbs - More abstract, distant impacts
  - **Act 3**: City - Everything becomes statistics

### Tips

- Match employee skills to job types for better success rates
- Higher difficulty jobs pay more but have lower success rates
- Some scenarios have hidden complications (wrong VIN, creditor errors)
- Watch the consequences panel for the ripple effects of your work
- Pay attention to your family messages and the items in your office
- The game is designed to be played for 30-60 in-game days

## Game Structure

```
possession/
├── index.html          # Main game page
├── css/
│   └── styles.css      # All visual styling
├── js/
│   ├── data.js         # Job templates, employees, equipment, consequences
│   ├── game.js         # Core game logic and state management
│   └── ui.js           # UI rendering and event handling
└── assets/
    └── office/         # (Future: office upgrade images)
```

## Technical Details

- **Built with**: Vanilla JavaScript (ES6+), HTML5, CSS3
- **No dependencies**: No frameworks, no build tools
- **Storage**: Browser localStorage for save games
- **Compatibility**: Works in all modern browsers (Chrome, Firefox, Safari, Edge)

## Development

The game uses a simple modular structure:

- **data.js**: All game content (job templates, story text, progression thresholds)
- **game.js**: Game state, logic functions, save/load system
- **ui.js**: DOM manipulation and rendering

To modify game content (add jobs, change consequences, adjust progression), edit `data.js`.
To change game mechanics, edit `game.js`.
To adjust visuals or layout, edit `styles.css`.

## Credits

**Design & Concept**: tymonaghan
**Implementation**: Claude (Anthropic)
**Inspired by**: *Papers, Please* by Lucas Pope

## License

This project is a creative prototype. Feel free to explore, learn from, and build upon it.

---

*A game about choices, consequences, and accumulation.*
