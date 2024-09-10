const SHA256 = window.sha256;

console.log(MerkleTree, SHA256);
let tree;
let root;

console.log(MerkleTree);
// Function to initialize the Merkle tree
function initializeMerkleTree() {
  try {
    // console.log("Initializing Merkle tree...");
    // List of eligible addresses
    const eligibleAddresses = [
      "0x1234567890123456789012345678901234567890",
      "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
      "0x9876543210987654321098765432109876543210",
      "0xa7bca53686b699f6050038f528011f48eec13e97",
      "0xd828fffdea13bed30e2459c0dd6eb5c9da08eab8",
      "0xcf6bd34447c5b2166c8d8ddab4a8cab3d7e4d1a0",
      "0x0f8b98ec1ddedb7c4ded32abbfb1bf816449858d",
      "0xe43a676c579cdc034038d8ab1ae16aca87dc2335",
      "0x8882f5a83a9fb57fbecb9dcce861bf94f7a5010c",
      "0xed63d3257a9c08e465855bab2fdae9ff94d68401",
      "0x78a4ebf3a65e1225ef730bf2636b46b84a940243",
      "0x00e71940cb9baa6011ad7f7f541eaac06a6194aa",
      "0x966a41489e5741c70d8582e66489642c64fc861e",
      "0xefa1a137c42f1aa90c77879547a49dbf4a2e9198",
      "0x4e40df9717e72261f19f230a880ee5829ca08eb8",
      "0x524ff3c65fd7a57acbee8a1556056eaffd8ab71e",
      "0x167949ead5bdd8c29e8ead3b58f0f7207c5b4762",
      "0x91630e7b799c624c078d78305166c11798bfc932",
    ];

    console.log("Eligible addresses:", eligibleAddresses);

    // Create leaf nodes
    const leaves = eligibleAddresses.map((addr) => SHA256(addr).toString());
    // console.log("Leaves created:", leaves);

    tree = new window.MerkleTree(leaves, SHA256);
    // console.log("Merkle tree created:", tree);

    // Get the Merkle root
    root = tree.getRoot().toString("hex");
    // console.log("Merkle root:", root);

    // console.log("Merkle Tree initialized:", tree.toString());
  } catch (error) {
    console.error("Error initializing Merkle tree:", error);
  }
}

// Function to check eligibility when the button is clicked
function checkEligibility() {
  if (!tree || !root) {
    console.error("Merkle tree not initialized");
    return;
  }

  const address = document.getElementById("addressInput").value;
  // console.log("Entered address:", address);

  const leaf = SHA256(address).toString();
  // console.log("Hashed address:", leaf);

  const proof = tree.getProof(leaf);
  // console.log("Generated proof:", proof);

  console.log(tree.verify(proof, leaf, root));
  // console.log("leaf is:", leaf);
  // console.log("proof here:", proof);

  const isEligible = tree.verify(proof, leaf, root);
  // console.log("Is eligible:", isEligible);

  const resultElement = document.getElementById("result");
  const resultText = resultElement.querySelector("p");

  resultElement.classList.remove("hidden", "bg-green-600", "bg-red-600");
  resultElement.classList.add(isEligible ? "bg-green-600" : "bg-red-600");

  resultText.textContent = isEligible
    ? "Eligible for airdrop!"
    : "Not eligible for airdrop.";

  resultElement.animate(
    [
      { opacity: 0, transform: "scale(0.9)" },
      { opacity: 1, transform: "scale(1)" },
    ],
    {
      duration: 300,
      easing: "ease-out",
      fill: "forwards",
    }
  );
}

document.addEventListener("DOMContentLoaded", () => {
  initializeMerkleTree();

  // Add event listener to the button
  const checkButton = document.getElementById("checkButton");
  if (checkButton) {
    checkButton.addEventListener("click", checkEligibility);
  } else {
    console.error("Check button not found");
  }
});


