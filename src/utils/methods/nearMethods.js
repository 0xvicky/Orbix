import {KeyPair} from "near-api-js";
import { getAccountId } from "./generateKeyPairs";
const nearAPI = require("near-api-js");
const sha256 = require("js-sha256");
const BN = require("bn.js");
const bs58 = require("bs58");


export const fetchBalance = async (publicKey, networkType, privateKey) => {
  console.log(publicKey)
  const accountId = publicKey
  const connection = await nearConnection(accountId, networkType, privateKey);
  console.log(connection)
  try {
    // gets account balance
    const account = await connection.account(accountId);
    const balance = ((await account.getAccountBalance()).available / 10 ** 24).toFixed(2);
    console.log(balance);
    return balance;
  } catch (error) {
    console.log(`Error occured:${error}`);
    return 0;
  }
};

export const transferNear = async (
  signer,
  networkType,
  privateKey,
  publicKey,
  nearAmount
) => {
  if (privateKey.length === 96) {
    privateKey = privateKey.slice(8);
  }
  const receiver = publicKey
  const amount = nearAPI.utils.format.parseNearAmount(nearAmount);
  // const provider = new nearAPI.providers.JsonRpcProvider(
  //   `https://few-serene-dew.near-mainnet.quiknode.pro/8a6ce52775b1f360597c149ed986cb3ef4304ac7/`
  // );
  const provider = new nearAPI.providers.JsonRpcProvider(
    // `https://rpc.${networkType}.near.org`
    `https://rpc.${networkType}.fastnear.com`
  );

  const keyPair = KeyPair.fromString(privateKey);
  const pubKey = keyPair.getPublicKey();
  const accessKey = await provider.query(`access_key/${signer}/${pubKey.toString()}`, "");

  const nonce = ++accessKey.nonce;
  const actions = [nearAPI.transactions.transfer(amount)];
  const recentBlockHash = nearAPI.utils.serialize.base_decode(accessKey.block_hash);

  try {
    const transaction = nearAPI.transactions.createTransaction(
      signer,
      pubKey,
      receiver,
      nonce,
      actions,
      recentBlockHash
    );
    const serializedTx = nearAPI.utils.serialize.serialize(
      nearAPI.transactions.SCHEMA,
      transaction
    );
    const serializedTxHash = new Uint8Array(sha256.sha256.array(serializedTx));
    const signature = keyPair.sign(serializedTxHash);
    const signedTransaction = new nearAPI.transactions.SignedTransaction({
      transaction,
      signature: new nearAPI.transactions.Signature({
        keyType: transaction.publicKey.keyType,
        data: signature.signature
      })
    });
    // encodes transaction to serialized Borsh (required for all transactions)
    const signedSerializedTx = signedTransaction.encode();
    // sends transaction to NEAR blockchain via JSON RPC call and records the result
    const result = await provider.sendJsonRpc("broadcast_tx_commit", [
      Buffer.from(signedSerializedTx).toString("base64")
    ]);
    return result;
  } catch (e) {
    console.log(e);
  }
};

// Step 1: Get all access keys of a named account
async function getAccessKeys(namedAccount,contractId) {
  const NEAR_RPC = "https://rpc.testnet.near.org";
// const NFT_CONTRACT = "nft.whyvickyyy.testnet";
  const response = await fetch(NEAR_RPC, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "1",
      method: "query",
      params: {
        request_type: "view_access_key_list",
        finality: "final",
        account_id: namedAccount,
      },
    }),
  });

  const data = await response.json();
  console.log(data)
  return data.result.keys; // array of { public_key, access_key }
}


export const fetchAccountNFT = async (
  publicKey,
  accountId,
  networkType,
  privateKey,
  contractId,
  tokenId
) => {
  //near connection

  // console.log(publicKey, contractId)
  const connection = await nearConnection(accountId, networkType, privateKey);
  const account = await connection.account(accountId);
  //Interacting with contract
  const contract = new nearAPI.Contract(
    account, // the account  that is connecobjectting
    contractId,
    {
      // name of contract you're connecting to
      viewMethods: ["nft_token"], // view methods do not change state but usually return a value
      changeMethods: [] // change methods modify state
    }
  );
//   console.log("thiss")
// console.log(contract)
  const res = await contract.nft_token({
    token_id: tokenId,
    owner_id: accountId // argument name and value - pass empty object if no args required
  });
 console.log(res);
console.log(accountId);

if (res != null) {
  // If owner matches directly, return the NFT
  if (res.owner_id === accountId) {
    return {
      status: true,
      data: res,
    };
  }

  // Owner doesn't match — check if accountId has a key
  // that matches the wallet's public key
  console.log("owner mismatch, checking access keys...");

  const keys = await getAccessKeys(res.owner_id); // pass named account, not contractId
  console.log(keys);

  for (const key of keys) {
    const keyWithoutPrefix = key.public_key.slice(8); // removes "ed25519:"
    console.log(`Comparing: ${keyWithoutPrefix} === ${publicKey}`);

    if (keyWithoutPrefix === publicKey) {
      // Key matches — wallet owns this named account
      return {
           status: true,
        data: res,
      };
    }
  }

  // No matching key found
  return {
    status: true,
    data: null,
    message: "Public key does not match any key on the owner account",
  };
}

// res is null — token doesn't exist
return {
  status: false,
  data: null,
  message: "NFT not found",
};
  // return res;
};

export const transferNFT = async (
  tokenId,
  publicKey,
  contractId,
  recipient,
  networkType,
  privateKey
) => {
  const ownerId = publicKey
  const connection = await nearConnection(ownerId, networkType, privateKey);
  const account = await connection.account(ownerId);
  //Interacting with contract
  const contract = new nearAPI.Contract(
    account, // the account object that is connecting
    contractId,
    {
      // name of contract you're connecting to
      viewMethods: [], // view methods do not change state but usually return a value
      changeMethods: ["nft_transfer"] // change methods modify state
    }
  );
  try {
    const res = await contract.nft_transfer(
      {
        receiver_id: recipient,
        token_id: tokenId
      },
      30_000_000_000_000, // attached GAS (optional)
      new BN("1")
    );

    return {status: true, data: res};
  } catch (error) {
    console.log(`Error occured while transferring NFT:${error}`);
    return {status: false, data: error};
  }
};

export const nearConnection = async (accountId, networkType, privateKey) => {
  console.log("in nearConnection");
  // console.log("ed25519:"+privateKey);
  const keyPair = nearAPI.utils.KeyPair.fromString(privateKey);

  console.log(keyPair);
  const keyStore = new nearAPI.keyStores.InMemoryKeyStore();
  keyStore.setKey(networkType, accountId, keyPair);
  const config = {
    keyStore, // instance of InMemoryKeyStore
    networkId: networkType,
    nodeUrl: `https://rpc.${networkType}.fastnear.com`,
    // nodeUrl: `https://few-serene-dew.near-mainnet.quiknode.pro/8a6ce52775b1f360597c149ed986cb3ef4304ac7/`,
    walletUrl: `https://wallet.${networkType}.near.org`,
    helperUrl: `https://helper.${networkType}.near.org`,
    explorerUrl: `https://explorer.${networkType}.near.org`
  };

  // inside an async function
  const nearConnection = await nearAPI.connect(config);
  // console.log(nearConnection);
  return nearConnection;
};

