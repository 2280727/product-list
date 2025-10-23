import { Star } from "lucide-react";
import React from "react";


export const Rating: React.FC<{ rating: number }> = ({ rating }) => {
    const getStarType = (index: number) => {
      const starPosition = index + 1;
      
      if (rating >= starPosition) {
        return 'filled'; 
      } else {
        return 'empty';
      }
    };
  
    return (
      <div className="flex items-center space-x-1">
        {Array.from({ length: 5 }).map((_, index) => {
          const starType = getStarType(index);
          
          const renderStar = () => {
            if (starType === 'filled') {
              return <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />;
            }
            return <Star className="w-4 h-4 text-gray-300" />;
          };
          
          return (
            <div key={`${rating}-${index}`} className="relative">
              {renderStar()}
            </div>
          );
        })}
        <span className="text-sm text-gray-600 ml-1">({rating})</span>
      </div>
    );
  };