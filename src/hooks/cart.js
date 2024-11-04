import AsyncStorage from '@react-native-async-storage/async-storage';

const CART_KEY = '@cart_items';

// Função para listar os produtos do carrinho
export const listProducts = async () => {
  try {
    const cartData = await AsyncStorage.getItem(CART_KEY);
    return cartData ? JSON.parse(cartData) : [];
  } catch (error) {
    console.error("Erro ao listar produtos:", error);
    return [];
  }
};

// Função para adicionar um produto ao carrinho
export const addProduct = async (item) => {
    try {
      const cartData = await listProducts();
      const existingProduct = cartData.find((product) => product.id === item.id);
  
      if (existingProduct) {
        existingProduct.value += 1;
      } else {
        cartData.push(item);
      }
  
        await AsyncStorage.setItem(CART_KEY, JSON.stringify(cartData));
        return true;
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
    }
  };
  export const removeProduct = async (id) => {
    try {
      const cartData = await listProducts();
      const updatedCart = cartData.filter((product) => product.id !== id);
      await AsyncStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
    } catch (error) {
      console.error("Erro ao remover produto:", error);
    }
  };
  
  // Função para incrementar a quantidade de um produto no carrinho
  export const incrementProductValue = async (id) => {
    try {
      const cartData = await listProducts();
      const product = cartData.find((product) => product.id === id);
  
      if (product) {
        product.value += 1;
        await AsyncStorage.setItem(CART_KEY, JSON.stringify(cartData));
      }
    } catch (error) {
      console.error("Erro ao incrementar valor do produto:", error);
    }
  };
  
  // Função para decrementar a quantidade de um produto no carrinho, garantindo que não seja menor que 0
  export const decrementProductValue = async (id) => {
    try {
      const cartData = await listProducts();
      const product = cartData.find((product) => product.id === id);
  
      if (product && product.value > 0) {
        product.value -= 1;
        await AsyncStorage.setItem(CART_KEY, JSON.stringify(cartData));
      }
    } catch (error) {
      console.error("Erro ao decrementar valor do produto:", error);
    }
  };
// Função para remover todos os produtos do carrinho
export const removeAllProducts = async () => {
  try {
    await AsyncStorage.removeItem(CART_KEY);
  } catch (error) {
    console.error("Erro ao remover todos os produtos:", error);
  }
};
