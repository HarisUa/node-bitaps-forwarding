"use strict";
let chai = require("chai");
let chaiHttp = require("chai-http");
let should = chai.should();
let Bitaps = require("../dist/index.js");

chai.use(chaiHttp);

describe("Bitaps:", () => {
  let eth = "0x65a502a96b7da631b68101b3f7b193448dac36a4";
  let bitaps = new Bitaps("eth", eth);
  it("Create ethereum wallet", async () => {
    let create = await bitaps.address();
    should.equal(eth.toLowerCase(), create.forwarding_address.toLowerCase());
    should.equal("ETH", create.currency);
  });
  it("Change currency to btc", done => {
    bitaps.currency = "btc";
    should.equal(bitaps.currency, "btc");
    done();
  });

  let stateInfo;

  it("Create bitcoin wallet", async () => {
    let btc = "3DMXHXYfCQLBGxnHvgEY54CTpNvsFX9NYs";
    let create = await bitaps.address(btc);
    stateInfo = {
      token: create.payment_code,
      address: create.address
    };
    should.equal(btc.toLowerCase(), create.forwarding_address.toLowerCase());
    should.equal("BTC", create.currency);
  });

  it("Get Payment State", async () => {
    let state = await bitaps.state(stateInfo.address);
    should.equal(stateInfo.address, state.address);
    should.equal("BTC", state.currency);
    should.not.exist(state.type);
  });

  it("Get Full Payment State", async () => {
    let state = await bitaps.state(stateInfo.address, stateInfo.token);
    should.equal(stateInfo.address, state.address);
    should.equal("BTC", state.currency);
    should.exist(state.type);
  });

  it("Get Transactions", async () => {
    bitaps.currency = "eth";
    let transactions = await bitaps.transactions(
      "0x4EdB7aAa53b0EF834c68011e1b74f13caFB234BA",
      {
        from: 1563973266,
        to: 1563973268
      },
      "PMTv9SMQ8Q8u3XT23TssGEzY6ds22hmk5w6jtHshJLC7UMSVhAi5f "
    );
    should.equal(
      "0x4EdB7aAa53b0EF834c68011e1b74f13caFB234BA",
      transactions.address
    );
    should.equal(1, transactions.tx_list.length);
  });
});
