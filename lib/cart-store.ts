export type GameItem = {
  id: string;
  judul: string;
  harga: number;
  warna?: string;
};

export type CartItem = {
  id: string;
  judul: string;
  harga: number;
  kuantitas: number;
};

type Listener = () => void;

let cartItems: CartItem[] = [];
const listeners = new Set<Listener>();

const notify = () => {
  listeners.forEach(listener => listener());
};

export const subscribeCart = (listener: Listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const getCartItems = () => cartItems;

export const addGameToCart = (game: GameItem) => {
  const existingItem = cartItems.find(item => item.id === game.id);

  if (existingItem) {
    cartItems = cartItems.map(item =>
      item.id === game.id ? { ...item, kuantitas: item.kuantitas + 1 } : item
    );
  } else {
    cartItems = [...cartItems, { id: game.id, judul: game.judul, harga: game.harga, kuantitas: 1 }];
  }

  notify();
};

export const updateCartQuantity = (id: string, tipe: 'tambah' | 'kurang') => {
  cartItems = cartItems
    .map(item => {
      if (item.id !== id) {
        return item;
      }

      const newQuantity = tipe === 'tambah' ? item.kuantitas + 1 : item.kuantitas - 1;

      return { ...item, kuantitas: newQuantity };
    })
    .filter(item => item.kuantitas > 0);

  notify();
};

export const clearCart = () => {
  cartItems = [];
  notify();
};

export const calculateCartTotal = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + item.harga * item.kuantitas, 0);
