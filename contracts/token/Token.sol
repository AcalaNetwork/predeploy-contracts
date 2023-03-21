// SPDX-License-Identifier: GPL-3.0-or-later

// Based on ERC20 implementation of @openzeppelin/contracts (v4.5.0):
// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.5.0/contracts/token/ERC20/ERC20.sol

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "./MultiCurrency.sol";

/// @title MultiCurrency Predeploy Contract
/// @author Acala Developers
/// @notice You can use this predeploy contract to call currencies pallet
/// @dev This contracts will interact with currencies pallet
contract Token is IERC20 {
    using SafeMath for uint256;

    mapping (address => mapping (address => uint256)) private _allowances;

    /// @notice Get the name of the token.
    /// @return Returns the name of the token.
    function name() public view returns (string memory) {
        return MultiCurrency.name();
    }

    /// @notice Get the symbol of the token, usually a shorter version of the name.
    /// @return Returns the symbol of the token.
    function symbol() public view returns (string memory) {
        return MultiCurrency.symbol();
    }

    /// @notice Get the number of decimals used to get its user representation.
    /// @return Returns the number of decimals.
    function decimals() public view returns (uint8) {
        return MultiCurrency.decimals();
    }

    /// @notice Get the amount of tokens in existence.
    /// @return Returns amount of tokens in existence.
    function totalSupply() public view override returns (uint256) {
        return MultiCurrency.totalSupply();
    }

    /// @notice Get the amount of tokens owned by `account`.
    /// @param account The specified user.
    /// @return Returns the amount of tokens owned by `account`.
    function balanceOf(address account) public view override returns (uint256) {
        return MultiCurrency.balanceOf(account);
    }

    /// @notice Moves `amount` tokens from the caller's account to `to`.
    /// @dev It'll emit an {Transfer} event. The caller must have a balance of at least `amount`.
    /// @param to The dest address, it cannot be the zero address.
    /// @param amount The transfer amount.
    /// @return Returns a boolean value indicating whether the operation succeeded.
    function transfer(address to, uint256 amount) public override returns (bool) {
        address owner = msg.sender;
        _transfer(owner, to, amount);
        return true;
    }

    /// @notice Get the remaining number of tokens that `spender` will be allowed to spend.
    /// @param owner The owner address.
    /// @param spender The spender address.
    /// @return Returns the remaining number of tokens that `spender` will be allowed to spend on behalf of `owner` through {transferFrom}. This is zero by default.
    function allowance(address owner, address spender) public view override returns (uint256) {
        return _allowances[owner][spender];
    }

    /// @notice Sets `amount` as the allowance of `spender` over the caller's tokens.
    /// @dev It'll emit an {Approval} event. If `amount` is the maximum `uint256`, the allowance is not updated on `transferFrom`. This is semantically equivalent to an infinite approval.
    /// @param spender Approve the spender.
    /// @param amount The approve amount.
    /// @return Returns a boolean value indicating whether the operation succeeded.
    function approve(address spender, uint256 amount) public override returns (bool) {
        address owner = msg.sender;
        _approve(owner, spender, amount);
        return true;
    }

    /// @notice Moves `amount` tokens from `from` to `to` using the allowance mechanism. `amount` is then deducted from the caller's allowance.
    /// @dev It'll emit an {Transfer} event.
    /// @param from Transfer amount from the address. The caller must have allowance for ``from``'s tokens of at least `amount`. It cannot be the zero address.
    /// @param to Transfer amount to the address. It cannot be the zero address.
    /// @param amount The transfer amount.
    /// @return Returns a boolean value indicating whether the operation succeeded.
    function transferFrom(address from, address to, uint256 amount) public override returns (bool) {
        address spender = msg.sender;
        _spendAllowance(from, spender, amount);
        _transfer(from, to, amount);
        return true;
    }

    /// @dev Atomically increases the allowance granted to `spender` by the caller.
    /// This is an alternative to {approve} that can be used as a mitigation for problems described in {IERC20-approve}.
    /// Emits an {Approval} event indicating the updated allowance.
    /// @param spender It cannot be the zero address.
    /// @param addedValue The added value.
    /// @return Returns a boolean value indicating whether the operation succeeded.
    function increaseAllowance(address spender, uint256 addedValue) public returns (bool) {
        address owner = msg.sender;
        _approve(owner, spender, _allowances[owner][spender] + addedValue);
        return true;
    }

    /// @dev Atomically decreases the allowance granted to `spender` by the caller.
    /// This is an alternative to {approve} that can be used as a mitigation for problems described in {IERC20-approve}.
    /// Emits an {Approval} event indicating the updated allowance.
    /// @param spender must have allowance for the caller of at least `subtractedValue`. It cannot be the zero address.
    /// @param subtractedValue The subtracted value.
    /// @return Returns a boolean value indicating whether the operation succeeded.
    function decreaseAllowance(address spender, uint256 subtractedValue) public returns (bool) {
        address owner = msg.sender;
        uint256 currentAllowance = _allowances[owner][spender];
        require(currentAllowance >= subtractedValue, "ERC20: decreased allowance below zero");
        unchecked {
            _approve(owner, spender, currentAllowance - subtractedValue);
        }

        return true;
    }

    /// @dev Moves `amount` of tokens from `sender` to `recipient`.
    /// This internal function is equivalent to {transfer}, and can be used to.
    /// e.g. implement automatic token fees, slashing mechanisms, etc.
    /// Emits a {Transfer} event.
    /// @param from must have a balance of at least `amount`. It cannot be the zero address.
    /// @param to It cannot be the zero address.
    function _transfer(address from, address to, uint256 amount) internal {
        require(from != address(0), "ERC20: transfer from the zero address");
        require(to != address(0), "ERC20: transfer to the zero address");

        MultiCurrency.transfer(from, to, amount);

        emit Transfer(from, to, amount);
    }

    /// @dev Sets `amount` as the allowance of `spender` over the `owner` s tokens.
    /// This internal function is equivalent to `approve`, and can be used to.
    /// e.g. set automatic allowances for certain subsystems, etc.
    /// Emits an {Approval} event.
    /// @param owner cannot be the zero address.
    /// @param spender cannot be the zero address.
    function _approve(address owner, address spender, uint256 amount) internal {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }

    /// @dev Spend `amount` form the allowance of `owner` toward `spender`.
    /// Does not update the allowance amount in case of infinite allowance.
    /// Revert if not enough allowance is available.
    /// Might emit an {Approval} event.
    function _spendAllowance(
        address owner,
        address spender,
        uint256 amount
    ) internal {
        uint256 currentAllowance = allowance(owner, spender);
        if (currentAllowance != type(uint256).max) {
            require(currentAllowance >= amount, "ERC20: insufficient allowance");
            unchecked {
                _approve(owner, spender, currentAllowance - amount);
            }
        }
    }
}
