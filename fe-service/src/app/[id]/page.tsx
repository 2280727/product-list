"use client";
import { useParams } from "next/navigation";
import { ArrowLeft, ShoppingCart, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import books from "@/lib/data/books.json";
import { useCart } from "@/lib/context/CartContext";
import Image from "next/image";
import { Rating } from "@/components/Rating";

export default function BookDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const book = books.find((book) => book.id === id);

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Book Not Found</h1>
        <button
          onClick={() => router.back()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  const discountedPrice = book.price * (1 - book.discount);
  const formatPrice = (price: number) => `R${price.toFixed(2)}`;

  const handleAddToCart = () => {
    addToCart(book);
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <button
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Books</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className=" max-w-md mx-auto">
              <Image
                src={book.coverImage}
                alt={book.title}
            
                className="object-cover rounded-lg shadow-lg"
                width={500}
                height={500}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
              <p className="text-xl text-gray-600 mb-4">by {book.author}</p>
              
              <div className="flex items-center space-x-4 mb-4">
                <Rating rating={book.rating} />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">
                  {book.discount > 0 ? (
                    <div className="flex items-center space-x-2">
                      <span className="text-green-600">{formatPrice(discountedPrice)}</span>
                      <span className="text-lg text-gray-500 line-through">
                        {formatPrice(book.price)}
                      </span>
                    </div>
                  ) : (
                    formatPrice(book.price)
                  )}
                </span>
                {book.discount > 0 && (
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    -{Math.round(book.discount * 100)}% OFF
                  </span>
                )}
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>
            </div>

            <div className="space-y-4">
              <h3>Description</h3>
              <p>{book.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4>Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <strong >Pages:</strong>
                    <span className="font-medium">{book.pages}</span>
                  </div>
                  <div className="flex justify-between">
                    <strong >Format:</strong>
                    <span className="font-medium">{book.format}</span>
                  </div>
                  <div className="flex justify-between">
                    <strong >Language:</strong>
                    <span className="font-medium">{book.language}</span>
                  </div>
                  <div className="flex justify-between">
                    <strong>Released:</strong>
                    <span className="font-medium">
                      {new Date(book.releaseDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4>Category</h4>
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {book.genre}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

