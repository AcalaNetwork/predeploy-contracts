const { TestProvider, AccountSigningKey } = require('@acala-network/bodhi');
const { WsProvider } = require('@polkadot/api');
const { createTestPairs } = require('@polkadot/keyring/testingPairs');

const LOCAL_WS_URL = 'ws://127.0.0.1:9944';
const testPairs = createTestPairs();
const DEFAULT_ORACLE_PRICE = [
    [{ Token: 'AUSD' }, '1000000000000000000'],
    [{ Token: 'DOT' }, '17387000000000000000'],
    [{ Token: 'ACA' }, '10267010356479'],
    [{ Token: 'LDOT' }, '7015000000000000000'],
    [{ Token: 'RENBTC' }, '25559881000000002000000'],
];

async function getTestProvider() {
    const provider = new TestProvider({
        provider: new WsProvider(LOCAL_WS_URL),
    });

    await provider.isReady();
    const pair = testPairs.alice;
    const signingKey = new AccountSigningKey(provider.api.registry);
    signingKey.addKeyringPair(pair);
    provider.api.setSigner(signingKey);
    return provider;
};

async function feedTestOraclePrices(provider) {
    provider.api.tx.acalaOracle
        .feedValues(DEFAULT_ORACLE_PRICE)
        .signAndSend(testPairs.alice.address);
}

module.exports = { getTestProvider, feedTestOraclePrices };