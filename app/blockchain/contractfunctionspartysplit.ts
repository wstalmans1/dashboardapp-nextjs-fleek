import { ethers } from 'ethers';
import ContractABI from './contractABIpartysplit.json';

export const contractAddress = '0xd34CF2A413c29B058Fd2634d170180cEF38A92Ec';

// The functions getWeb3Provider and getContract are not smart contract specific and can remain untouched
/* 
export async function getWeb3Provider() {
  if (window.ethereum) {
    return new ethers.BrowserProvider(window.ethereum);
  } else {
    throw new Error('Please download Metamask');
  }
}
*/

export async function getContract(provider: ethers.BrowserProvider, signer: ethers.Signer): Promise<ethers.Contract> {
  return new ethers.Contract(contractAddress, ContractABI, signer);
}

export async function getTotalDeposits(provider: ethers.BrowserProvider, signer: ethers.Signer): Promise<bigint> {
    const contract = await getContract(provider, signer);
    const totalDeposits = await contract.totalDeposits(); // call the totalDeposits function
    return BigInt(totalDeposits); 
  }

export async function rsvp(provider: ethers.BrowserProvider, signer: ethers.Signer) {
  const contract = await getContract(provider, signer); // Await the resolution of the promise
  const cost = await contract.cost(); // get the cost value from the contract
  const tx = await contract.rsvp({ value: cost }); // send the transaction with the value
  await tx.wait(); // wait for transaction confirmation
  return tx.hash; // return transaction hash
}

export async function payBill(provider: ethers.BrowserProvider, signer: ethers.Signer, venueAddress: any, billAmount: any) {
  const contract = await getContract(provider, signer);
  //const billAmountInWei = ethers.utils.parseEther(billAmount); // Convert the bill amount to Wei
  const tx = await contract.payBill(venueAddress, billAmount); // send the transaction
  await tx.wait(); // wait for transaction confirmation
  return tx.hash; // return transaction hash
}