import { Product } from "@/lib/types/Product";
import clsx from "clsx";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";


type CartCardProps ={
    item: Product
    last?: boolean,
    onClick: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    quantity: number;
}

export const CartCard: React.FC<CartCardProps> =({
    item,
    last,
    onClick,
    updateQuantity,
    quantity
}) => {
    return (
        <div className={clsx(
            'flex relative align-middle bg-white overflow-hidden w-[90%] p-4 h-[150px] ',{
                'border-b-2': !last,
                '': last
            }
        )}>
            <Image src={item.coverImage} alt={item.title} width={100} height={100} className="object-contain h-48 rounded"/>
            <section className="flex flex-col">
                <p data-testid={`product-title`} className="px-3 mt-4 line-clamp-3">{item.title}</p>
                <p className="px-3 mt-4 font-bold">R{item.price}</p>
            </section>

            <div className="absolute top-8 right-[10px]">
                <button 
                className="text-red-800 p-2 mb-2 cursor-pointer"
                onClick={() => {
                    onClick(item.id);
                }}
                >
                    X
                </button>
                <div className="flex items-center justify-center space-x-2">
                <button
                    onClick={() => {
                        updateQuantity(item.id, quantity - 1);
                    }}
                    className="p-1 border cursor-pointer"
                >
                    <Minus className="w-4 h-4" />
                </button>
                <p>{quantity}</p>
                <button
                    onClick={() => {
                        updateQuantity(item.id, quantity + 1);
                    }}
                    className="p-1 border cursor-pointer"
                >
                    <Plus className="w-4 h-4" />
                </button>
                </div>
            </div>
        </div>
    )
}