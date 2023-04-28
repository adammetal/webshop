// Statements (if, for, while)
// Variables (const, let, var)
// functions
// data structures ([], {})

// example object for demo
const chanel = {
  model: "chanel-1",
  price: {
    usd: 1000,
    eur: 1200,
    huf: 300000,
  },
  color: "#f00",
  sizes: [32, 34, 36],

  // method
  getLocalPrice: function (code) {
    return this.price[code];
  },
};

const basket = [];

// 1. render the stock
// 2. basket
// 3. order, summarize
// 4. search in the shop

// First fucntion to run. Entry point
function main() {
  const stock = getStockForShop();
  renderStock(stock);

  // look after it (Set)
  const colors = new Set();
  const models = new Set();

  for (let i = 0; i < stock.length; i++) {
    colors.add(stock[i].color);
    models.add(stock[i].model);
  }

  // look after it (Array.from)
  renderFilters(Array.from(colors), Array.from(models));
  initInteractions(stock);
}

// -- Render Functions (View Layer) --

// drawing, generating, altering, updating existsing elements
function renderStock(stock) {
  // 1. Get the target dom node
  const screen = document.getElementById("screen");

  // 2. clear the target dom node
  screen.innerHTML = "";

  // 3. iterate through the stock array
  for (let i = 0; i < stock.length; i++) {
    // render one item
    const div = createProductDomSection(stock[i]);
    screen.append(div);
  }
}

// renderDomItem
// createItemSection
// renderingItems
// createProductSection
// displayItems
// CreateProductRender
// generateOneStockItemDom
// createProductDomSection
// create something new element
/**
 * This function will create a new dom element (div)
 * and put the whole stock item content in it.
 * Returns with the new element.
 */
function createProductDomSection(item) {
  // generate a div for the item
  const stockItemEl = document.createElement("div");

  // El postfix mean's this is a dom element
  // <h1>item.name</h1>
  const nameEl = document.createElement("h1");
  nameEl.innerText = item.name;

  const priceEl = document.createElement("div");
  priceEl.innerText = item.price.huf + " HUF";

  const colorEl = document.createElement("div");
  colorEl.style.backgroundColor = item.color;
  colorEl.className = "color";

  const sizesTitlteEl = document.createElement("h3");
  sizesTitlteEl.innerText = "Sizes";

  const sizesEl = document.createElement("ul");
  for (let i = 0; i < item.sizes.length; i++) {
    const sizeListEl = document.createElement("li");
    sizeListEl.innerText = item.sizes[i];
    sizesEl.append(sizeListEl);
  }

  const orderBtnEl = document.createElement("button");
  orderBtnEl.innerText = "Add to order";
  orderBtnEl.className = "order-button";
  orderBtnEl.dataset.itemName = item.name;

  stockItemEl.append(
    nameEl,
    priceEl,
    orderBtnEl,
    colorEl,
    sizesTitlteEl,
    sizesEl
  );

  return stockItemEl;
}

function renderFilters(colors, models) {
  // colors: ['#f00', '#0f0', ..]
  // models: ['chanel', 'prada']

  //1. get the target element
  const filters = document.getElementById("filter");
  
  // 2. clear the target element dom
  filters.innerHTML = "";

  //3. genedare filter elements
  //4. return the filters

  const modelSelectorEl = document.createElement("select");
  modelSelectorEl.id = "model-selector";
  
  const defautlOptionEl = document.createElement("option");
  defautlOptionEl.innerText = "--Select a model--";
  defautlOptionEl.value = "";

  modelSelectorEl.append(defautlOptionEl);
  for (let i = 0; i < models.length; i++) {
    const modelOptionEl = document.createElement("option");
    modelOptionEl.innerText = models[i];
    modelOptionEl.value = models[i];
    modelSelectorEl.append(modelOptionEl);
  }

  const colorSelectorEl = document.createElement("div");
  colorSelectorEl.id = "color-selector";
  for (let i = 0; i < colors.length; i++) {
    const colorEl = document.createElement("div");
    colorEl.style.backgroundColor = colors[i];
    colorEl.className = "color";
    colorSelectorEl.append(colorEl);
  }

  filters.append(colorSelectorEl, modelSelectorEl);
}

function renderBasket() {
  // 1. clear the basket element
  const basketEl = document.getElementById("basket");
  basket.innerHTML = "";

  // 2. render the new basket
  for (let i = 0; i < basket.length; i++) {
    const div = document.createElement("div");
    div.innerText = basket[i].name;
    basketEl.append(div);
  }
}

// -- GLUE CODE (GLUE SECTION)
// It brings together the dom and the controllers via event handler

function initInteractions(stock) {
  const orderButtons = document.querySelectorAll(".order-button");
  const colorSelectors = document.querySelectorAll("#color-selector .color");
  const modelSelector = document.querySelector("#model-selector");

  for (let i = 0; i < orderButtons.length; i++) {
    orderButtons[i].addEventListener("click", addItemToBasketController);
  }
}

// -- CONTROLLER FUNCTIONS --

/**
 * Order button click event handler,
 * to add an item to a basket
 */
function addItemToBasketController(event) {
  // anonymus function expression
  const name = event.target.dataset.itemName;
  const item = findItemByName(stock, name);
  addItemToBasket(item);
  renderBasket();
}

// -- MODEL FUNCTIONS --

/**
 * 
 * @param {*} stock 
 * @param {*} name 
 * @returns stock item or null
 */
function findItemByName(stock, name) {
  let found = null;

  for (let i = 0; i < stock.length; i++) {
    if (stock[i].name === name) {
      found = stock[i];
    }
  }

  return found
}

function filterStockByModel(stock, model) {
  // 1. filter the stock by a model
  // 2. return with the new list
}

function filterStockByColor(stock, color) {
  // 1. filter the stock by a color
  // 2. return with the new list
}

function addItemToBasket(item) {
  // 1. add the item variable to a basket
  // 2. request to backend for store the order
  basket.push(item);
}

function getStock() {
  const stock = [
    {
      name: "chanel-1",
      model: "chanel",
      price: {
        usd: 1000,
        eur: 1200,
        huf: 300000,
      },
      color: "#f00",
      sizes: [32, 34, 36],
    },
    {
      name: "chanel-2",
      model: "chanel",
      price: {
        usd: 900,
        eur: 1000,
        huf: 250000,
      },
      color: "#0f0",
      sizes: [32, 34],
    },
    {
      name: "prada-1",
      model: "prada",
      price: {
        usd: 5000,
        eur: 6000,
        huf: 1000000,
      },
      color: "#00f",
      sizes: [32, 34, 36],
    },
    {
      name: "prada-2",
      model: "prada",
      price: {
        usd: 500,
        eur: 600,
        huf: 50000,
      },
      color: "#fe2",
      sizes: [32, 34, 36],
    },
    {
      name: "lanvin-1",
      model: "lanvin",
      price: {
        usd: 800,
        eur: 900,
        huf: 80000,
      },
      color: "#f00",
      sizes: [32, 36],
    },
  ];

  return stock;
}

function getStockForShop() {
  // 1. make a request to a backend
  // 2. place the response to a variable
  const stock = getStock();
  // manipulate?

  // 3. return with the stock
  return stock;
}

main();
