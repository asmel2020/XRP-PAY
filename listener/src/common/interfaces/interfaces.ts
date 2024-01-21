

export interface Block {
    address: string
    index: number
    transactionIndex: number
    blockNumber: number
    transactionHash: string
    data:string
    topics:string[]
    logs: Logs
}
  
export interface Logs {
    from: string
    to: string
    value: string
}

export interface BlockNft {
    address: string
    index: number
    transactionIndex: number
    blockNumber: number
    transactionHash: string
    data:string
    topics:string[]
    logs: LogsNft
}

export interface LogsNft {
    from: string
    to: string
    tokenId: string
}


export type Type = 'ERC20' | 'ERC721';
export type Contract = {
  id?: string;
  contractAddress: string;
  name?: string | null;
  symbol?: string | null;
  decimals?: number | null;
  totalSupply?: string | null;
  type: Type;
  blockCreated: number | null;
};