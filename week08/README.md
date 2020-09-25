# Notes

I don't believe code is ever "perfect", but in this folder I've evolved the initial project into something that I believe is more closely aligned with the context and maintenance objectives of this (pretend) product, as discussed in the labs.

`0_start`: contains the initial version

`1_rename`: contains a version with improved names for readability

`2_db`: contains a version where the products been extracted into into their own layer (i.e., I've used layering)

Then, I experimented with two separate versions:

`3a_architecture`: 
* I put the output formatting into the code for the output devices
* I used something akin to "dependency injection" to setup a CashRegister
* I used a state machine to track whether to exit
* I improved the currency handling logic so that it doesn't have issues with floating point amounts
* I wrote some unit tests
* I added comments

`3b_architecture`:
* I turned elements in the database into model classes (Product/DiscountRule) (rather than "structures") 
* I used an "error object" class to represent invalid barcodes
* I used something akin to "dependency injection" to setup a CashRegister
* I created very simple output devices and put the formatting logic into the individual model classes (Product/DiscountRule)
* I added comments

If you have more thoughts on how to improve this code, or which ones you like the most... please feel free to discuss on Teams.