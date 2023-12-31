# Magma Core

This repository contains the core smart contracts for the Magma Protocol.
For higher level contracts, see the [periphery](../periphery/)
repository.

## Local deployment

In order to deploy this code to a local testnet, you should install the npm package
`@magmaswap/core`
and import the factory bytecode located at
`@magmaswap/core/artifacts/contracts/MagmaFactory.sol/MagmaFactory.json`.
For example:

```typescript
import {
  abi as FACTORY_ABI,
  bytecode as FACTORY_BYTECODE,
} from "@magmaswap/core/artifacts/contracts/MagmaFactory.sol/MagmaFactory.json";

// deploy the bytecode
```

This will ensure that you are testing against the same bytecode that is deployed to
mainnet and public testnets, and all PancakeSwap code will correctly interoperate with
your local deployment.

## Using solidity interfaces

The PancakeSwap v3 interfaces are available for import into solidity smart contracts
via the npm artifact `@magmaswap/core`, e.g.:

```solidity
import '@magmaswap/core/contracts/interfaces/IMagmaPool.sol';

contract MyContract {
  IMagmaPool pool;

  function doSomethingWithPool() {
    // pool.swap(...);
  }
}

```
