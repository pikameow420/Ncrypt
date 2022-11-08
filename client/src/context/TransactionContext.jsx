import React, {useEffect, useState} from 'react';
import {ethers} from 'ethers';

import {contractABI, contractAddress} from '../utils/constants'

export const TransactionContext = React.createContext(); 

const {ethereum} = window; //React DOM ka window jismei we will search for ethereum object (Basically a wallet)

const getEthereumContract = () => {
    const provider =  new ethers.providers.Web3Provider(ethereum);
    const signer =  provider.getSigner();
    const transactionContract =  new ethers.Contract(contractAddress, contractABI, signer);
   return transactionContract;
}

export const TransactionProvider = ({children}) =>{

    // initial state empty string hoga jabtak wallet connect nahi hota
    const [currentAccount, setCurrentAccount] =useState('') 
    const [formData, setformData] = useState({ addressTo: "", amount: "", keyword: "", message: ""});
    const [isLoading, setIsLoading] =  useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
    const [transactions, setTransactions] = useState([])
    
    const handleChange = (e, name) => {
        setformData((prevState) => ({ ...prevState, [name]: e.target.value }));  // ...x is a spread function used to copy an array
      };

    const getAllTransactions = async () => {
        try {
        if(!ethereum)return alert("Please install Metamask")

        const transactionContract = getEthereumContract();
            
        const availableTransactions = await transactionContract.getAllTransactions()   
        
        const structuredTransactions = availableTransactions.map((transaction)=>({
            addressTo: transaction.receiver,
            addressFrom: transaction.sender,
            timestamp:new Date(transaction.timestamp.toNumber()*1000).toLocaleString(),
            message: transaction.message,
            keyword:transaction.keyword,
            amount: parseInt(transaction.amount._hex)/(10**18)
        }))
        
        setTransactions(structuredTransactions)
        console.log(structuredTransactions);
        
    } catch (error) {
            console.log(error);
        }
    }

    const walletConnectCheck = async ()=> {
        if(!ethereum)return alert("Please install Metamask")

    //window.ethereum objects use karenge abhi
    const accounts = await ethereum.request({method:'eth_accounts'}); //Sends a request for a metamask account
    try {
    if(accounts.length){
        setCurrentAccount(accounts[0]);

        getAllTransactions();
    }
    else{
        console.log('No accounts found');
    }
  } catch (error) {
    throw new Error("No ethereum object");
  } 
    
    }   

    const checkIfTransactionsExist = async ()=>{
        try {
            const transactionContract = getEthereumContract();
            const transactionCount  = await transactionContract.getTransactionCount();
            window.localStorage.setItem("transactionCount",transactionCount)
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object");
        }
    }



    const connectWallet = async () =>{
        try {
            if(!ethereum)return alert("Please install Metamask")

             const accounts = await ethereum.request({method:'eth_requestAccounts'});

             setCurrentAccount(accounts[0]);
             console.log(accounts);
        } 
        catch (error) {
            console.log(error);
            throw new Error("No ethereum object");
        }
    }

    const sendTransaction = async() =>{
        try {
            if(!ethereum)return alert("Please install Metamask");
            
            const{addressTo, amount, keyword, message} = formData;

            const transactionContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);

            await ethereum.request({
                method: "eth_sendTransaction",
                params: [{
                  from: currentAccount,
                  to: addressTo,
                  gas: '0x5208',
                  value: parsedAmount._hex,
                }],
              });

              //Now we shall store the transaction
              const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount,message, keyword);

              setIsLoading(true);
              console.log('Loading - transaction hash: ' + transactionHash);

              await transactionHash.wait();
              setIsLoading(false);
              console.log('Success - transaction hash: ' + transactionHash);

              const transactionCount  = await transactionContract.getTransactionCount();

            setTransactionCount(transactionCount.toNumber());

        } catch (error) {
            console.log(error);
        }
    }
    
  


    useEffect(()=>{
        walletConnectCheck();
        checkIfTransactionsExist();
    },[]);
    return(
        <TransactionContext.Provider value={{connectWallet,currentAccount,formData,setformData,handleChange,sendTransaction,transactions,isLoading}}>
            {children}
        </TransactionContext.Provider>
    )
}


