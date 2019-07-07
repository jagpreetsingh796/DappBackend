const ethers = require('ethers');
const express = require('express')
const bodyParser = require('body-parser')
const server=express()
server.use(bodyParser.json());
const aa=require('../build/contracts/Bank.json')
require('dotenv').config()
const pk=process.env.privatekey
// console.log("The private key is",pk)
// console.log("the private key is",pk)
let provider = ethers.getDefaultProvider("rinkeby");
let wallet = new ethers.Wallet(pk,provider)
let bytecode=aa.code
let abi=aa.abiDefinition


	
		
				
let balance
let factory = new ethers.ContractFactory(abi, bytecode, wallet);
// async function deploythecontract()
// {
//     let contract = await factory.deploy()
//     await contract.deployed()
//     console.log(contract)
// }

// deploythecontract()

let address='0xc7ab4A3a260C4fC9984602874Ed542E1CC9092A4'
let contract = new ethers.Contract(address, abi, provider);
contractWithSigner=contract.connect(wallet)
//  console.log(contractWithSigner)
async function openAccount(name,age,region,typeOfAccount,amount)
{
    
let tx1= await contractWithSigner.openAccount(name,age,region,typeOfAccount,{value:ethers.utils.parseEther(amount)})
console.log(tx1)
  



 }

 async function checkbalanceofUSER(name)
{
    let bal = await contractWithSigner.callBalance(name)
    console.log("Mehrad checkbalance function is",bal.toString())
    return(bal.toString())

}
checkbalanceofUSER("Mehrad")

async function withdrawfrom(amount,name)
{
    let tx=await contractWithSigner.withdraw(ethers.utils.parseEther(amount),name)
    
     console.log(tx)
   
     
   
    
}
async function checkbankbalance()
{
    let bal = await contractWithSigner.checkbalanceofbank()
    // console.log("The balance of the bank  is",bal.toNumber())
    return(bal.toString())

}

// withdrawfrom("0.000000001","Jagpreet")
// checkbalanceofUSER("Arjun")
server.post('/getbal', async (request, response) => {
    let name=request.body.name
    let value=await checkbalanceofUSER(name)

    
    response.send(value.toString());
  });
server.post('/openAccount',async(request,response)=>
{
    let name=request.body.name
    let age=request.body.age
    let region=request.body.region
    let typeOfAccount=request.body.type
    let amount=request.body.amount
    let tx= await openAccount(name,age,region,typeOfAccount,amount)
    response.send("Account Created")



})

server.post('/withdraw',async(request,response)=>
{
    let amount=request.body.amount
    let name=request.body.name
    let bal
   await withdrawfrom(amount,name)
   await setTimeout(async function(){
    bal=await contractWithSigner.callBalance(name)

    console.log("The balance after withdrawal is",bal.toString())
    response.send(bal.toString())
    
},17000)
    
    

})
server.get('/getbalofbank',async(request,response)=>
{
   
    let value= await checkbankbalance()
    console.log("THe bank's balance is",value)
    response.send(value)

})

server.listen(process.env.PORT,()=>{
    console.log("The server is running at",process.env.PORT)
})
// export {server}
// module.exports=server

