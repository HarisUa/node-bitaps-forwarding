export declare type Currencies = "btc" | "ltc" | "bch" | "eth";
export declare type CreateAddressResponse = {
    payment_code: string;
    callback_link?: string;
    forwarding_address: string;
    domain_hash?: string;
    confirmations: number;
    address: string;
    legacy_address?: string;
    domain?: string;
    invoice: string;
    currency: string;
};
export declare type StateAddressResponse = {
    pending_received: number;
    invalid_transaction_count: number;
    received: number;
    transaction_count: number;
    create_date: number;
    pending_transaction_count: number;
    currency: string;
    create_date_timestamp: number;
    address: string;
};
export declare type StateAddressResponseFull = StateAddressResponse & {
    type: string;
    paid: number;
    forwarding_address: string;
    confirmations: number;
    domain_hash?: string;
    callback_link?: string;
    pending_paid: number;
    domain?: string;
    legacy_address?: string;
    fee_paid: number;
};
export declare type TransactionParams = {
    from?: number;
    to?: number;
    limit?: number;
    page?: number;
};
export declare type Out = {
    amount: number;
    tx_out?: number;
    address: string;
};
export declare type payout = {
    miner_fee?: number;
    tx_hash: string;
    service_fee: number;
    outs: Out[];
};
export declare type Transaction = {
    timestamp: number;
    time: string;
    status: string;
    hash: string;
    amount: number;
    tx_out: number;
    notification: string;
};
export declare type TransactionResponse = {
    next_page: boolean;
    address: string;
    tx_list: Transaction[];
};
