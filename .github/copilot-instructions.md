# Astroloji Harita Analizi - Development Guidelines

This workspace contains a comprehensive Web-based Western Astrology Application.

## Project Overview

A full-stack Next.js application for natal chart analysis, rectification, astrocartography, mundane astrology, and relationship compatibility analysis.

## Tech Stack

- **Frontend**: Next.js 16 + TypeScript + React 18
- **Styling**: Tailwind CSS + Custom CSS
- **State**: Zustand for state management
- **Astrology**: Swiss Ephemeris algorithms (to be integrated)
- **AI**: OpenAI API optional integration
- **Internationalization**: i18next with English & Turkish

## Project Structure

- `/src/app` - Next.js App Router pages
- `/src/components` - React components
- `/src/lib/astrology` - Core astrology calculations
- `/src/lib/ai` - AI integration and interpretations
- `/src/locales` - Translation files
- `/src/stores` - Zustand state management
- `/src/styles` - CSS files

## Key Features Implemented

1. ✅ Core astrology calculations (Sun, Moon, planetary positions)
2. ✅ Natal chart generation with aspects
3. ✅ Time rectification module
4. ✅ Astrocartography calculations
5. ✅ Mundane/world astrology
6. ✅ Synastry and collective analysis
7. ✅ AI interpretation framework
8. ✅ Multilingual support (English & Turkish)
9. ✅ UI components and styling
10. ✅ Project configuration

## Development Commands

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Type checking
npm run type-check

# Linting
npx eslint . --fix
```

## Configuration

### Optional: AI Integration

To enable AI-powered interpretations:

1. Create `.env.local` file
2. Add `NEXT_PUBLIC_OPENAI_API_KEY=your_key`
3. Uncomment OpenAI API call in `src/lib/ai/interpretation.ts`

### Default Language

Default is English. Switch to Turkish in Settings.

## Areas for Enhancement

1. **Chart Visualization**: Implement SVG-based interactive chart wheel
2. **Ephemeris Integration**: Connect Swiss Ephemeris library for precise calculations
3. **Map Integration**: Add Astrocartography map visualization
4. **PDF Export**: Generate downloadable chart reports
5. **Database**: Add user accounts and chart saving
6. **Mobile App**: React Native version

## Notes

- Application is responsive and works on mobile devices
- Component-based architecture for reusability
- Type-safe with TypeScript throughout
- i18n ready for multi-language expansion
- Can be deployed to Vercel, Netlify, or any Node.js host

## Next Steps

1. Run `npm install` to install all dependencies
2. Run `npm run dev` to start development server
3. Open http://localhost:3000
4. Start developing features or integrate Swiss Ephemeris library

---

**Workspace**: Zuhreoglu (Astrology Application)  
**Created**: March 2026  
**Version**: 1.0.0
