import algosdk from 'algosdk';

const privateKeys = {};

export default async function handler(req, res) {
  const { method, body } = req;

  if (method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { walletAddress } = body;

  if (!walletAddress) {
    return res.status(400).json({ error: 'Wallet address is required' });
  }

  try {
    if (privateKeys[walletAddress]) {
      return res.status(200).json({ privateKey: privateKeys[walletAddress] });
    }

    // Example: Generate a new private key if not stored (for demonstration purposes)
    const account = algosdk.generateAccount();
    privateKeys[walletAddress] = account.sk;

    return res.status(200).json({ privateKey: account.sk });
  } catch (error) {
    console.error('Failed to fetch private key:', error);
    return res.status(500).json({ error: 'Failed to fetch private key' });
  }
}
