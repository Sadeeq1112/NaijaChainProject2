import algosdk from 'algosdk';

/*const algodToken = process.env.ALGOD_TOKEN;
const algodServer = process.env.ALGOD_SERVER;
const algodPort = process.env.ALGOD_PORT;*/

const algodClient = new algosdk.Algodv2(
        process.env.NEXT_PUBLIC_ALGOD_TOKEN,
        process.env.NEXT_PUBLIC_ALGOD_SERVER,
        process.env.NEXT_PUBLIC_ALGOD_PORT || ""
    );

export const createTransaction = async (product, buyerAddress, buyerPrivateKey) => {
    try {
        const sender = buyerAddress;
        const receiver = product.owner.address;
        const amount = product.price.amount * 1000000;

        const params = await algodClient.getTransactionParams().do();

        const txn = {
            from: sender,
            to: receiver,
            fee: params.fee,
            amount,
            firstRound: params.lastRound,
            lastRound: params.lastRound + 1000,
            genesisID: params.genesisID,
            genesisHash: params.genesisHash,
            note: algosdk.encodeObj(`Purchase of ${product.title}`),
        };

        const signedTxn = algosdk.signTransaction(txn, buyerPrivateKey);
        const txId = await algodClient.sendRawTransaction(signedTxn.blob).do();

        await waitForConfirmation(txId);

        return txId;
    } catch (error) {
        console.error('Error creating transaction:', error);
        throw error;
    }
};

const waitForConfirmation = async (txId) => {
    let response = await algodClient.status().do();
    let lastRound = response['last-round'];

    while (true) {
        const pendingInfo = await algodClient.pendingTransactionInformation(txId).do();
        if (pendingInfo['confirmed-round'] !== null && pendingInfo['confirmed-round'] > 0) {
            console.log('Transaction confirmed in round:', pendingInfo['confirmed-round']);
            break;
        }
        lastRound++;
        await algodClient.statusAfterBlock(lastRound).do();
    }
};
