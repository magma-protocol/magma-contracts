// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity =0.7.6;

import '../base/PeripheryImmutableState.sol';

contract PeripheryImmutableStateTest is PeripheryImmutableState {
    constructor(address _deployer, address _factory, address _WBIT) PeripheryImmutableState(_deployer, _factory, _WBIT) {}
}
