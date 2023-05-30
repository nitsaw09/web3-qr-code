# Web3 QR Code

This is an npm package that provides functions to generate QR codes for multi blockchain like Ethereum, Bitcoin, and Solana cryptocurrencies.

## Installation
Install the package using npm:
```shell
npm install web3-qr-code
```
## Usage
Import the package and create an instance of the QrCode class:

```javascript
import { QrCode } from 'qr-code-generator';
const qrCode = new QrCode();
```

### Generate Ethereum QR Code
1. Generate an Ethereum QR code for transfer of eth by calling the generateETHqrCode method with the required parameters:
```javascript
const params = {
  from: 'sender-address',
  to: 'recipient-address',
  value: 0.5,
  chainId: 1
};

const qrCodeDataURL = await qrCode.generateETHqrCode(params);
console.log(qrCodeDataURL);
```

2. Generate an Ethereum QR code for smart contract transaction by calling the generateETHqrCode method with the required parameters:
```javascript
const params = {
  from: '0xF9d3C2Adc0dA3B68621fCcFA7c51B66eAf000a05',
  to: '0xdac17f958d2ee523a2206206994597c13d831ec7', // contract address
  value: 0,
  chainId: 1,
  functionName: 'transfer', // smart contract method
  functionArgs: [
    { name: 'to', type: 'address', value: '0xF9d3C2Adc0dA3B68621fCcFA7c51B66eAf000f0c' },
    { name: 'amount', type: 'uint256', value: 1000 },
  ],
};

const qrCodeDataURL = await qrCode.generateETHqrCode(params);
console.log(qrCodeDataURL);
```

### Generate Bitcoin QR Code
Generate a Bitcoin QR code by calling the generateBTCqrCode method with the required parameters:
```javascript
const params = {
  to: 'bitcoin-address',
  amount: 0.001,
  label: 'Payment for goods',
  message: 'Optional message',
  extra: [
    { key: 'param1', value: 'value1' },
    { key: 'param2', value: 12345 },
  ],
};

const qrCodeDataURL = await qrCode.generateBTCqrCode(params);
console.log(qrCodeDataURL);
```

### Generate Solana QR Code
1. Generate a Solana QR code for transfer of sol by calling the generateSOLqrCode method with the required parameters:
```javascript
const params = {
  to: 'solana-address',
  amount: 1.234,
  label: 'Payment for services',
  memo: 'Optional memo',
  feePayer: 'fee-payer-address'
};

const qrCodeDataURL = await qrCode.generateSOLqrCode(params);
console.log(qrCodeDataURL);
```

2. Generate a Solana QR code for smart contract method transaction by calling the generateSOLqrCode method with the required parameters:
```javascript
const params = {
  to: 'solana-address',
  amount: 1.234,
  label: 'Payment for services',
  memo: 'Optional memo',
  delegate: 'delegate-address',
  authorized: 'authorized-address',
  programId: 'program-id',
  methodName: 'method-name',
  args: { arg1: 'value1', arg2: 12345 },
  feePayer: 'fee-payer-address',
  referral: 'referral-address',
};

const qrCodeDataURL = await qrCode.generateSOLqrCode(params);
console.log(qrCodeDataURL);
```
## Interfaces
### IFuncArgs
Represents an Ethereum contract function argument.
- ```name (string)```: The name of the argument.
- ```type (string)```: The type of the argument.
- ```value (string or number)```: The value of the argument.

### IETHqrCode
Represents the parameters for generating an Ethereum QR code.
- ```from (string, optional)```: The sender address.
- ```to (string)```: The recipient address.
- ```value (number, optional)```: The value to be sent (in ETH).
- ```chainId (number, optional)```: The Ethereum chain ID.
- ```functionName (string, optional)```: The name of the contract function.
- ```functionArgs (IFuncArgs[], optional)```: The arguments for the contract function.

### IExtra
Represents an extra parameter for Bitcoin QR code.
- ```key (string)```: The key of the parameter.
- ```value (string or number)```: The value of the parameter.

### IBTCqrCode
Represents the parameters for generating a Bitcoin QR code.
- ```to (string)```: The recipient address.
- ```amount (number, optional)```: The amount to be sent (in BTC).
- ```label (string, optional)```: A label for the transaction.
- ```message (string, optional)```: An optional message.
- ```extra (IExtra[], optional)```: Extra parameters for the QR code.

### ISOLqrCode
Represents the parameters for generating a Solana QR code.
- ```to (string)```: The recipient address.
- ```amount (number, optional)```: The amount to be sent (in SOL).
- ```label (string, optional)```: A label for the transaction.
- ```memo (string, optional)```: An optional memo.
- ```delegate (string, optional)```: The delegate address.
- ```authorized (string, optional)```: The authorized address.
- ```programId (string, optional)```: The program ID.
- ```methodName (string, optional)```: The method name.
- ```args (any, optional)```: Additional arguments for the method.
- ```feePayer (string, optional)```: The fee payer address.
- ```referral (string, optional)```: The referral address.

