"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const axios_1 = require("axios");
module.exports = class Bitaps {
    /**
     * Create Bitaps instance
     * @param {Currencies} currency currency payment
     * @param {boolean} testnet is testnet?
     */
    constructor(currency, forwarding_address, testnet) {
        /**
         * Is TestNet?
         * Default as false
         */
        this._testnet = false;
        this._currency = currency;
        this.forwarding_address = forwarding_address;
        if (testnet)
            this._testnet = testnet;
        this.url = "";
        this.generateUrl();
    }
    /**
     * Generate Bitaps API link
     */
    generateUrl() {
        this.url = `https://api.bitaps.com/${this.currency}`;
        if (this._testnet) {
            this.url += "/testnet";
        }
        this.url += "/v1";
    }
    /**
     * Testnet Setter
     * Regenerate Bitaps URL
     *
     * @param {Currencies} value
     */
    set testnet(value) {
        this._testnet = value;
        this.generateUrl();
    }
    get testnet() {
        return this._testnet;
    }
    /**
     * Currency Setter
     * Regenerate Bitaps URL
     *
     * @param {Currencies} value
     */
    set currency(value) {
        this._currency = value;
        this.generateUrl();
    }
    get currency() {
        return this._currency;
    }
    /**
     * Create forwarding address
     * @param forwarding_address? Address for payout
     * @param callback_link? Link for payment notification handler
     * @param confirmations? Number of confirmations required for the payment
     */
    address(forwarding_address, callback_link, confirmations) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!forwarding_address && !this.forwarding_address)
                    new Error("Forwarding Address Not Found");
                return yield this.send("/create/payment/address", "post", {
                    forwarding_address: forwarding_address
                        ? forwarding_address
                        : this.forwarding_address,
                    callback_link: callback_link,
                    confirmations: confirmations
                });
            }
            catch (error) {
                return error;
            }
        });
    }
    /**
     * Request status and statistics of the payment address.
     * @param address Payment address
     * @param token Payment code Or Domain access token
     */
    state(address, token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.send("/payment/address/state/" + address, "get", null, token);
            }
            catch (error) {
                return error;
            }
        });
    }
    /**
     * Request list of payment address transactions.
     * @param address Payment address
     * @param params From & To & Limit & Page
     * @param token Payment code Or Domain access token
     */
    transactions(address, params, token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.send("/payment/address/transactions/" + address, "get", params, token);
            }
            catch (error) {
                return error;
            }
        });
    }
    /**
     * Send Request To Bitaps
     * @param url Bitaps API endpoint
     * @param method HTTP method (post | get)
     * @param data Request Body
     * @param token Payment code Or Domain access token
     */
    send(url, method, data, token) {
        return __awaiter(this, void 0, void 0, function* () {
            let options = {
                method: method,
                url: this.url + url,
                data: data
            };
            if (token)
                options.headers = {
                    "Payment-Code": token,
                    "Access-Token": token
                };
            let result = yield axios_1.default.request(options);
            return result.data;
        });
    }
};
