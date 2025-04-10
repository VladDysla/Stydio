import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
    cartItems: [],
    error: null,
  },
  reducers: {
    addToCart(state, action) {
      const { product, selectedVolume, selectedPrice, quantity } = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
        item => item._id === product._id && item.selectedVolume === selectedVolume
      );

      if (existingItemIndex >= 0) {
        // Оновлюємо існуючий товар
        state.cartItems[existingItemIndex].quantity += quantity;
        state.cartItems[existingItemIndex].totalPrice = 
          state.cartItems[existingItemIndex].selectedPrice * 
          state.cartItems[existingItemIndex].quantity;
      } else {
        // Додаємо новий товар
        state.cartItems.push({
          ...product,
          _id: product._id, // Додаємо _id для коректної ідентифікації
          selectedVolume,
          selectedPrice,
          quantity,
          totalPrice: selectedPrice * quantity
        });
      }
    },
    updateCartItem(state, action) {
      const { id, quantity } = action.payload;
      const itemIndex = state.cartItems.findIndex(item => item._id === id);
      
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity = quantity;
        state.cartItems[itemIndex].totalPrice = 
          state.cartItems[itemIndex].selectedPrice * quantity;
      }
    },
    removeFromCart(state, action) {
      state.cartItems = state.cartItems.filter(
        item => item._id !== action.payload
      );
    },
    clearCart(state) {
      state.cartItems = [];
    }
  },
});

export const { addToCart, updateCartItem, removeFromCart, clearCart } = productSlice.actions;
export default productSlice.reducer;