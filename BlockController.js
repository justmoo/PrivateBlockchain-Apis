const SHA256 = require('crypto-js/sha256');
const Block = require('./Block.js');
const blockchain =require('./BlockChain');

/**
 * Controller Definition to encapsulate routes to work with blocks
 */
class BlockController {

    /**
     * Constructor to create a new BlockController, you need to initialize here all your endpoints
     * @param {*} app 
     */
    constructor(app) {
        this.app = app;
        this.blocks = [];
        //this.initGenesisBlock();
        this.getBlockByIndex();
        this.postNewBlock();
        this.getTheBlockchain();
        this.bc = new blockchain.Blockchain();
        
        
    }

    // initGenesisBlock(){
    //     if(this.blocks.length===0){
    //         let newBlock = new BlockClass.Block("First block in the chain - Genesis block");
    //             newBlock.height = 0;
    //             newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();
    //             newBlock.previousBlockHash = "0x";
    //             this.blocks.push(newBlock);
    //     }

    // }
    
      //for testing purposes :)
      async getTheBlockchain(){
        let self = this;
        this.app.get("/blocks", async (req, res) => {
            // return the whole blockchain
           let blockchain =await self.bc.getBlockchain();
            res.send(blockchain);
        });
     }
   
     // Implement a GET Endpoint to retrieve a block by index, url: "/block/:index"
     // Working perfectly 
      async getBlockByIndex() {
        let self = this;
        this.app.get("/block/:index",async (req, res) => {
            // returns any block if its in the blockchain height  
                if(req.params.index > await self.bc.getBlockHeight()){
                        res.send("this block doesn't exist");
                }else{
                let block = await self.bc.getBlock(req.params.index);
                console.log(block)
                
                 res.send(block);
                }
        });
    }

    
    // Implement a POST Endpoint to add a new Block, url: "/block"
    // checks if the request has "body" then adds it to the blockchain 
    postNewBlock() {
        this.app.post("/block",async (req, res) => {
            if(req.body.body == null){
                res.send("can't send an empty block")
            }else{
                let newBlock = new Block.Block(req.body.body);
                await this.bc.addBlock(newBlock);//this.blocks.push(newBlock);
                res.json(newBlock);
            }
        });
    }

   

}

/**
 * Exporting the BlockController class
 * @param {*} app 
 */
module.exports = (app) => { return new BlockController(app);}