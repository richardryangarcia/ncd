import React from "react";
import { useFactoryContract } from "../../contexts/contractEffects";
import { useWeb3Context } from "web3-react";
const Box = require("3box");

export const App: React.FC<any> = ({ children }) => {
  const { getUserDetails } = useFactoryContract();

  React.useEffect(() => {
    const getUser3box = async () => {
      const profile = await Box.getProfile(
        "0xB2a832Fd3d60E6cA9545A5882e0bE1fa03F23DE2"
      );
      console.log(profile);
    };
    getUserDetails();
    // getUser3box();
  }, []);

  return <div>{children}</div>;
};
