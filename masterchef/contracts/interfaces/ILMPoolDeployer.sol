// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "./IMagmaPool.sol";
import "./ILMPool.sol";

interface ILMPoolDeployer {
    function deploy(IMagmaPool pool) external returns (ILMPool lmPool);
}
