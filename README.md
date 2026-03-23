<p align="center"><img src="public/icons/logo.svg" width="128" height="128" alt="BillCraft Logo"></p>

# BillCraft — AI Invoice, Proposal & Contract Generator

![Version](https://img.shields.io/badge/version-1.0.0-16a34a?style=flat-square)
![License](https://img.shields.io/badge/license-ISC-16a34a?style=flat-square)
![Chrome](https://img.shields.io/badge/Chrome-Manifest%20V3-16a34a?style=flat-square&logo=googlechrome&logoColor=white)
![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript&logoColor=white)

> The freelancer's billing toolkit — generate professional invoices, proposals, and contracts with AI, supporting 8 currencies, 6 templates, and direct Upwork/Fiverr integration.

<p align="center">
  <img src="src/assets/icons/icon-128.png" alt="BillCraft Icon" width="128" />
</p>

## Features

- :receipt: **Invoice Generator** — Create detailed, itemized invoices with tax calculations and payment terms
- :page_facing_up: **Proposal Generator** — AI-powered project proposals with scope, timeline, and pricing
- :handshake: **Contract Generator** — Generate freelance contracts with customizable clauses
- :globe_with_meridians: **Multi-Currency Support (8)** — USD, EUR, GBP, CAD, AUD, INR, JPY, SGD
- :art: **Template Gallery (6)** — Professional, minimal, modern, creative, corporate, and bold templates
- :computer: **HTML Preview & Export** — Live preview with one-click HTML/PDF export
- :link: **Upwork Integration** — Import project details and client info from Upwork
- :link: **Fiverr Integration** — Pull order data from Fiverr for automatic invoice generation
- :lock: **Firebase Auth** — Secure authentication with Google sign-in
- :leaves: **Green Theme** — Fresh green-accented interface designed for clarity

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript |
| Styling | Tailwind CSS |
| Build | Vite |
| Auth | Firebase |
| Integrations | Upwork API, Fiverr API |
| Platform | Chrome Extension (Manifest V3) |

## Installation

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd invoiceforge-ext
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   - Create a `.env` file with Firebase and integration API credentials

4. **Build the extension**
   ```bash
   npm run build
   ```

5. **Load in Chrome**
   - Navigate to `chrome://extensions/`
   - Enable **Developer mode**
   - Click **Load unpacked** and select the `dist` folder

## Usage

### Creating an Invoice
1. Open BillCraft from the Chrome toolbar
2. Select **Invoice** from the document type selector
3. Fill in client details, line items, tax rate, and currency
4. Choose a template from the gallery
5. Preview the HTML output and export

### Creating a Proposal
1. Select **Proposal** and describe the project
2. AI generates scope, deliverables, timeline, and pricing
3. Customize sections and export

### Creating a Contract
1. Select **Contract** and provide project details
2. AI generates clauses covering scope, payment, IP, termination
3. Review, edit, and export

### Upwork/Fiverr Integration
1. Navigate to an Upwork job or Fiverr order page
2. Click the BillCraft icon — project details are auto-imported
3. Generate an invoice or proposal pre-filled with client data

### Supported Currencies

| Currency | Code | Symbol |
|----------|------|--------|
| US Dollar | USD | $ |
| Euro | EUR | E |
| British Pound | GBP | L |
| Canadian Dollar | CAD | C$ |
| Australian Dollar | AUD | A$ |
| Indian Rupee | INR | R |
| Japanese Yen | JPY | Y |
| Singapore Dollar | SGD | S$ |

## Architecture

```
invoiceforge-ext/
├── src/
│   ├── assets/
│   │   └── icons/          # Extension icons (16, 48, 128px)
│   ├── components/         # React UI components
│   │   ├── InvoiceForm/    # Invoice builder
│   │   ├── ProposalForm/   # Proposal builder
│   │   ├── ContractForm/   # Contract builder
│   │   ├── TemplateGallery/# Template selector
│   │   └── Preview/        # HTML preview pane
│   ├── templates/          # 6 document templates
│   ├── services/           # AI generation, Upwork/Fiverr APIs
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Currency, tax, formatting
│   └── App.tsx             # Main entry point
├── manifest.json           # Chrome Manifest V3 config
├── vite.config.ts          # Vite build configuration
├── tailwind.config.js      # Tailwind theme (green)
└── package.json
```

## Screenshots

<p align="center">
  <img src="public/icons/logo.svg" alt="BillCraft Logo" width="128" />
</p>

| Icon | Size |
|------|------|
| ![Logo](public/icons/logo.svg) | SVG Logo |
| ![16px](src/assets/icons/icon-16.png) | 16x16 |
| ![48px](src/assets/icons/icon-48.png) | 48x48 |
| ![128px](src/assets/icons/icon-128.png) | 128x128 |

## License

ISC
