import {
  Currencies,
  CreateAddressResponse,
  StateAddressResponse,
  StateAddressResponseFull,
  TransactionParams,
  TransactionResponse
} from "./types";
import axios, { AxiosRequestConfig } from "axios";

export = class Bitaps {
  /**
   * Set Bitaps Currency
   */
  private _currency: Currencies;

  /**
   * Is TestNet?
   * Default as false
   */
  private _testnet: boolean = false;

  /**
   * Generated bataps api link
   */
  private url: string;

  /**
   * Default Forwarding Address
   */
  forwarding_address?: string;

  /**
   * Create Bitaps instance
   * @param {Currencies} currency currency payment
   * @param {boolean} testnet is testnet?
   */
  constructor(
    currency: Currencies,
    forwarding_address?: string,
    testnet?: boolean
  ) {
    this._currency = currency;

    this.forwarding_address = forwarding_address;

    if (testnet) this._testnet = testnet;

    this.url = "";
    this.generateUrl();
  }

  /**
   * Generate Bitaps API link
   */
  private generateUrl(): void {
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
  set testnet(value: boolean) {
    this._testnet = value;
    this.generateUrl();
  }

  get testnet(): boolean {
    return this._testnet;
  }

  /**
   * Currency Setter
   * Regenerate Bitaps URL
   *
   * @param {Currencies} value
   */
  set currency(value: Currencies) {
    this._currency = value;
    this.generateUrl();
  }

  get currency(): Currencies {
    return this._currency;
  }

  /**
   * Create forwarding address
   * @param forwarding_address? Address for payout
   * @param callback_link? Link for payment notification handler
   * @param confirmations? Number of confirmations required for the payment
   */
  async address(
    forwarding_address?: string,
    callback_link?: string,
    confirmations?: number
  ): Promise<CreateAddressResponse> {
    try {
      if (!forwarding_address && !this.forwarding_address)
        new Error("Forwarding Address Not Found");

      return await this.send("/create/payment/address", "post", {
        forwarding_address: forwarding_address
          ? forwarding_address
          : this.forwarding_address,
        callback_link: callback_link,
        confirmations: confirmations
      });
    } catch (error) {
      return error;
    }
  }

  /**
   * Request status and statistics of the payment address.
   * @param address Payment address
   * @param token Payment code Or Domain access token
   */
  async state(
    address: string,
    token?: string
  ): Promise<StateAddressResponse | StateAddressResponseFull> {
    try {
      return await this.send(
        "/payment/address/state/" + address,
        "get",
        null,
        token
      );
    } catch (error) {
      return error;
    }
  }

  /**
   * Request list of payment address transactions.
   * @param address Payment address
   * @param params From & To & Limit & Page
   * @param token Payment code Or Domain access token
   */
  async transactions(
    address: string,
    params?: TransactionParams,
    token?: string
  ): Promise<TransactionResponse> {
    try {
      return await this.send(
        "/payment/address/transactions/" + address,
        "get",
        params,
        token
      );
    } catch (error) {
      return error;
    }
  }

  /**
   * Send Request To Bitaps
   * @param url Bitaps API endpoint
   * @param method HTTP method (post | get)
   * @param data Request Body
   * @param token Payment code Or Domain access token
   */
  async send(
    url: string,
    method: "post" | "get",
    data?: any,
    token?: string
  ): Promise<any> {
    let options: AxiosRequestConfig = {
      method: method,
      url: this.url + url,
      data: data
    };

    if (token)
      options.headers = {
        "Payment-Code": token,
        "Access-Token": token
      };

    let result = await axios.request(options);
    return result.data;
  }
};
