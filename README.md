# TruthLens — Misinformation Analysis Assistant

> [!IMPORTANT]
> This project is currently under development. Features and APIs may change.

TruthLens is an AI-powered browser extension that helps users detect and understand misinformation by analyzing the credibility of online content in real-time.

## Features

- 🧠 **AI-Powered Analysis**: Uses a local LLM (Ollama) to assess content credibility without sending personal data to third-party servers
- 🔍 **Real-Time Monitoring**: Automatically analyzes web pages as you browse
- 🚫 **Proactive Detection**: Warns you when content seems untrustworthy
- 💡 **Informed Decisions**: Provides detailed explanations and context to help you evaluate information
- 🌐 **Seamless Integration**: Works quietly in the background with a simple UI

## Quick Start

### Prerequisites

- **Ollama**: Installed and running locally (https://ollama.com/)
- **Node.js**: Version 16 or higher
- **npm**: Version 8 or higher

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd TruthLens
```

2. **Install dependencies**

```bash
npm install
```

### Configuration

1. **Create a `.env` file** in the project root:

```bash
cp .env.example .env
```

2. **Edit `.env`** and set your configuration:

```env
# Ollama server URL (default: http://localhost:11434)
OLLAMA_API_URL=http://localhost:11434

# Model to use for analysis (default: llama3)
OLLAMA_MODEL=llama3

# Confidence threshold (0.0-1.0, default: 0.7)
# Lower values = more sensitive (warn on less certain content)
CONFIDENCE_THRESHOLD=0.7

# Enable debug mode (logs more info)
DEBUG=true
```

## Usage

### Development

**Start the extension in development mode**

```bash
npm run dev
```

This will:
1. Start the Ollama server (if not running)
2. Build the extension
3. Open browser extension management page with TruthLens loaded

**Access the developer dashboard**

Open [http://localhost:5173](http://localhost:5173) in your browser

**Build for production**

```bash
npm run build
```

**Load unpacked extension**

1. Open Chrome/Edge extensions management page
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select the `dist` folder

## How It Works

1. **Background Script** monitors tab navigation
2. **Content Script** analyzes page content (DOM elements)
3. **Credibility Check** sends content to local Ollama LLM for analysis
4. **Feedback System** provides warnings/suggestions based on analysis

## Tech Stack

- **Frontend**: React 18, Vite
- **Browser Extension**: WebExtension API
- **LLM**: Ollama (local)
- **Styling**: Tailwind CSS, CSS
- **Icons**: Lucide React

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For issues, feature requests, or questions, please open an issue in the repository.