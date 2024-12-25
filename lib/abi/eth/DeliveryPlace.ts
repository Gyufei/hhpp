export const DeliveryPlaceABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "AlreadyInitialized",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "bool",
        "name": "_isSpecial",
        "type": "bool"
      }
    ],
    "name": "FixedRatioTypeMismatch",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InsufficientRemainingPoints",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvaildHolding",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvaildHoldingStatus",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvaildHoldingType",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvaildMarketplaceStatus",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "InvaildOfferAccount",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvaildOfferStatus",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "enum OfferType",
        "name": "_targetType",
        "type": "uint8"
      },
      {
        "internalType": "enum OfferType",
        "name": "_currentType",
        "type": "uint8"
      }
    ],
    "name": "InvaildOfferType",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvaildPoints",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "InvaildReceiptAddress",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "TransferFailed",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Unauthorized",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "_marketPlace",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "_maker",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "_holding",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "_authority",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_userCollateralFee",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_pointTokenAmount",
        "type": "uint256"
      }
    ],
    "name": "CloseBidHolding",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "_marketPlace",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "_maker",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "_offer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "_authority",
        "type": "address"
      }
    ],
    "name": "CloseBidOffer",
    "type": "event"
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
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "Paused",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Rescue",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bool",
        "name": "status",
        "type": "bool"
      }
    ],
    "name": "SetPauseStatus",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "_marketPlace",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "_maker",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "_holding",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "_preOffer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "_authority",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_settledProjectPoints",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_settledPointTokenAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_collateralAmount",
        "type": "uint256"
      }
    ],
    "name": "SettleAskHolding",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "_marketPlace",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "_maker",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "_offer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "_authority",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_settledProjectPoints",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_settledPointTokenAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_makerRefundAmount",
        "type": "uint256"
      }
    ],
    "name": "SettleAskMaker",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "Unpaused",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_holding",
        "type": "address"
      }
    ],
    "name": "closeBidHolding",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_offer",
        "type": "address"
      }
    ],
    "name": "closeBidOffer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_newOwner",
        "type": "address"
      }
    ],
    "name": "initializeOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
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
    "inputs": [],
    "name": "paused",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
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
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "rescue",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bool",
        "name": "pauseSatus",
        "type": "bool"
      }
    ],
    "name": "setPauseStatus",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_holding",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_settledProjectPoints",
        "type": "uint256"
      }
    ],
    "name": "settleAskHolding",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_offer",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_settledProjectPoints",
        "type": "uint256"
      }
    ],
    "name": "settleAskMaker",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "tadleFactory",
    "outputs": [
      {
        "internalType": "contract ITadleFactory",
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
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
