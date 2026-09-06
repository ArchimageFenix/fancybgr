
<p align="center">
  <img src="./public/branding/fancybgr-logo.png" alt="FancyBGR" width="500">
</p>

<p align="center">
  <strong>Private, local AI background removal directly in your browser.</strong>
</p>



FancyBGR is a web application for removing image backgrounds using AI without uploading your images to a remote processing server.

Image processing runs locally in the browser using ONNX Runtime Web and WebAssembly.

## Features

- AI-powered background removal
- Local browser-based image processing
- Images are not uploaded for background removal
- Full-resolution PNG output
- Transparent background output
- Sequential batch processing
- Local AI model caching
- Offline processing after required assets are cached
- Light and dark themes
- Responsive interface for desktop and mobile

## Privacy

FancyBGR is designed around local processing.

Your images are processed directly on your device. The application may download required AI model and runtime assets, but image background removal itself is performed locally in the browser.

No account is required to process images.

## Technology

FancyBGR is built with:

- Next.js
- React
- TypeScript
- Tailwind CSS
- ONNX Runtime Web
- WebAssembly
- IMG.LY Background Removal

## How It Works

```text
Image
  ↓
Browser image preparation
  ↓
Local AI inference
  ↓
Background removal
  ↓
Transparent PNG
```

The AI model and required runtime assets are cached by the browser to reduce repeated downloads.

## Getting Started

Clone the repository:

```bash
git clone https://github.com/ArchimageFenix/fancybgr.git
```

Enter the project directory:

```bash
cd fancybgr
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Production Build

Create an optimized production build:

```bash
npm run build
```

Run the production server:

```bash
npm start
```

## Requirements

For development:

- Node.js
- npm
- A modern web browser with WebAssembly support

## Project Status

FancyBGR is currently under active development.

The core local background-removal pipeline is functional and is being tested across desktop and mobile browsers.

## Repository

GitHub:

https://github.com/ArchimageFenix/fancybgr

## License

A project license has not yet been selected.