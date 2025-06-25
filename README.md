# BCDE211 Triathlon Training App

A triathlon training management application built with Next.js and TypeScript. This Progressive Web App (PWA) helps triathletes create, manage, and track their training plans across swimming, cycling, and running disciplines.


### 💾 Data Management
- **Multiple Storage Options**:
  - Local Storage: Quick save/load for session data
  - IndexedDB: Persistent browser storage with custom naming
  - File System API: Import/export training plans (where supported)
- **Data Persistence**: Training plans and progress automatically saved
- **Import/Export**: Share training plans with other users

### 📱 Progressive Web App (PWA)
- **Offline Support**: Use the app without internet connection
- **Mobile Optimized**: Responsive design for phones and tablets
- **Installable**: Add to home screen for native app experience
- **Fullscreen Mode**: Distraction-free training management

## Tech Stack

- **Framework**: Next.js 15 with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **Data Tables**: TanStack Table
- **PWA**: next-pwa
- **Testing**: Jest with ts-jest
- **Build Tool**: Turbopack for development

## Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/bcde211-triathlon-app.git
cd bcde211-triathlon-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Build the application:
```bash
npm run build
```

4. Start the production server with HTTPS:
```bash
npm run start:https
```

5. Open [https://localhost:3000](https://localhost:3000) in your browser.

**Note:** HTTPS is recommended to enable all PWA features including service worker, offline support, and file system API.

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run dev:https` - Start HTTPS development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run start:https` - Start production server with HTTPS
- `npm run build:pwa` - Build PWA for production
- `npm run lint` - Run ESLint
- `npm run test` - Run Jest tests

## Project Structure

```
src/
├── app/                          # Next.js app directory
│   ├── _components/             # Shared components
│   │   ├── ui/                  # UI components (Button, Table, etc.)
│   │   └── pwa-registration.tsx # PWA service worker registration
│   ├── _lib/                    # Utilities and types
│   ├── training/                # Training management features
│   │   ├── _components/         # Training-specific components
│   │   ├── _viewModel/          # Training business logic
│   │   └── page.tsx            # Training page
│   └── triathlon/               # Triathlon information features
│       ├── _table/              # Table components and logic
│       ├── _viewModel/          # Triathlon business logic
│       └── page.tsx            # Triathlon page
├── model/                       # Domain models and business logic
│   ├── components/              # Core business components
│   └── lib/                     # Types, enums, and interfaces
└── tests/                       # Test files
```

## Testing

Run the test suite:

```bash
npm test
```

The app includes comprehensive tests for:
- Distance calculations and conversions
- Training plan management
- Triathlon type definitions
- Core business logic

## PWA Features

This app is a fully functional Progressive Web App with:

- **Service Worker**: Caches resources for offline use
- **Web App Manifest**: Enables installation on devices
- **Responsive Design**: Works on all screen sizes
- **Offline Functionality**: Core features work without internet

To install the PWA:
1. Visit the app in a supported browser
2. Look for the "Install App" prompt or menu option
3. Follow the installation instructions

## Browser Support

- Chrome/Edge (recommended for full PWA features)
- Firefox
- Safari (limited PWA support)

Modern browsers with ES2020+ support required.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Development Notes

- Uses TypeScript strict mode for type safety
- Follows Next.js app directory conventions
- Implements clean architecture with separated concerns
- Uses custom hooks for table management
- Supports multiple data persistence strategies
- Built with accessibility and performance in mind
