import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import React from "react"
import { CartCard } from "./CartCard"
import { useCart } from "@/lib/context/CartContext";
import { ShoppingCart } from "lucide-react";


export const CartPopOver: React.FC = () =>{
  const { items, getTotalPrice, removeFromCart, updateQuantity } = useCart();
  const [open, setOpen] = React.useState(false)


  return(
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger data-testid="pop-over-button">
        <div className='flex'>
          <ShoppingCart className="w-8 h-8"/>
          <p data-testid="cart-item-count">{items.length}</p>
        </div>
      </PopoverTrigger>
      <PopoverContent data-testid="pop-over-content" className="relative w-[350px] md:w-[500px] pr-0" align="start" side="bottom">
        {items.length > 0 ? 
        <div>
          {items.map((item, i)=>(
            <CartCard key={item.product.id} item={item.product} last={items.length - 1  === i} onClick={removeFromCart} updateQuantity={updateQuantity} quantity={item.quantity}/>
          ))}
        <p className="absolute right-8 bottom-0 font-bold p-4">Total price: R{getTotalPrice()}</p>
        </div>
          :(
            <section className="">
                <h1>No items in the cart</h1>
            </section>
          )
        }
      </PopoverContent>

    </Popover>
  )
}