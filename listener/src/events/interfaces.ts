import { ethers } from "ethers";

export interface transactionsParams {
    transactions: ethers.TransactionResponse[];
    blockNumber: string;
    chainId: string;
}