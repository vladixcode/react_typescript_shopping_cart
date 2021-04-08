import { useState } from 'react';
import { useQuery } from 'react-query';

// Components
import Article from './Components/Article';
import Cart from './Components/Cart';
import Drawer from '@material-ui/core/Drawer';
import LinearPrograss from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';

// Styles
import { Wrapper, StyledButton } from './App.styles';

export type CartItemType = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  amount: number;
};

const PRODUCTS_REST_API_ENDPOINT = 'https://fakestoreapi.com/products';

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch(PRODUCTS_REST_API_ENDPOINT)).json();

const App: React.FC = () => {
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'products',
    getProducts
  );

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((accumulator: number, item) => accumulator + item.amount, 0);

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prev) => {
      if (prev.find((item) => item.id === clickedItem.id)) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((accumulator, item) => {
        if (item.id === id) {
          if (item.amount === 1) {
            return accumulator;
          } else {
            return [...accumulator, { ...item, amount: item.amount - 1 }];
          }
        } else {
          return [...accumulator, item];
        }
      }, [] as CartItemType[])
    );
  };

  if (isLoading) return <LinearPrograss />;
  if (error) return <h2>Something went wrong! Try again later...</h2>;

  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
          setCartOpen={setCartOpen}
        />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
            <Article item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default App;
