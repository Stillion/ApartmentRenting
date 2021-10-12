//izmeniti ABI za contract, kao i adrese

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
web3.eth.defaultAccount = web3.eth.accounts[0];
var AppartmentRent = new web3.eth.Contract([
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_appartmentId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_bidAmount",
				"type": "uint256"
			}
		],
		"name": "bid",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_appartmentId",
				"type": "uint256"
			}
		],
		"name": "cancelBidding",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_appartmentId",
				"type": "uint256"
			}
		],
		"name": "closeBidding",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_street",
				"type": "string"
			},
			{
				"internalType": "uint16",
				"name": "_streetNumber",
				"type": "uint16"
			},
			{
				"internalType": "uint16",
				"name": "_appartmentNumber",
				"type": "uint16"
			}
		],
		"name": "createAppartment",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_renter",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_appartmentId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_rentAmount",
				"type": "uint256"
			}
		],
		"name": "payRent",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_appartmentId",
				"type": "uint256"
			}
		],
		"name": "stopRentingAppartment",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "appartments",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "street",
				"type": "string"
			},
			{
				"internalType": "uint16",
				"name": "streetNumber",
				"type": "uint16"
			},
			{
				"internalType": "uint16",
				"name": "appartmentNumber",
				"type": "uint16"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllAppartments",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "street",
						"type": "string"
					},
					{
						"internalType": "uint16",
						"name": "streetNumber",
						"type": "uint16"
					},
					{
						"internalType": "uint16",
						"name": "appartmentNumber",
						"type": "uint16"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					}
				],
				"internalType": "struct AppartmentFactory.Appartment[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "getAppartmentsByOwner",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_renter",
				"type": "address"
			}
		],
		"name": "getAppartmentsByRenter",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAvailableAppartments",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "street",
						"type": "string"
					},
					{
						"internalType": "uint16",
						"name": "streetNumber",
						"type": "uint16"
					},
					{
						"internalType": "uint16",
						"name": "appartmentNumber",
						"type": "uint16"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					}
				],
				"internalType": "struct AppartmentFactory.Appartment[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_appartmentId",
				"type": "uint256"
			}
		],
		"name": "getBiddingHistory",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "renter",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "bidAmount",
						"type": "uint256"
					}
				],
				"internalType": "struct AppartmentFactory.RenterBidding[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "getCurrentRentersForOwner",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_appartmentId",
				"type": "uint256"
			}
		],
		"name": "getRentingHistory",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "resetRenterBidding",
		"outputs": [
			{
				"internalType": "address",
				"name": "renter",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "bidAmount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
], '0x08cA4758E1b3AC16Ee3E41F635C4b577d5d6f96D', // contract address
{
    from: '0x0b4E32aAB020f477d988b1721F4EBF383656EA07', // default from address
    gasPrice: '100' // default gas price in wei, 20 gwei in this case
});

// console.log(AppartmentRent);
// console.log(web3.eth.accounts);
AppartmentRent.methods.getAllAppartments().call(function (error, result) {
    if (!error) {
        console.log('Get ALL APPARTMENTS')
        $("#appartment").html(result);
        console.log(result);
    }
    else
        console.error(error);
});

$("#createAppartment").click(function () {
    console.log('CREATE APPARTMENTS')
    AppartmentRent.methods.createAppartment($("#streetName").val(), 
                                            $("#streetNumber").val(),
                                            $("#appartmentNumber").val()).send({
        from: '0x0b4E32aAB020f477d988b1721F4EBF383656EA07',
        gas: 1500000,
        gasPrice: '100'
    });
});

$("#getOwnerAppartments").click(function () {
    AppartmentRent.methods.getAppartmentsByOwner('0x0b4E32aAB020f477d988b1721F4EBF383656EA07').call(function (error, result) {
    if (!error) {
        $("#ownerAppartments").html('Appartment Ids for Owner: ' + result);
        console.log(result);
    }
    else
        console.error(error);
    });
});
