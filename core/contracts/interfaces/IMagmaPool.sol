// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.5.0;

import './pool/IMagmaPoolImmutables.sol';
import './pool/IMagmaPoolState.sol';
import './pool/IMagmaPoolDerivedState.sol';
import './pool/IMagmaPoolActions.sol';
import './pool/IMagmaPoolOwnerActions.sol';
import './pool/IMagmaPoolEvents.sol';

/// @title The interface for a Magma Pool
/// @notice A Magma pool facilitates swapping and automated market making between any two assets that strictly conform
/// to the ERC20 specification
/// @dev The pool interface is broken up into many smaller pieces
interface IMagmaPool is
    IMagmaPoolImmutables,
    IMagmaPoolState,
    IMagmaPoolDerivedState,
    IMagmaPoolActions,
    IMagmaPoolOwnerActions,
    IMagmaPoolEvents
{

}
