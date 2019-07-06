pragma solidity ^0.5.0;

contract Bank
{
    address manager;
    
    struct customer
    {
        string name;
        uint age;
        uint256 blocknumber;
        string region;
        string typeofAccount;
    }
    
    
    customer[]  public customerlist;
    uint  public custCount;
    
    mapping(string=>uint) balances;
    
    event bal(uint amount,string name);
    
    constructor()public
    {
        manager=msg.sender;
        custCount=0;
        
    }
    
    modifier onlyManager()
    {
        require(msg.sender==manager,"you are not the manager");
        _;
        
    }
    /* In order to open the account you have to send minimum 1 ether when you call the function**/
    function openAccount(string memory _name,uint  _age,string memory _region,string memory _typeofAccount)public  payable
    {
        
        require(msg.value >100000000,"insufficient amount");
        customerlist.push(customer(_name,_age,block.number,_region,_typeofAccount));
        custCount++;
        
        balances[_name]=msg.value;
        emit bal(msg.value,_name);
        
       
    }
    /*In order to withdraw amount from your account you need to have suffiecient balance which is stored in the balances mapping the amount has to be specified in wei **/
    function withdraw(uint amount,string memory _name)public{
        require(amount<=balances[_name],"insufficient balance");
        balances[_name]=balances[_name]-amount;
        msg.sender.transfer(amount);
        
    }
    /* You can add money to your account by calling the deposit function and its payable **/
    function deposit(string memory _name)public payable{
        balances[_name]=balances[_name]+msg.value;
    }
    
    
    
    /* The person who deployed the contract is the manager and only he can call this function to check the total amount present in the bank **/
   function checkbalanceofbank() public onlyManager view returns(uint){
       return(address(this).balance);
   }
    /* This is a private function which is internally called by the callBalance and returns the Userbalance **/
    
    function Userbalance(string memory _name) private view returns(uint){
        return(balances[_name]);
    }
    /*  This is used to the private function Userbalance **/
    function callBalance(string memory _name) public view returns(uint){
        uint balance=Userbalance(_name);
        return balance;
    }
    
}