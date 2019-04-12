# Project 3: Connect Private Blockchain to Front-End Client via APIs

this is the third project BND from udacity 

## how to setup 
1- Download the project or clone it.<br>
2- Run command npm install to install the project dependencies.<br>
3-Run command  __node app.js__ in the root directory.<br>


## Testing the project
- after running the command __node app.js__ you can go to __localhost:8000/block/0__ and check the genesis block.
- To add blocks to the blockchain you need to use __POSTMAN__ or an alternative and __POST__ to __localhost:8000/block__
the formatting should be like this :
<br>{
    "body" : "Testing 123"
    }

- To check all the blocks in the blockchain use __localhost:8000/blocks__
  

