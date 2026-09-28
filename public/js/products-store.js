const PRODUCT_STORAGE_KEY = "bejiroo_products";

const DEFAULT_PRODUCTS = [
  [1, "Bolo de Cenoura Especial", "Massa fofinha de cenoura com cobertura cremosa de chocolate.", "bolos", 42, 15, "bolo"],
  [2, "Torta de Chocolate", "Base crocante de chocolate com recheio intenso e cremoso.", "tortas", 45, 10, "torta"],
  [3, "Brownie com Brigadeiro", "Brownie macio de chocolate coberto com brigadeiro artesanal.", "doces", 12.9, 25, "brownie"],
  [4, "Brigadeiro Bejiróó", "Brigadeiro tradicional de chocolate, decorado com granulado.", "doces", 8, 40, "doce"],
  [5, "Cheesecake de Frutas Vermelhas", "Cheesecake cremoso com cobertura de frutas vermelhas.", "sobremesas", 16.5, 12, "cheesecake"],
  [6, "Bolo de Laranja Caseiro", "Bolo fofinho de laranja com calda cítrica.", "bolos", 38, 8, "bolo"],
  [7, "Torta de Limão", "Creme azedinho de limão sobre base crocante e cobertura suave.", "tortas", 14, 14, "torta"],
  [8, "Pudim de Leite", "Pudim cremoso de leite com calda de caramelo.", "sobremesas", 10, 18, "pudim"],
  [9, "Trufa de Chocolate", "Trufa cremosa de chocolate com cobertura de cacau.", "doces", 6.5, 30, "trufa"],
  [10, "Trufa de Maracujá", "Trufa de chocolate branco com recheio de maracujá.", "doces", 7, 25, "trufa"],
  [11, "Beijinho de Coco", "Doce macio de coco finalizado com coco ralado.", "doces", 6, 35, "beijinho"],
  [12, "Cajuzinho de Amendoim", "Doce de amendoim com toque de chocolate.", "doces", 6, 28, "cajuzinho"],
  [13, "Cookie de Chocolate", "Cookie crocante por fora e macio por dentro com gotas de chocolate.", "doces", 9, 20, "cookie"],
  [14, "Cupcake Red Velvet", "Cupcake red velvet com cobertura cremosa de cream cheese.", "bolos", 14, 16, "cupcake"],
  [15, "Mousse de Maracujá", "Mousse leve de maracujá com calda da fruta.", "sobremesas", 12, 18, "mousse"],
  [16, "Pavê de Chocolate", "Pavê cremoso de chocolate com biscoito e raspas.", "sobremesas", 13, 15, "pavê"],
  [17, "Maçã do Amor", "Maçã fresca envolvida em uma casquinha crocante de caramelo vermelho.", "doces", 6, 25, "maçã"],
].map(([id, name, description, category, price, stock, image]) => ({
  id,
  name,
  description,
  category,
  price,
  stock,
  image,
  active: true,
}));

function getProducts() {
  const saved = localStorage.getItem(PRODUCT_STORAGE_KEY);
  if (!saved) {
    localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(DEFAULT_PRODUCTS));
    return [...DEFAULT_PRODUCTS];
  }
  try {
    const products = JSON.parse(saved);
    if (!products.some((product) => productImageFile(product) === "10.jpg")) {
      products.push(DEFAULT_PRODUCTS.find((product) => product.id === 17));
    }
    products.forEach((product) => {
      product.description = productDescription(product);
    });
    localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(products));
    return products;
  } catch {
    localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(DEFAULT_PRODUCTS));
    return [...DEFAULT_PRODUCTS];
  }
}

function saveProducts(products) {
  localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(products));
}

function formatPrice(value) {
  return Number(value).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function nextProductId(products) {
  return products.reduce((highest, product) => Math.max(highest, Number(product.id)), 0) + 1;
}

function productDescription(product) {
  const name = product.name.toLocaleLowerCase("pt-BR");
  const descriptions = [
    ["bolo de cenoura", "Massa fofinha de cenoura com cobertura cremosa de chocolate."],
    ["torta de chocolate", "Base crocante de chocolate com recheio intenso e cremoso."],
    ["brownie com brigadeiro", "Brownie macio de chocolate coberto com brigadeiro artesanal."],
    ["brigadeiro", "Brigadeiro tradicional de chocolate, decorado com granulado."],
    ["cheesecake", "Cheesecake cremoso com cobertura de frutas vermelhas."],
    ["torta de limão", "Creme azedinho de limão sobre base crocante e cobertura suave."],
    ["torta de limao", "Creme azedinho de limão sobre base crocante e cobertura suave."],
    ["mini torta salgada", "Massa dourada recheada com creme salgado, frango e vegetais."],
    ["trufa de morango", "Trufa de chocolate com recheio cremoso de morango."],
    ["maca do amor", "Maçã fresca envolvida em uma casquinha crocante de caramelo vermelho."],
    ["maçã do amor", "Maçã fresca envolvida em uma casquinha crocante de caramelo vermelho."],
    ["donuts", "Donut macio e dourado, perfeito para acompanhar um café."],
    ["bolo salgado", "Bolo salgado macio, recheado e decorado com creme e vegetais."],
  ];
  return descriptions.find(([label]) => name.includes(label))?.[1] || product.description;
}

function productImageFile(product) {
  const name = product.name.toLocaleLowerCase("pt-BR");
  const imageByName = [
    ["bolo de cenoura", "02.jpg"],
    ["torta de chocolate", "03.jpg"],
    ["brownie com brigadeiro", "04.jpg"],
    ["brigadeiro", "05.jpg"],
    ["cheesecake", "06.jpg"],
    ["torta de limão", "07.jpg"],
    ["torta de limao", "07.jpg"],
    ["mini torta salgada", "08.jpg"],
    ["trufa de morango", "09.jpg"],
    ["maçã do amor", "10.jpg"],
    ["maca do amor", "10.jpg"],
    ["donuts", "11.jpg"],
    ["bolo salgado", "12.jpg"],
  ];
  return imageByName.find(([label]) => name.includes(label))?.[1] || null;
}