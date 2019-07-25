# node-bitaps-forwarding

> A RESTful API package for bitaps payment forwarding

## Installation

```
$ npm i bitaps-forwarding
```

## API

#### Create forwarding address

```
address(forwarding_address?: string, callback_link?: string, confirmations?: number);
```

> **forwarding_address:** Address for payout. **(Optional)**
>
> **callback_link:** Sets the number of decimal points. **(Optional)**
>
> **confirmations:** Number of confirmations required for the payment. **(Optional)**

#### Request status and statistics of the payment address.

```
state(address: string, token?: string)
```

> **address:** Payment address.
>
> **token:** Payment code Or Domain access token. **(Optional)**

#### Request status and statistics of the payment address.

```
transactions(address: string, params?: TransactionParams, token?: string)
```

> **address:** Payment address.
>
> **params:** From & To & Limit & Page. **(Optional)**
>
> **token:** Payment code Or Domain access token. **(Optional)**

## Example

```
let Bitaps = require("bitaps-forwarding");

let eth = "0x65a502a96b7da631b68101b3f7b193448dac36a4"; // Address for payout.
let bitaps = new Bitaps("eth"); // Init Bitaps instance
bitaps.address(eth).then(e => console.log(e)); // Create forwarding address
```

## To-Do

- [x] Payment forwarding
- [ ] Callback log
- [ ] Domain authorization
- [ ] Domain statistics

## Test

```
$ npm test
```
