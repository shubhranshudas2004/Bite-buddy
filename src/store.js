import { configureStore, createSlice } from "@reduxjs/toolkit";

// ---------- CART LOCAL STORAGE HELPERS ----------
const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem("biteBuddy_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
    return [];
  }
};

const saveCartToStorage = (cart) => {
  try {
    localStorage.setItem("biteBuddy_cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
};

// ---------- AUTH LOCAL STORAGE HELPERS ----------
const saveAuthToStorage = (auth) => {
  localStorage.setItem("auth", JSON.stringify(auth));
};

const loadAuthFromStorage = () => {
  const data = localStorage.getItem("auth");
  return data ? JSON.parse(data) : { isLoggedIn: false, user: null };
};

// ---------- INITIAL STATE ----------
const initialState = {
  vegProducts: [
    { id: 101, name: "Dosa", price: 60, image: "/dosa.jpg", description: "Crispy South Indian dosa made with fermented rice and lentil batter, served with coconut chutney and sambar." },
    { id: 102, name: "Bonda", price: 80, image: "/bonda.jpg", description: "Delicious deep-fried potato dumplings coated in chickpea flour batter, perfect as a snack." },
    { id: 103, name: "Idly", price: 60, image: "/idly.jpg", description: "Steamed rice cakes made from fermented batter, served with chutney and sambar for a healthy breakfast." },
    { id: 104, name: "Paneer", price: 70, image: "/paneer.jpg", description: "Fresh cottage cheese cubes cooked in rich tomato gravy with aromatic spices." },
    { id: 105, name: "Uthappam", price: 50, image: "/uthappam.jpg", description: "Thick rice pancake topped with onions, tomatoes, and green chilies, a savory breakfast delight." },
    { id: 106, name: "Pavbagi", price: 90, image: "/pavbagi.jpg", description: "Spicy potato filling stuffed in soft pav bread, a popular street food from Maharashtra." },
    { id: 107, name: "Poori", price: 40, image: "/poori.jpg", description: "Fluffy deep-fried bread made from wheat flour, served with potato curry." },
    { id: 108, name: "Punugulu", price: 60, image: "/punugulu.jpg", description: "Crispy Andhra-style fritters made from rice flour and spices, a crunchy snack." },
    { id: 109, name: "Appe", price: 80, image: "/Appe.jpg", description: "Steamed rice dumplings with fermented batter, filled with potatoes and spices." },
    { id: 110, name: "Vankaya Curry", price: 100, image: "/vankaya.jpg", description: "Tender eggplant cooked in rich coconut gravy with South Indian spices." },
    { id: 111, name: "Carrot Curry", price: 80, image: "/carrot.jpg", description: "Sweet and nutritious carrot curry simmered in coconut milk with mild spices." },
    { id: 112, name: "Aloo", price: 60, image: "/aloo.jpg", description: "Classic potato curry with tomatoes, onions, and a blend of aromatic spices." }
  ],
  nonVegProducts: [
    { id: 201, name: "Chicken", price: 100, image: "/chicken.jpg", description: "Tender and juicy chicken pieces cooked with aromatic spices and herbs." },
    { id: 202, name: "Mutton", price: 480, image: "/mutton.jpg", description: "Rich and flavorful mutton curry made with premium cuts and traditional spices." },
    { id: 203, name: "Fish", price: 260, image: "/fish.jpg", description: "Fresh fish fillets marinated and grilled to perfection with lemon and herbs." },
    { id: 204, name: "Prawns", price: 170, image: "/frans.jpg", description: "Succulent prawns cooked in a spicy masala with coconut milk." },
    { id: 205, name: "Egg", price: 50, image: "/egg.jpg", description: "Boiled eggs seasoned with salt and pepper, a simple yet delicious snack." },
    { id: 206, name: "Chicken 65", price: 350, image: "/chicken1.jpg", description: "Spicy and crispy chicken bites marinated in red chili and fried golden." },
    { id: 207, name: "Chicken Biryani", price: 100, image: "/biryani.jpg", description: "Aromatic basmati rice cooked with tender chicken, saffron, and spices." },
    { id: 208, name: "Mutton Biryani", price: 480, image: "/mutton1.jpg", description: "Exquisite mutton biryani with long-grain rice, caramelized onions, and rich gravy." },
    { id: 209, name: "Hyd Biryani", price: 260, image: "/hyd.jpg", description: "Hyderabadi-style biryani with marinated meat, boiled eggs, and nuts." },
    { id: 210, name: "Fish Fry", price: 170, image: "/fish2.jpg", description: "Crispy fried fish coated in a spicy batter, served with lemon wedges." },
    { id: 211, name: "Fish Pakoda", price: 300, image: "/pakoda.jpg", description: "Fish pieces dipped in chickpea batter and deep-fried until golden." },
    { id: 212, name: "Mutton Fry", price: 350, image: "/mutton3.jpg", description: "Spicy mutton pieces stir-fried with onions, chilies, and curry leaves." }
  ],
  drinkProducts: [
    { id: 301, name: "Coca Cola", price: 40, image: "/coca.jpg", description: "Classic cola drink with a refreshing fizz and iconic taste." },
    { id: 302, name: "Pepsi", price: 40, image: "/pepsi.jpg", description: "Crisp and refreshing cola soda with a smooth finish." },
    { id: 303, name: "String", price: 35, image: "/string.jpg", description: "Cool lemon-lime flavored soda with a zesty twist." },
    { id: 304, name: "Thums Up", price: 45, image: "/thump.jpg", description: "Strong and bold cola with a unique Indian flavor profile." },
    { id: 305, name: "Maaza", price: 50, image: "/maza.jpg", description: "Delicious mango juice made from real mangoes, sweet and tropical." },
    { id: 306, name: "Fanta", price: 40, image: "/fanta.jpg", description: "Tangy orange soda bursting with citrus flavor." },
    { id: 307, name: "7 Up", price: 35, image: "/7up.jpg", description: "Clear lemon-lime soda with a crisp and clean taste." },
    { id: 308, name: "Red Bull", price: 120, image: "/red.jpg", description: "Energizing drink with caffeine, taurine, and B-vitamins." },
    { id: 309, name: "Mountain Dew", price: 45, image: "/mountain.jpg", description: "Bold citrus-flavored soda with a unique mountain-inspired taste." },
    { id: 310, name: "Lemonade", price: 35, image: "/lemon.jpg", description: "Fresh lemonade made with real lemons, sweet and tangy." },
    { id: 311, name: "Lassi", price: 120, image: "/lassy.jpg", description: "Traditional Indian yogurt drink, sweet and refreshing." },
    { id: 312, name: "Prime", price: 45, image: "/prime.jpg", description: "Bold citrus-flavored energy drink with a refreshing kick." }
  ],
  cart: loadCartFromStorage(),
  orders: [],
};

// ---------- PRODUCTS + CART SLICE ----------
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Add Products
    addVegProduct: (state, action) => state.vegProducts.push(action.payload),
    addNonVegProduct: (state, action) => state.nonVegProducts.push(action.payload),
    addDrinkProduct: (state, action) => state.drinkProducts.push(action.payload),

    // Cart logic
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.cart.find((p) => p.id === item.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.cart.push({ ...item, quantity: 1 });
      }
      saveCartToStorage(state.cart);
    },
    updateCartQuantity: (state, action) => {
      const { id, delta } = action.payload;
      const item = state.cart.find((p) => p.id === id);
      if (item) {
        item.quantity += delta;
        if (item.quantity < 1) {
          state.cart = state.cart.filter((p) => p.id !== id);
        }
      }
      saveCartToStorage(state.cart);
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((p) => p.id !== action.payload);
      saveCartToStorage(state.cart);
    },
    clearCart: (state) => {
      state.cart = [];
      saveCartToStorage(state.cart);
    },

    // Orders logic
    placeOrder: (state, action) => {
      if (state.cart.length > 0) {
        state.orders.push({
          id: Date.now(),
          items: [...state.cart],
          date: new Date().toLocaleString(),
          discountedPrice: action.payload.discountedPrice,
        });
        state.cart = [];
        saveCartToStorage(state.cart);
      }
    },
  },
});

// ---------- AUTH SLICE ----------
const initialAuthState = loadAuthFromStorage();

function authReducer(state = initialAuthState, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      const loggedInState = { isLoggedIn: true, user: action.payload };
      saveAuthToStorage(loggedInState);
      return loggedInState;
    case "LOGOUT":
      saveAuthToStorage({ isLoggedIn: false, user: null });
      return { isLoggedIn: false, user: null };
    default:
      return state;
  }
}

// ---------- EXPORT ACTIONS ----------
export const {
  addVegProduct,
  addNonVegProduct,
  addDrinkProduct,
  addToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
  placeOrder,
} = productSlice.actions;

export const selectAuth = (state) => state.auth;
export const logout = () => ({ type: "LOGOUT" });

// ---------- STORE ----------
export const store = configureStore({
  reducer: {
    products: productSlice.reducer,
    auth: authReducer,
  },
});

// ---------- SELECTORS ----------
export const selectVegProducts = (state) => state.products.vegProducts;
export const selectNonVegProducts = (state) => state.products.nonVegProducts;
export const selectDrinkProducts = (state) => state.products.drinkProducts;
export const selectCart = (state) => state.products.cart;
export const selectOrders = (state) => state.products.orders;
