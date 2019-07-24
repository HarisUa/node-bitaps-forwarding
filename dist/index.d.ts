import { Currencies, CreateAddressResponse, StateAddressResponse, StateAddressResponseFull, TransactionParams, TransactionResponse } from "./types";
declare const _default: {
    new (currency: Currencies, forwarding_address?: string | undefined, testnet?: boolean | undefined): {
        /**
         * Set Bitaps Currency
         */
        _currency: Currencies;
        /**
         * Is TestNet?
         * Default as false
         */
        _testnet: boolean;
        /**
         * Generated bataps api link
         */
        url: string;
        /**
         * Default Forwarding Address
         */
        forwarding_address?: string | undefined;
        /**
         * Generate Bitaps API link
         */
        generateUrl(): void;
        /**
         * Testnet Setter
         * Regenerate Bitaps URL
         *
         * @param {Currencies} value
         */
        testnet: boolean;
        /**
         * Currency Setter
         * Regenerate Bitaps URL
         *
         * @param {Currencies} value
         */
        currency: Currencies;
        /**
         * Create forwarding address
         * @param forwarding_address? Address for payout
         * @param callback_link? Link for payment notification handler
         * @param confirmations? Number of confirmations required for the payment
         */
        address(forwarding_address?: string | undefined, callback_link?: string | undefined, confirmations?: number | undefined): Promise<CreateAddressResponse>;
        /**
         * Request status and statistics of the payment address.
         * @param address Payment address
         * @param token Payment code Or Domain access token
         */
        state(address: string, token?: string | undefined): Promise<StateAddressResponse | StateAddressResponseFull>;
        /**
         * Request list of payment address transactions.
         * @param address Payment address
         * @param params From & To & Limit & Page
         * @param token Payment code Or Domain access token
         */
        transactions(address: string, params?: TransactionParams | undefined, token?: string | undefined): Promise<TransactionResponse>;
        /**
         * Send Request To Bitaps
         * @param url Bitaps API endpoint
         * @param method HTTP method (post | get)
         * @param data Request Body
         * @param token Payment code Or Domain access token
         */
        send(url: string, method: "get" | "post", data?: any, token?: string | undefined): Promise<any>;
    };
};
export = _default;
