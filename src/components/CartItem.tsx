import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import storeItems from "../data/products.json";
import { formatCurrency } from "../utils/formatCurrency";
type CartItemProps = {
  id: number;
  quantity: number;
};

export function CartItem({ id, quantity }: CartItemProps) {
  const { removeFromCart } = useShoppingCart();
  const item = storeItems.find((i) => i.id === id) || { price: 0, title: "", id: 0, image: "" };
  if (item === null) return null;

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img src={item?.image} style={{ width: "125px", height: "75px", objectFit: "contain" }} />
      <div className="me-auto">
        <div>
          {item?.title}
          {quantity > 1 && <span className="text-muted">{quantity}x</span>}
        </div>
        <div className="text-muted">{formatCurrency(item?.price)}</div>
      </div>
      <div>{formatCurrency(item?.price * quantity)}</div>
      <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(item?.id)}>
        x
      </Button>
    </Stack>
  );
}
