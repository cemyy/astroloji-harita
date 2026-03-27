# Astroloji Harita Analizi - Western Astrology Chart Analyzer

A comprehensive web-based application for Western astrology natal chart analysis with advanced features including rectification, astrocartography, mundane astrology, and relationship analysis.

## Features

### 🌟 Core Features
- **Natal Chart Calculation**: Precise birth chart calculations using Swiss Ephemeris
- **Comprehensive Interpretations**: AI-powered or template-based astrological readings
- **Time Rectification**: Determine accurate birth time from known life events
- **Aspect Calculations**: All major and minor aspects with orb calculations
- **Element & Quality Balance**: Analysis of elemental and modal distributions

### 🗺️ Advanced Features
- **Astrocartography**: Calculate planetary lines and best locations on Earth for your energy
- **Synastry Analysis**: Relationship compatibility between two charts
- **Composite & Davison Charts**: Group and relationship chart generation
- **Mundane Astrology**: World events, economic cycles, and global trends analysis
- **Yearly Forecasts**: Transits, progressions, and solar return predictions
- **Rectification Engine**: Multi-technique birth time determination

### 🌐 Multilingual & Accessible
- **English & Turkish** translations included
- **Mobile-responsive** design works on all devices
- **Progressive Web App** - works offline
- **Accessibility-focused** design

### 🎨 User Interface
- Dark theme optimized for astrology
- Interactive chart wheel visualization
- Comparison mode for synastry analysis
- Export and sharing capabilities
- Saved charts management

## Technology Stack

- **Frontend**: Next.js 16 with TypeScript
- **Styling**: Tailwind CSS + Custom CSS
- **State Management**: Zustand
- **Calculations**: Swiss Ephemeris (swisseph)
- **AI Integration**: OpenAI API (optional)
- **Internationalization**: i18next

## Installation

### Prerequisites
- Node.js 18+ and npm
- OpenAI API key (optional, for AI interpretations)

### Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file (optional, for AI features):
```
NEXT_PUBLIC_OPENAI_API_KEY=your_key_here
```

3. Run development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/                      # Next.js app router
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/              # React components
│   ├── BirthDataForm.tsx    # Birth info input
│   ├── ChartDisplay.tsx     # Main chart display
│   ├── ChartVisualization.tsx
│   ├── InterpretationPanel.tsx
│   └── AstrocartographyPanel.tsx
├── lib/
│   ├── astrology/           # Core astrology calculations
│   │   ├── types.ts         # TypeScript interfaces
│   │   ├── calculator.ts    # Main calculations
│   │   ├── rectification.ts # Time rectification
│   │   ├── astrocartography.ts
│   │   ├── mundane.ts       # World astrology
│   │   └── collective.ts    # Group analysis
│   └── ai/                  # AI integration
│       └── interpretation.ts
├── locales/                 # Translation files
│   ├── en.json
│   └── tr.json
├── stores/                  # State management
│   └── appStore.ts
└── styles/                  # CSS files
    ├── globals.css
    └── chart.css
