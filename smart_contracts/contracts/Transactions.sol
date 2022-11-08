//SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract Transactions {
    uint256 transactionsCounter;

    event Transfer(
        uint amount,
        address indexed sender,
        address indexed receiver,
        uint256 timestamp,
        string message,
        string keyword
    ); //Yeh event call karke given amount transfer hojayega from one address to another

    struct TransferStruct{
        uint amount;
        address sender;
        address receiver;
        uint256 timestamp;
        string message;
        string keyword;
    } //The details of the transaction that took place
    
    TransferStruct[] transactions; //Creating an array to store details of a transaction

    //Everytime this function gets called, you add the txn info to the array
    //and increase the txn count by 1.
    function addToBlockchain(
         address payable receiver,
         uint amount,
         string memory message,
         string memory keyword
         ) 
         public
    {
        transactionsCounter +=1;
        transactions.push(TransferStruct(amount, msg.sender, receiver, block.timestamp, message, keyword)); //Storing the transaction into the array 
        emit Transfer(amount, msg.sender, receiver, block.timestamp, message, keyword);
    } 

    function getAllTransactions() public view returns(TransferStruct[] memory) {
        return transactions;        
    } //pura array return karega

    function getTransactionCount () public view returns(uint256){
        return transactionsCounter;
    } //Total kitne transactions hue hai woh show karega

}
