# API Utilities for Lisk Mobile

## Account

### getSummary(tokenType: String, address: String) -> Promise
Retrieves account summary for related token from Node API.

```js
{
  address: String,
  balance: Integer,
  initialized: Boolean,
}
```

### extractPublicKey(tokenType: String, passphrase: String) -> String)
Extracts public key from passphrase for given token.

### extractAddress(tokenType: String, passphrase: String) -> String
Extracts wallet address from passphrase for given token.
