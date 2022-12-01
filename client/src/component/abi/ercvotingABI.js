export default [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "mSMaddr",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "pieceid",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "proposernumber",
                "type": "uint256"
            }
        ],
        "name": "getRight",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "pieceid",
                "type": "uint256"
            }
        ],
        "name": "isitRight",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
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
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "proposers",
        "outputs": [
            {
                "internalType": "address",
                "name": "soulowner",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "proposeuri",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "agree",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "disagree",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "expiration",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "votingresult",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "mSMaddr",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "pieceid",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "proposedid",
                "type": "uint256"
            }
        ],
        "name": "result",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "mSMaddr",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "pieceid",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "suggestionuri",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "duration",
                "type": "uint256"
            }
        ],
        "name": "suggestion",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "voters",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "weight",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "voted",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "mSMaddr",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "pieceid",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "proposedid",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "voted",
                "type": "uint256"
            }
        ],
        "name": "voting",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]