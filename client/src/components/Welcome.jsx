import React, {useContext} from 'react';
import { AiFillPlayCircle } from "react-icons/ai"
import Loader from "./Loader"
import { TransactionContext } from '../context/TransactionContext';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { shortenAddress } from '../utils/shortenAddress';

const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input
      placeholder={placeholder}
      type={type}
      step="0.0001"
      value={value}
      onChange={(e) => handleChange(e, name)}
      className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
    />
  );

const Welcome = () => {
    const {connectWallet, currentAccount, handleChange, sendTransaction, formData,isLoading} = useContext(TransactionContext);

    const handleSubmit = (e) => {
        const {addressTo, amount, keyword, message} = formData;
        
        e.preventDefault();
        //Agar ek bhi field empty ho to transaction 
        if(!addressTo||!amount||!keyword||!message) return;
        
        sendTransaction();
    }

    return (
        <div className="flex w-full justify-center items-center">
            <div className="flex md:flex-row flex-col items-start justify-between md:p-20 py-2 px-4">
            <div className="flex flex-1 justify-start flex-col md:mr-10">
            <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
                Send Crypto 
            <br/>
            across the World.
            </h1>
            <p className="text-left text-white font-light md:w-10/12 mt-10 ">
                Explore the crypto world. 
                Buy and sell cryptocurrencies easily on <b><i>ncrypt</i></b>
            </p>
            {(!currentAccount) ?
            (<button
            type="button"
            onClick={connectWallet}
            className="flex flex-row text-white font-semibold bg-[#2961e3] rounded-full justify-center py-3 my-5 hover:bg-[#3a9bcc]"
            >
                Connect Wallet
            </button>
            )
            :
            <p
                type="button"
                className="flex flex-row text-white font-semibold bg-[#2961e3] rounded-full justify-center py-3 my-5 "
                >
                    Connected to {shortenAddress(currentAccount)}
                </p>
            }
            <Carousel 
            stopOnHover={true}
            forceFocus = {  true}
            showArrows={true} autoPlay={true} showStatus={false} showIndicators={false} bindEvents={true} infiniteLoop={true} className="text-white ">
            <div className="pt-4">
                <h1>Reliable</h1>
                </div>
                <div className="pt-4">
                <h1>Fast</h1>
                </div>
                <div className="pt-4">
                <h1>Secure</h1>
                </div>
                <div className="pt-4">
                <h1>Web 3.0</h1>
                </div>
                <div className="pt-4">
                <h1>Transactions</h1>
                </div>
                <div className="pt-4">
                <h1>Low Fees</h1>
                </div>
            </Carousel>
            </div>
            <div className="CardContainer flex flex-col flex-1 items-center justify-start">
                <div className="Card p-3 justify-end sm:w-72 mt-5 w-full h-40 eth-card white-glassmorphism my-5">
                    <div className="flex justify-between flex-col w-full h-full">
                        <div className="flex justify-between items-start">
                         <div className="text-white font-light ">
                            Credit Card
                         </div>
                        </div>
        
                        <div className="text-white font-light">
                            Address
                            <div className="text-white font-semibold">
                            Ethereum
                            </div>
                        </div>

                    </div>
                 </div>
                <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
                <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange}/>
                <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange}/>
                <Input placeholder="Keyword (Gif)" name="keyword" type="text" handleChange={handleChange}/>
                <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange}/>
                    
                       
                   
                     
             {isLoading
              ? <Loader />
              : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="
                  text-white mt-3 bg-[#2961e3] py-2 w-full px-7 rounded-xl cursor-pointer hover:bg-[#3a9bcc]" >
                   Send ETH
                </button>
              )}
                </div>
            </div>
            </div>
        </div>
    )
}

export default Welcome


