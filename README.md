# Orbix Wallet

A secure and user-friendly browser extension wallet for the NEAR blockchain, enabling seamless management of NEAR accounts, tokens, and NFTs.

![Orbix Wallet Logo](https://via.placeholder.com/150x50?text=Orbix+Wallet) <!-- Replace with actual logo -->

## 🌟 Features

- **Secure Account Management**: Create new NEAR accounts or import existing ones with mnemonic phrases
- **Multi-Network Support**: Connect to mainnet and testnet
- **Token Transfers**: Send and receive NEAR tokens with ease
- **NFT Support**: View, transfer, and import NFTs from your collection
- **DApp Integration**: Interact with decentralized applications on NEAR
- **Multi-Language**: Support for English and Spanish
- **Dark Theme**: Modern UI with a sleek design
- **Browser Extension**: Available as a Chrome/Firefox extension

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Chrome or Firefox browser

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/orbix-wallet.git
   cd orbix-wallet
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Load as browser extension**
   - Open your browser's extension manager
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `build` folder

## 📖 Usage

### Creating a New Account

1. Open the Orbix Wallet extension
2. Click "Create Account"
3. Set a strong password
4. Securely store your recovery phrase

### Importing an Account

1. Click "Import Account"
2. Enter your 12-word recovery phrase
3. Set a password

### Sending Tokens

1. Navigate to the Send tab
2. Enter recipient address and amount
3. Confirm the transaction

### Managing NFTs

1. Go to the Collectibles tab
2. View your NFT collection
3. Transfer NFTs to other addresses

## 🛠️ Tech Stack

- **Frontend**: React 18, Redux Toolkit
- **Blockchain**: NEAR Protocol
- **Wallet Integration**: NEAR Wallet Selector
- **Styling**: Tailwind CSS
- **Build Tool**: Create React App with custom webpack config
- **Extension**: Manifest V3

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Sidebar/        # Navigation sidebar
│   ├── Start/          # Onboarding flow
│   ├── HomeScreen/     # Main wallet interface
│   └── ...
├── container/          # Page containers
├── Store/              # Redux store and slices
├── utils/              # Utility functions
├── Constants/          # App constants and translations
└── Assets/             # Static assets
```

## 🔧 Development

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

### Environment Setup

The app uses NEAR testnet by default. To switch to mainnet, update the network configuration in `src/Constants/networks.js`.

## 🔒 Security

Orbix Wallet prioritizes security:

- All private keys are encrypted and stored locally
- No private keys are transmitted to external servers
- Open-source for transparency and community audit
- Regular security updates

**Important**: Always backup your recovery phrase and never share it with anyone.

## 🌐 Supported Browsers

- Chrome 88+
- Firefox 85+
- Edge 88+

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

### Development Guidelines

- Follow React best practices
- Use TypeScript for new components (future migration)
- Write tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

- **Documentation**: [Wiki](https://github.com/yourusername/orbix-wallet/wiki)
- **Issues**: [GitHub Issues](https://github.com/yourusername/orbix-wallet/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/orbix-wallet/discussions)

## 🙏 Acknowledgments

- NEAR Protocol team for the excellent blockchain infrastructure
- React community for the amazing framework
- All contributors and users of Orbix Wallet

---

**Disclaimer**: This wallet is provided "as is" without warranty of any kind. Users are responsible for securing their own funds and recovery phrases. Always verify transactions before confirming.

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
