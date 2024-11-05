# NaijaChain - Decentralized Artisan Marketplace

## Overview
NaijaChain is a decentralized marketplace built on the Algorand blockchain that connects Nigerian artisans with customers, enabling secure transactions and service bookings through smart contracts.

## Project Structure
naijachain/ ├── smartcontract/ │ ├── contracts/ │ │ ├── MarketPlace.py │ │ ├── ArtisanRegistry.py │ │ └── EscrowService.py │ ├── scripts/ │ │ └── deploy.py │ └── tests/ │ └── test_marketplace.py


## Smart Contracts

### MarketPlace.py
- Handles service listings and bookings
- Manages service status and pricing
- Tracks service ownership

### ArtisanRegistry.py
- Manages artisan registration
- Handles verification levels
- Stores artisan ratings and reviews

### EscrowService.py
- Manages secure payments between parties
- Implements payment release mechanisms
- Handles dispute resolution

## Technical Requirements

### Prerequisites
- Python 3.9+
- Algorand Sandbox
- PyTeal
- pip install -r requirements.txt

### Development Setup
```bash
# Install Algorand Sandbox
git clone https://github.com/algorand/sandbox.git
cd sandbox
./sandbox up

# Install dependencies
pip install pyteal
pip install py-algorand-sdk

# Run all tests
python -m unittest discover tests

# Run specific test
python -m unittest tests/test_marketplace.py

# Deploy contracts
cd smartcontract/scripts
python deploy.py

Key Technical Achievements
Smart Contracts
Implemented PyTeal-based marketplace contract with:

Service listing/booking logic
Escrow payment system
Artisan verification mechanism
Developed automated testing suite:

Unit tests for all contracts
Integration tests with Algorand testnet
User Interface
React-based marketplace frontend:
Wallet connection (AlgoSigner/MyAlgo)
Service listing interface
Payment processing
Backend Services
Node.js API with:
Algorand SDK integration
User authentication
IPFS integration for media storage
Development Status
Current working features:

✅ Smart contract deployment
✅ Basic marketplace operations
✅ Frontend
In progress:

🚧 Dispute resolution mechanism
🚧 Rating system
🚧 Mobile responsiveness
🚧 Backend and service side functions


Key Features
Artisan registration and verification
Service listing and booking
Secure escrow payments
Rating system
Dispute resolution
Security
Automated testing
Secure payment handling
Role-based access control
Input validation
Transaction verification
Contract Interactions
For Artisans
Register account
Complete verification
List services
Accept bookings
Receive payments
For Customers
Browse services
Book artisans
Make secure payments
Leave reviews
Development Guidelines
Write tests for all new features
Follow PyTeal best practices
Document code changes
Use meaningful commit messages
License
MIT License

Contact
For inquiries: abubakarelsadeeq521@gmail.com