```

## Usage

### 1. Calculate Your Chart
1. Enter your birth date, time, and location
2. If you don't know exact time, select "unknown" for rectification
3. Click "Calculate Chart"

### 2. View Your Chart
- **Chart Tab**: See planetary positions and aspects
- **Interpretation Tab**: Read AI-generated or template interpretation
- **Astrocartography Tab**: Find best locations for you
- **Forecast Tab**: Get yearly predictions based on transits

### 3. Relationship Analysis
1. Calculate charts for two or more people
2. Use "Relationships" section for synastry analysis
3. View compatibility scores and relationship timeline

### 4. Other Analysis
- **Rectification**: Use known life events to determine accurate birth time
- **Mundane**: Analyze world events and global trends
- **Groups**: Create team/organization charts

## Configuration

### API Keys (Optional)
To enable AI-powered interpretations, add your OpenAI API key:

```bash
# .env.local
NEXT_PUBLIC_OPENAI_API_KEY=sk-...
OPENAI_API_KEY=sk-... # For server-side only
```

### Language
Default language is English. To change:
1. Go to Settings
2. Select Turkish (Türkçe)
3. UI will update to Turkish

### Timezone
Set your default timezone in Settings for accurate calculations

## Astrology Module Details

### Core Calculations
- **Julian Day**: Converts Gregorian dates to JD format
- **Planetary Positions**: Uses Swiss Ephemeris algorithms
- **House Systems**: Placidus, Koch, Equal (expandable)
- **Aspects**: Conjunction, Opposition, Square, Trine, Sextile, Quincunx, etc.
- **Orbs**: Configurable orbs for each aspect type

### Rectification Techniques
- **Secondary Directions**: Day = Year method (demi-direction)
- **Progressed Moon**: ~1° per month
- **Solar Returns**: Personal year cycles
- **Profections**: Annual house profections
- **Life Events**: Matching known events to chart

### Astrocartography
- **Planetary Lines**: IC, ASC, MC, DESC angles
- **Beneficial Zones**: Where planets work best
- **Relocation Analysis**: Best places to live/work
- **Timing**: Optimal periods for relocation

### Mundane Analysis
- **Country Charts**: Founded on independence dates
- **World Events**: Singular moment charts
- **Economic Cycles**: Jupiter (12yr), Saturn (29.5yr)
- **Political Predictions**: Based on transit cycles
- **Natural Events**: Earthquake and weather patterns

## Advanced Features

### Synastry Analysis
Examines how two charts interact:
- **Cross-chart aspects**: Person A's planets to Person B's houses
- **Compatibility scores**: Overall, emotional, intellectual, physical, karmic
- **Relationship timeline**: Year-by-year forecast
- **Strengths and challenges**: Specific guidance

### AI Interpretations
Provides comprehensive readings covering:
- Core identity (Sun, Moon, Rising)
- Personality traits and behavior
- Life purpose and destiny
- Relationship patterns
- Career guidance
- Spiritual development
- Growth opportunities

### Collective Astrology
Analyze groups, teams, and organizations:
- **Group charts**: Composite average of members
- **Synastry pairs**: How members interact
- **Davison chart**: Midpoint between two people
- **Team dynamics**: Overall group harmony

## Limitations & Future Work

### Current Limitations
- Simplified ephemeris calculations (recommend using swisseph library)
- Limited house system options
- AI interpretations require API configuration
- Basic chart visualization (needs SVG implementation)

### Planned Features
- Interactive SVG chart wheel with drag-and-drop
- Real-time astrocartography map with Google Maps
- Solar return and lunar return calculations
- Secondary progression and directions
- Yearly lunation cycles analysis
- Asteroid and fixed star integration
- Multi-language expansion
- Mobile app (React Native)
- Cloud sync and user accounts
- PDF report generation

## Development

### Build for Production
```bash
npm run build
npm run start
```

### Type Checking
```bash
npm run type-check
```

### Linting
```bash
npx eslint . --fix
```

## Performance

- **Server-side Rendering**: Fast page loads
- **Static Generation**: Pre-rendered pages where possible
- **Client-side Calculations**: Heavy astrology math runs locally
- **Code Splitting**: Automatic splitting by Next.js
- **Progressive Loading**: UI updates as data loads

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Mobile)

## Performance Optimization

The application is optimized for:
- Fast calculation of complex astrological algorithms
- Minimal API calls
- Efficient state management with Zustand
- Responsive design for all screen sizes
- PWA capabilities for offline use

## Contributing

Contributions are welcome! Areas for improvement:
- More accurate ephemeris calculations
- Additional house systems
- Expanded astrocartography features
- Better chart visualization
- More languages
- Mobile app version

## License

MIT License - See LICENSE file for details

## Disclaimer

This application is for entertainment and educational purposes. Astrology is not a science and should not be used for medical, legal, or financial decisions. Always consult qualified professionals for important life decisions.

## Support

For issues or questions:
1. Check the documentation
2. Review existing issues on GitHub
3. Create a new issue with details
4. Join our community for discussions

## Resources

### Learning Astrology
- https://cafeastrology.com/
- https://www.astro.com/
- Books: "The Only Astrology Book You'll Ever Need"

### Technical Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Swiss Ephemeris](https://www.astro.com/swisseph/)
- [Zustand](https://github.com/pmndrs/zustand)

## Credits

Built with love for astrology enthusiasts and practitioners.

**Version**: 1.0.0  
**Last Updated**: March 2026
