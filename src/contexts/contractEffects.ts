import React from "react";
import { ethers } from "ethers";
import { updateContract, addContract } from "./contractActions";
import { AlertContext } from "../contexts/alertProvider";
import { awaitTxAlert, removeTxAlert } from "../contexts/alertActions";
import { ContractsContext } from "../contexts/contractProvider";
import { updateUser } from "../contexts/userActions";
import { FACTORY_ADDRESS, factoryAbi } from "../contracts/index";
import { UserContext } from "./userProvider";
import { useWeb3Context } from "web3-react";
import customEscrowAbi from "../contracts/customEscrowAbi";
import artistAbi from "../contracts/artistAbi";
import { BetContext } from "./betProvider";
import { getBetsSuccess } from "./betActions";
import { ArtistContext } from "./artistProvider";
import { getArtistsSuccess } from "./artistActions";

export const useFactoryContract = () => {
  const alertContext = React.useContext(AlertContext);
  const artistContext = React.useContext(ArtistContext);
  const userContext = React.useContext(UserContext);
  const contractContext = React.useContext(ContractsContext);
  const betContext = React.useContext(BetContext);
  const web3Context = useWeb3Context();
  const contract = contractContext.state[FACTORY_ADDRESS];
  const signer = web3Context.library.getSigner();

  const newArtistContract = (address: string) => {
    return new ethers.Contract(address, artistAbi, signer);
  };

  const addContractToContext = (instance: any) => {
    contractContext.dispatch(
      addContract({
        name: instance.address,
        contract: instance,
      })
    );
  };

  const initializeFactory = async () => {
    const newFactoryContract = new ethers.Contract(
      FACTORY_ADDRESS,
      factoryAbi,
      signer
    );
    addContractToContext(newFactoryContract);
  };

  const getUserDetails = async () => {
    try {
      const userDetails = await contract.getUserInfo();
      let userBalances = await web3Context.connector.fortmatic.user.getBalances();
      userContext.dispatch(
        updateUser({
          ...userDetails,
          balance: userBalances[0].crypto_amount_display,
          account: web3Context.account,
        })
      );
    } catch (e) {
      console.log(e);
    }
  };

  const updateImage = async (ipfsHash: string) => {
    try {
      const tx = await contract.updateImage(ipfsHash);
      alertContext.dispatch(awaitTxAlert(tx));
      await tx.wait();
      alertContext.dispatch(removeTxAlert(tx));
      getUserDetails();
    } catch (e) {
      console.log(e);
    }
  };

  const asyncForEach = async (array: string[]) => {
    let obj = {};
    for (let i = 0; i < array.length; i++) {
      const address = array[i];
      const instance = newArtistContract(address);
      addContractToContext(instance);
      const details = await instance.artistDetails();
      obj = {
        ...obj,
        [`${address}`]: {
          address: address,
          name: details.name,
          owner: details.owner,
          genre: details.genre,
          bio: details.bio,
          location: details.location,
          imageHash: details.imageHash.toString(),
          projectCount: details.projectCount.toString(),
          merchCount: details.merchCount.toString(),
        },
      };
    }
    return obj;
  };

  const createArtist = async (params: {
    name: string;
    symbol: string;
    genre: string;
    bio: string;
    location: string;
    ipfsHash: string;
  }) => {
    const { name, symbol, genre, bio, location, ipfsHash } = params;
    try {
      let tx = await contract.createArtist(
        name,
        symbol,
        genre,
        bio,
        location,
        ipfsHash
      );
      alertContext.dispatch(awaitTxAlert(tx));
      let receipt = await tx.wait(2);
      let event = receipt.events.pop();
      let newContractAddress = event.args[0];
      alertContext.dispatch(removeTxAlert(tx));
      let obj = await asyncForEach([newContractAddress]);
      artistContext.dispatch(getArtistsSuccess(obj));
    } catch (e) {
      console.log(e);
    }
  };

  const getBets = async () => {
    try {
      const bets = await contract.getBets(25);
      let obj = await asyncForEach(bets);
      betContext.dispatch(getBetsSuccess(obj));
    } catch (e) {}
  };

  const getLatestArtists = async () => {
    try {
      const artists = await contract.getLatestArtists(25);
      let obj = await asyncForEach(artists);
      artistContext.dispatch(getArtistsSuccess(obj));
    } catch (e) {}
  };

  const addToBet = async (contractAddress: string, amount: string) => {
    var wei = ethers.utils.parseEther(amount);

    try {
      let tx = await contract.addToEscrow(contractAddress, {
        gasLimit: 75000,
        value: wei,
      });
      alertContext.dispatch(awaitTxAlert(tx));
      let receipt = await tx.wait(2);
      let event = receipt.events.pop();
      let newBalance = event.args[0];
      alertContext.dispatch(removeTxAlert(tx));

      const newBetDetails = {
        ...betContext.state.bets[contractAddress],
        balance: newBalance.toString(),
      };
      betContext.dispatch(
        getBetsSuccess({ [`${contractAddress}`]: newBetDetails })
      );
    } catch (e) {
      console.log(e);
    }
  };

  return {
    initializeFactory,
    createArtist,
    getUserDetails,
    updateImage,
    getBets,
    addToBet,
    getLatestArtists,
  };
};

export const updateCount = async (contract: any, dispatch: any) => {
  try {
    const count = await contract.betCount();
    console.log(count, contract.address);
    dispatch(
      updateContract({
        name: contract.address,
        data: { count: count.toString() },
      })
    );
  } catch (e) {
    // dispatch(readFailure(e));
  }
};
