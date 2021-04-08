import CartItem from './CartItem';

// Styles
import { Wrapper, StyledCloseButton } from './Cart.styles';

// Types
import { CartItemType } from '../App';

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
  setCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Cart: React.FC<Props> = ({
  cartItems,
  addToCart,
  removeFromCart,
  setCartOpen,
}) => {
  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);
  return (
    <Wrapper>
      <StyledCloseButton onClick={() => setCartOpen(false)} />
      <h2>Your shopping cart</h2>
      {cartItems.length === 0 && <p>No items in the cart</p>}
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
    </Wrapper>
  );
};

export default Cart;
