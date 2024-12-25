export const SystemConfigABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "AlreadyInitialized",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "platformFeeRate",
        type: "uint256",
      },
    ],
    name: "InvaildPlatformFeeRate",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "referrerRate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "refereeRate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalRate",
        type: "uint256",
      },
    ],
    name: "InvaildRate",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "InvaildReceiptAddress",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "referrer",
        type: "address",
      },
    ],
    name: "InvaildReferrer",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "referrerRate",
        type: "uint256",
      },
    ],
    name: "InvaildReferrerRate",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "totalRate",
        type: "uint256",
      },
    ],
    name: "InvaildTotalRate",
    type: "error",
  },
  {
    inputs: [],
    name: "MarketplaceAlreadyInitialized",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "enum MarketplaceStatus",
        name: "status",
        type: "uint8",
      },
    ],
    name: "MarketplaceNotOnline",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "ReferralCodeExist",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "Unauthorized",
    type: "error",
  },
  {
    inputs: [],
    name: "ZeroAddress",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "marketPlaceAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "marketPlaceName",
        type: "string",
      },
    ],
    name: "CreateMarketplaceInfo",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "referrer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "code",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_referrerRate",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_refereeRate",
        type: "uint256",
      },
    ],
    name: "CreateReferralCode",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_basePlatformFeeRate",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_baseReferralRate",
        type: "uint256",
      },
    ],
    name: "Initialize",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "referrer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "code",
        type: "string",
      },
    ],
    name: "RemoveReferralCode",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Rescue",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bool",
        name: "status",
        type: "bool",
      },
    ],
    name: "SetPauseStatus",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "basePlatformFeeRate",
        type: "uint256",
      },
    ],
    name: "UpdateBasePlatformFeeRate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "baseReferralRate",
        type: "uint256",
      },
    ],
    name: "UpdateBaseReferralRate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "marketPlaceAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isSpecial",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "string",
        name: "marketPlaceName",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenPerPoint",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tge",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "settlementPeriod",
        type: "uint256",
      },
    ],
    name: "UpdateMarket",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "marketPlaceAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "enum MarketplaceStatus",
        name: "status",
        type: "uint8",
      },
    ],
    name: "UpdateMarketplaceStatus",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "referrerAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "referrerRate",
        type: "uint256",
      },
    ],
    name: "UpdateReferralExtraRate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "referrerAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "referrerRate",
        type: "uint256",
      },
    ],
    name: "UpdateReferralExtraRateMap",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "authorityAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "refereeRate",
        type: "uint256",
      },
    ],
    name: "UpdateReferrerExtraRate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "authorityAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "referrerAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "referrerRate",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "refereeRate",
        type: "uint256",
      },
    ],
    name: "UpdateReferrerInfo",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "userAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "userPlatformFeeRate",
        type: "uint256",
      },
    ],
    name: "UpdateUserPlatformFeeRate",
    type: "event",
  },
  {
    inputs: [],
    name: "basePlatformFeeRate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseReferralRate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_marketPlaceName",
        type: "string",
      },
    ],
    name: "createMarketplace",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_referralCode",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_referrerRate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_refereeRate",
        type: "uint256",
      },
    ],
    name: "createReferralCode",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getBaseReferralRate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_marketPlace",
        type: "address",
      },
    ],
    name: "getMarketplaceInfo",
    outputs: [
      {
        components: [
          {
            internalType: "bool",
            name: "isSpecial",
            type: "bool",
          },
          {
            internalType: "enum MarketplaceStatus",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "address",
            name: "projectTokenAddr",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenPerPoint",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "tge",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "settlementPeriod",
            type: "uint256",
          },
        ],
        internalType: "struct MarketplaceInfo",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "getPlatformFeeRate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_referrer",
        type: "address",
      },
    ],
    name: "getReferralInfo",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "referrer",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "referrerRate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "refereeRate",
            type: "uint256",
          },
        ],
        internalType: "struct ReferralInfo",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_basePlatformFeeRate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_baseReferralRate",
        type: "uint256",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newOwner",
        type: "address",
      },
    ],
    name: "initializeOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "marketPlaceInfoMap",
    outputs: [
      {
        internalType: "bool",
        name: "isSpecial",
        type: "bool",
      },
      {
        internalType: "enum MarketplaceStatus",
        name: "status",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "projectTokenAddr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenPerPoint",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tge",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "settlementPeriod",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "referralCodeMap",
    outputs: [
      {
        internalType: "address",
        name: "referrer",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "referrerRate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "refereeRate",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "referralExtraRateMap",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "referralInfoMap",
    outputs: [
      {
        internalType: "address",
        name: "referrer",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "referrerRate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "refereeRate",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_referralCode",
        type: "string",
      },
    ],
    name: "removeReferralCode",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "rescue",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "pauseSatus",
        type: "bool",
      },
    ],
    name: "setPauseStatus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "tadleFactory",
    outputs: [
      {
        internalType: "contract ITadleFactory",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_marketPlaceName",
        type: "string",
      },
      {
        internalType: "address",
        name: "_projectTokenAddr",
        type: "address",
      },
      {
        internalType: "bool",
        name: "_isSpecial",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "_tokenPerPoint",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_tge",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_settlementPeriod",
        type: "uint256",
      },
    ],
    name: "updateMarket",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_marketPlaceName",
        type: "string",
      },
      {
        internalType: "enum MarketplaceStatus",
        name: "_status",
        type: "uint8",
      },
    ],
    name: "updateMarketplaceStatus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_referrer",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_extraRate",
        type: "uint256",
      },
    ],
    name: "updateReferralExtraRateMap",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_referralCode",
        type: "string",
      },
    ],
    name: "updateReferrerInfo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_accountAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_platformFeeRate",
        type: "uint256",
      },
    ],
    name: "updateUserPlatformFeeRate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "userPlatformFeeRate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
