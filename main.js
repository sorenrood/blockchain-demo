const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }
    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
        
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()]; // this is called a genesis block because first block
    }
    createGenesisBlock(){
        return new Block(0, "01/01/2019", "Genesis Block", "0")
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid(){
       for(let i = 1; i < this.chain.length; i++){
           const currentBlock = this.chain[i];
           const previousBlock = this.chain[i-1];

           if(currentBlock.hash !== currentBlock.calculateHash()){
               return false;
           }

           if(currentBlock.previousHash !== previousBlock.hash){
               return false;
           }
       } 
       return true;
    }
}



let sorenCoin = new Blockchain();
sorenCoin.addBlock(new Block(1,"10/21/2000", { amount: 4 }))
sorenCoin.addBlock(new Block(2,"10/23/2000", { amount: 10 }))
sorenCoin.addBlock(new Block(3,"10/25/2000", { amount: 12 }))
sorenCoin.addBlock(new Block(4,"10/27/2000", { amount: 7 }))
sorenCoin.addBlock(new Block(5,"10/29/2000", { amount: 21 }))
sorenCoin.addBlock(new Block(6,"10/31/2000", { amount: 3 }))


 // sorenCoin.chain[1].data = { amount: 100 }; // this shows the security of shaw 256 if i change date of block 1

//console.log('Is blockchain valid? ' + sorenCoin.isChainValid()); // show this to Steven

console.log(JSON.stringify(sorenCoin, null, 4));