List of functions

function openAccount(string memory _name,uint _age,string memory _region,string memory _typeofAccount)public payable

function withdraw(string name,uint amount)public

function checkbalanceofbank() public onlyManager view returns(uint)

function Userbalance(string name) private view returns(uint)

function callBalance(string name) public view returns(uint)

Use Case

This is banking smart contract.In order to open an account you have to send minimum 1 ether along with the attributes.

Like any other bank we are able to deposit and withdraw amount from our account.

We are also able to transfer amount to any address using the transferto function.

We have to specify the amount in wei.We can check individual balances by calling the callBalance function which in turn calls the Userbalance function which is a private function.

We can also check the total amount of ether in our bank by calling the checkbalanceofbank functions.

Contract Address deployed on Rinkeby test net '0xc7ab4A3a260C4fC9984602874Ed542E1CC9092A4'

I was not able to host the backend after plenty of efforts so my backend is running on localhost port 3003 and my private key is "136D4DCCD7A09A92215B0046134F35425225795896D65A28FDDC819E09D90182"

In order to handle the CORS issue I have used this extension https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi
as you may face this issue while running the Dapp

My frontend url is https://dapp1-25cb4.firebaseapp.com/

Name
Kirpal Singh
Jagpreet Singh Gurudatta
Naveen Bathal

