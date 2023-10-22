// Import Web3.js (make sure you have it installed)
// You'll need to connect to an Ethereum node, like Infura, and provide your contract address
const web3 = new Web3(new Web3.providers.HttpProvider("YOUR_ETHEREUM_NODE_URL"));
const contractAddress = "0xba1d26b014a08a776b6d75ad065b4b249bc92e77";

// Function to fetch NFT data from the Ethereum contract
async function fetchNFTs() {
    const contract = new web3.eth.Contract(ABI, contractAddress);

    // Replace 'getNFTCount' and 'getNFTById' with your contract's functions
    const totalNFTs = await contract.methods.getNFTCount().call();
    
    // Get two random NFT IDs
    const nftIds = getRandomNFTIds(totalNFTs);

    // Fetch NFT data for the selected IDs
    const nfts = await Promise.all(nftIds.map(id => contract.methods.getNFTById(id).call()));

    // Display NFTs for voting
    const votingContainer = document.getElementById("voting-container");
    nfts.forEach(nft => {
        const nftDiv = document.createElement("div");
        nftDiv.classList.add("nft");
        const image = document.createElement("img");
        image.src = nft.image;
        image.alt = `NFT ${nft.id}`;
        const voteButton = document.createElement("button");
        voteButton.innerText = "Vote";
        voteButton.addEventListener("click", () => vote(nft.id));
        nftDiv.appendChild(image);
        nftDiv.appendChild(voteButton);
        votingContainer.appendChild(nftDiv);
    });
}

// Helper function to get two random NFT IDs
function getRandomNFTIds(totalNFTs) {
    // Generate two unique random numbers within the total NFT range
    const nftIds = [];
    while (nftIds.length < 2) {
        const randomId = Math.floor(Math.random() * totalNFTs) + 1;
        if (!nftIds.includes(randomId)) {
            nftIds.push(randomId);
        }
    }
    return nftIds;
}

// The rest of the JavaScript code for voting and leaderboard remains the same
