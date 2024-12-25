export const PreMarketABI = [
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
    inputs: [],
    name: "AmountIsZero",
    type: "error",
  },
  {
    inputs: [],
    name: "CallerIsNotDeliveryPlace",
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
    name: "CallerIsNotRelatedContracts",
    type: "error",
  },
  {
    inputs: [],
    name: "HoldingAlreadyExist",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "enum AbortOfferStatus",
        name: "_expected",
        type: "uint8",
      },
      {
        internalType: "enum AbortOfferStatus",
        name: "_actual",
        type: "uint8",
      },
    ],
    name: "InvalidAbortOfferStatus",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "collateralRate",
        type: "uint256",
      },
    ],
    name: "InvalidCollateralRate",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "eachTradeTaxRate",
        type: "uint256",
      },
    ],
    name: "InvalidEachTradeTaxRate",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "enum HoldingStatus",
        name: "_targetStatus",
        type: "uint8",
      },
      {
        internalType: "enum HoldingStatus",
        name: "_currentStatus",
        type: "uint8",
      },
    ],
    name: "InvalidHoldingStatus",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "enum HoldingType",
        name: "_targetType",
        type: "uint8",
      },
      {
        internalType: "enum HoldingType",
        name: "_currentType",
        type: "uint8",
      },
    ],
    name: "InvalidHoldingType",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidOffer",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_targetAccount",
        type: "address",
      },
      {
        internalType: "address",
        name: "_currentAccount",
        type: "address",
      },
    ],
    name: "InvalidOfferAccount",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidOfferStatus",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "enum OfferType",
        name: "_targetType",
        type: "uint8",
      },
      {
        internalType: "enum OfferType",
        name: "_currentType",
        type: "uint8",
      },
    ],
    name: "InvalidOfferType",
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
    name: "InvalidReceiptAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "MakerAlreadyExist",
    type: "error",
  },
  {
    inputs: [],
    name: "MismatchedMarketplaceStatus",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_totalPoints",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_usedProjectPoints",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_projectPoints",
        type: "uint256",
      },
    ],
    name: "NotEnoughPoints",
    type: "error",
  },
  {
    inputs: [],
    name: "OfferAlreadyExist",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "RollinTooSoon",
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
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "offer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "authority",
        type: "address",
      },
    ],
    name: "AbortAskOffer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "offer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "holding",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "authority",
        type: "address",
      },
    ],
    name: "AbortBidHolding",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "offer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "authority",
        type: "address",
      },
    ],
    name: "CloseOffer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "offer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "authority",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "holding",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "projectPoints",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "quoteTokenAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tradeTax",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "platformFee",
        type: "uint256",
      },
    ],
    name: "CreateHolding",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_offer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_maker",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_holding",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_marketPlace",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_authority",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_projectPoints",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_quoteTokenAmount",
        type: "uint256",
      },
    ],
    name: "CreateOffer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_holding",
        type: "address",
      },
      {
        indexed: false,
        internalType: "enum HoldingStatus",
        name: "_status",
        type: "uint8",
      },
    ],
    name: "HoldingStatusUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "offer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "holding",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "authority",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "projectPoints",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "quoteTokenAmount",
        type: "uint256",
      },
    ],
    name: "ListHolding",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_offer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "enum OfferStatus",
        name: "_status",
        type: "uint8",
      },
    ],
    name: "OfferStatusUpdated",
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
        name: "holding",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "authority",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "referrer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "authorityReferralBonus",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "referrerReferralBonus",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tradingVolume",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tradingFee",
        type: "uint256",
      },
    ],
    name: "ReferralBonus",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "offer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "authority",
        type: "address",
      },
    ],
    name: "RelistHolding",
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
        indexed: true,
        internalType: "address",
        name: "authority",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "Rollin",
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
        name: "_offer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_settledCollateralAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_settledProjectPoints",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_settledPointTokenAmount",
        type: "uint256",
      },
    ],
    name: "SettledAskOffer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_offer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_holding",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_settledProjectPoints",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_settledPointTokenAmount",
        type: "uint256",
      },
    ],
    name: "SettledBidHolding",
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
    inputs: [
      {
        internalType: "address",
        name: "_holding",
        type: "address",
      },
      {
        internalType: "address",
        name: "_offer",
        type: "address",
      },
    ],
    name: "abortAskOffer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_holding",
        type: "address",
      },
      {
        internalType: "address",
        name: "_offer",
        type: "address",
      },
    ],
    name: "abortBidHolding",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_holding",
        type: "address",
      },
      {
        internalType: "address",
        name: "_offer",
        type: "address",
      },
    ],
    name: "closeOffer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_offer",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_projectPoints",
        type: "uint256",
      },
    ],
    name: "createHolding",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "marketPlace",
            type: "address",
          },
          {
            internalType: "address",
            name: "collateralTokenAddr",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "projectPoints",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "quoteTokenAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "collateralRate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "eachTradeTax",
            type: "uint256",
          },
          {
            internalType: "enum OfferType",
            name: "offerType",
            type: "uint8",
          },
          {
            internalType: "enum OfferSettleType",
            name: "offerSettleType",
            type: "uint8",
          },
        ],
        internalType: "struct CreateOfferParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "createOffer",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_holding",
        type: "address",
      },
    ],
    name: "getHoldingInfo",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "holdingId",
            type: "uint256",
          },
          {
            internalType: "enum HoldingStatus",
            name: "holdingStatus",
            type: "uint8",
          },
          {
            internalType: "enum HoldingType",
            name: "holdingType",
            type: "uint8",
          },
          {
            internalType: "address",
            name: "authority",
            type: "address",
          },
          {
            internalType: "address",
            name: "maker",
            type: "address",
          },
          {
            internalType: "address",
            name: "preOffer",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "projectPoints",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "quoteTokenAmount",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "offer",
            type: "address",
          },
        ],
        internalType: "struct HoldingInfo",
        name: "_holdingInfo",
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
        name: "_maker",
        type: "address",
      },
    ],
    name: "getMakerInfo",
    outputs: [
      {
        components: [
          {
            internalType: "enum OfferSettleType",
            name: "offerSettleType",
            type: "uint8",
          },
          {
            internalType: "address",
            name: "authority",
            type: "address",
          },
          {
            internalType: "address",
            name: "marketPlace",
            type: "address",
          },
          {
            internalType: "address",
            name: "collateralTokenAddr",
            type: "address",
          },
          {
            internalType: "address",
            name: "originOffer",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "eachTradeTax",
            type: "uint256",
          },
        ],
        internalType: "struct MakerInfo",
        name: "_makerInfo",
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
        name: "_offer",
        type: "address",
      },
    ],
    name: "getOfferInfo",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "offerId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "authority",
            type: "address",
          },
          {
            internalType: "address",
            name: "maker",
            type: "address",
          },
          {
            internalType: "enum OfferStatus",
            name: "offerStatus",
            type: "uint8",
          },
          {
            internalType: "enum OfferType",
            name: "offerType",
            type: "uint8",
          },
          {
            internalType: "enum AbortOfferStatus",
            name: "abortOfferStatus",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "projectPoints",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "quoteTokenAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "collateralRate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "usedProjectPoints",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "tradeTax",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "settledProjectPoints",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "settledPointTokenAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "settledCollateralAmount",
            type: "uint256",
          },
        ],
        internalType: "struct OfferInfo",
        name: "_offerInfo",
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
        name: "",
        type: "address",
      },
    ],
    name: "holdingInfoMap",
    outputs: [
      {
        internalType: "uint256",
        name: "holdingId",
        type: "uint256",
      },
      {
        internalType: "enum HoldingStatus",
        name: "holdingStatus",
        type: "uint8",
      },
      {
        internalType: "enum HoldingType",
        name: "holdingType",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "authority",
        type: "address",
      },
      {
        internalType: "address",
        name: "maker",
        type: "address",
      },
      {
        internalType: "address",
        name: "preOffer",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "projectPoints",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "quoteTokenAmount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "offer",
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
        name: "_holding",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_quoteTokenAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_collateralRate",
        type: "uint256",
      },
    ],
    name: "listHolding",
    outputs: [],
    stateMutability: "payable",
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
    name: "makerInfoMap",
    outputs: [
      {
        internalType: "enum OfferSettleType",
        name: "offerSettleType",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "authority",
        type: "address",
      },
      {
        internalType: "address",
        name: "marketPlace",
        type: "address",
      },
      {
        internalType: "address",
        name: "collateralTokenAddr",
        type: "address",
      },
      {
        internalType: "address",
        name: "originOffer",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "eachTradeTax",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "offerId",
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
    name: "offerInfoMap",
    outputs: [
      {
        internalType: "uint256",
        name: "offerId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "authority",
        type: "address",
      },
      {
        internalType: "address",
        name: "maker",
        type: "address",
      },
      {
        internalType: "enum OfferStatus",
        name: "offerStatus",
        type: "uint8",
      },
      {
        internalType: "enum OfferType",
        name: "offerType",
        type: "uint8",
      },
      {
        internalType: "enum AbortOfferStatus",
        name: "abortOfferStatus",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "projectPoints",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "quoteTokenAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "collateralRate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "usedProjectPoints",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tradeTax",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "settledProjectPoints",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "settledPointTokenAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "settledCollateralAmount",
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
        internalType: "address",
        name: "_holding",
        type: "address",
      },
      {
        internalType: "address",
        name: "_offer",
        type: "address",
      },
    ],
    name: "relistHolding",
    outputs: [],
    stateMutability: "payable",
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
    inputs: [],
    name: "rollin",
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
    name: "rollinAtMap",
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
    inputs: [
      {
        internalType: "address",
        name: "_offer",
        type: "address",
      },
      {
        internalType: "address",
        name: "_holding",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_settledProjectPoints",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_settledPointTokenAmount",
        type: "uint256",
      },
    ],
    name: "settleAskHolding",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_offer",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_settledCollateralAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_settledProjectPoints",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_settledPointTokenAmount",
        type: "uint256",
      },
    ],
    name: "settledAskOffer",
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
        internalType: "address",
        name: "_holding",
        type: "address",
      },
      {
        internalType: "enum HoldingStatus",
        name: "_status",
        type: "uint8",
      },
    ],
    name: "updateHoldingStatus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_offer",
        type: "address",
      },
      {
        internalType: "enum OfferStatus",
        name: "_status",
        type: "uint8",
      },
    ],
    name: "updateOfferStatus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
