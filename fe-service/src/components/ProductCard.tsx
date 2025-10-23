import { Star, ShoppingCart } from "lucide-react";
import { Product } from "../lib/types/Product";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "./ui/card";
import { useCart } from "../lib/context/CartContext";
import Image from "next/image";
import { Rating } from "./Rating";

interface ProductCardProps {
    product: Product;
    onClick: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Card onClick={onClick} className="h-full flex flex-col cursor-pointer">
      <CardContent className="flex flex-col items-center justify-center p-4 shrink-0">
        <Image src={product.coverImage} alt={product.title} width={100} height={100} className="object-contain h-48 rounded"/>
      </CardContent>
      <CardFooter className="text-center flex flex-col p-4 grow justify-between">
        <div className="flex flex-col space-y-2">
          <CardTitle className="line-clamp-2 min-h-10">{product.title}</CardTitle>
          <CardDescription className="line-clamp-2 min-h-10">{product.description}</CardDescription>
        </div>
        
        <div className="flex flex-col space-y-2 mt-auto">
          <Rating rating={product.rating} />
          <p className="text-sm text-gray-500">Price: <strong>R{product.price}</strong></p>
          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </CardFooter>
    </Card>
  );
};
