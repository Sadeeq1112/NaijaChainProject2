import algosdk from "algosdk";

const algodClient = new algosdk.Algodv2(
    process.env.NEXT_PUBLIC_ALGOD_TOKEN,
    process.env.NEXT_PUBLIC_ALGOD_SERVER,
    process.env.NEXT_PUBLIC_ALGOD_PORT || ""
);

export const getAccountBalance = async (address) => {
    try {
        const accountInfo = await algodClient.accountInformation(address).do();
        return accountInfo.amount;
    } catch (error) {
        console.error("Error fetching account balance:", error);
        throw error;
    }
};
