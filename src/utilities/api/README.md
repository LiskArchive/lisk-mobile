# API Utilities for Lisk Mobile

## Account

### getSummary(tokenType: String, address: String) -> Promise
Retrieves account summary for related token from Node API.

```js
{
  address: String,
  balance: Number,
  initialized: Boolean,
}
```

### extractPublicKey(tokenType: String, passphrase: String) -> String)
Extracts public key from passphrase for given token.

### extractAddress(tokenType: String, passphrase: String) -> String
Extracts wallet address from passphrase for given token.


---


## Transactions

### get(tokenType: String, data: TransactionGetPayload) -> Promise(TransactionGetResult, TransactionGetError)
Retrieves transactions for related token with respect to the given payload.

#### TransactionGetPayload
```js
{
  id: String?,
  address: String?,
  limit: Number,
  offset: Number,
}
```

#### TransactionGetResult
```js
{
}
```

#### TransactionGetError
```js
{
}
```

### create(tokenType: String, data: TransactionCreatePayload) -> Promise(TransactionCreateResult, TransactionCreateError)
Creates a raw, ready-to-broadcast transaction data with given payload.

#### TransactionCreatePayload
```js
{
  passphrase: String,
  recipientAddress: String,
  amount: String,
  secondPassphrase: String?, // only used for Lisk
  data: String?, // only used for Lisk
}
```

#### TransactionCreateResult
```js
{
}
```

#### TransactionCreateError
```js
{
}
```

### broadcast(tokenType: String, data: TransactionBroadcastPayload) -> Promise(TransactionBroadcastResult, TransactionBroadcastError)
Broadcasts a transaction to the specified token's blockchain.

#### TransactionBroadcastPayload
```js
{
}
```

#### TransactionBroadcastResult
```js
{
}
```

#### TransactionBroadcastError
```js
{
}
```

---
