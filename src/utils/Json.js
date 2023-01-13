import intl from "react-intl-universal";

export const memberOptions = [
  { label: intl.get("one.member"), value: "1" },
  { label: intl.get("one.walkInConsumer"), value: "0" }
];

export const levelOptions = [
  { label: intl.get("one.card"), value: "1" },
  { label: intl.get("one.glodenCard"), value: "2" },
  { label: intl.get("one.platinumCard"), value: "3" }
];

export const levelMemberOptions = [
  { label: "经典卡会员", value: "1" },
  { label: "金卡会员", value: "2" },
  { label: "白金卡会员", value: "3" }
];

export const conditionList = [
  { name: '>', value: '>' },
  { name: '=', value: '=' },
  { name: '≠', value: '!=' },
  { name: '>=', value: '>=' },
  { name: '<=', value: '<=' }
]

export const groupConditionList = [
  { name: '等于', value: '=' },
  { name: '不等于', value: '!=' },
]

export const mainDataType = [
  {
    name: "Emerging",
    children: [
      {
        name: "Biscuits",
        children: [
          { name: "Dessert" },
          { name: "Kambly Assortments" },
          { name: "Kambly Monopacks" },
          { name: "Souvenir Biscuits" }
        ]
      },
      {
        name: "Dipping",
        children: [
          { name: "Baked Goods" },
          { name: "Berries" },
          { name: "Dried Fruit" },
          { name: "Lollipops" },
          { name: "Other Dipping" }
        ]
      },
      {
        name: "Drinks",
        children: [
          { name: "Cold Chocolixir/Trufflelata" },
          { name: "Freshly Made Chocolate/Cocoa" },
          { name: "Freshly Made Coffee" },
          { name: "Freshly Made Coffee/Tea" },
          { name: "Freshly Made Other" },
          { name: "Packaged Coffee" },
          { name: "Packaged Cold Drinks" },
          { name: "Packaged Hot Chocolate/Cocoa" }
        ]
      },
      {
        name: "Ice Cream",
        children: [{ name: "Cups Ice Cream" }, { name: "Frozen Treats" }]
      },
      {
        name: "Ingredients Items Emerging_",
        children: [{ name: "Ingredients Items Emerging" }]
      },
      {
        name: "Patisseries",
        children: [{ name: "Cakes" }, { name: "Mooncakes" }]
      },
      {
        name: "Soft Serve",
        children: [{ name: "Cone" }, { name: "Cup SS" }, { name: "Hot/Cold" }]
      }
    ]
  },
  {
    name: "Gifting & Chocolate Case",
    children: [
      { name: "Carres_", children: [{ name: "Carres" }] },
      { name: "Casual Gifting_", children: [{ name: "Casual Gifting" }] },
      { name: "Chocolate Case_", children: [{ name: "Chocolate Case" }] },
      {
        name: "Gold_",
        children: [
          { name: "Coeur Iconique" },
          { name: "Discovery" },
          { name: "Gold" }
        ]
      },
      {
        name: "Ingredient Items GCC_",
        children: [{ name: "Ingredient Items GCC" }]
      },
      { name: "Limited Editions_", children: [{ name: "Limited Editions" }] },
      { name: "Luxury Boxes_", children: [{ name: "Luxury Boxes" }] },
      {
        name: "Other Gifting_",
        children: [{ name: "FDM Other Gifting" }, { name: "Other Gifting" }]
      },
      {
        name: "Seasonals",
        children: [
          { name: "CNY" },
          { name: "CV-Day" },
          { name: "FDM Seasonals" },
          { name: "Halloween" },
          { name: "Holidays" },
          { name: "MAF" },
          { name: "Other Seasonal" },
          { name: "Spring / Easter" },
          { name: "Summer" },
          { name: "V-Day" }
        ]
      },
      {
        name: "Truffles",
        children: [
          { name: "Delights" },
          { name: "Seasonal" },
          { name: "Signature" }
        ]
      }
    ]
  },
  {
    name: "Inedible",
    children: [{ name: "Voucher", children: [{ name: "Seasonal Voucher" }] }]
  },
  {
    name: "Misc",
    children: [
      {
        name: "Gift With Purchase_",
        children: [{ name: "Gift With Purchase" }]
      }
    ]
  },
  {
    name: "No Division",
    children: [
      { name: "No Department_", children: [{ name: "No Department" }] }
    ]
  },
  {
    name: "Other",
    children: [{ name: "Other", children: [{ name: "Other" }] }]
  },
  {
    name: "Self Treat",
    children: [
      {
        name: "Ingredient Items ST_",
        children: [{ name: "Ingredient Items ST" }]
      },
      {
        name: "IWC",
        children: [
          { name: "Bulk" },
          { name: "Chocolate Giftbox" },
          { name: "Chocolate Standup Bags" },
          { name: "Truffle Giftbox" },
          { name: "Truffle Standup Bags" }
        ]
      },
      {
        name: "LargeBars/Tablets",
        children: [
          { name: "FDM Large Bars" },
          { name: "Filled Large" },
          { name: "Solid Large" }
        ]
      },
      { name: "Napolitains", children: [{ name: "ULKER Napolitains" }] },
      { name: "Other ST_", children: [{ name: "Other ST" }] },
      { name: "Panned", children: [{ name: "Pearls (Tin)" }] },
      { name: "Pretzels", children: [{ name: "Giftbox" }] },
      {
        name: "SmallBars",
        children: [{ name: "Filled Small" }, { name: "Solid Small" }]
      }
    ]
  },
  {
    name: "Supplies / Materials",
    children: [
      { name: "Expense Supplies_", children: [{ name: "Expense Supplies" }] },
      {
        name: "Inventory Supplies_",
        children: [{ name: "Inventory Supplies" }]
      },
      { name: "Marketing Expense_", children: [{ name: "Marketing Expense" }] },
      {
        name: "Operating Supplies_",
        children: [{ name: "Operating Supplies " }]
      },
      {
        name: "Sanitation Supplies_",
        children: [{ name: "Sanitation Supplies" }]
      },
      { name: "Selling Expense_", children: [{ name: "Selling Expense " }] }
    ]
  },
  {
    name: "NULL",
    children: [
      { name: "NULL", children: [{ name: "NULL" }] }
    ]
  }
];
