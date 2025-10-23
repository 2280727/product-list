"use client";
import { CartPopOver } from "./CartPopOver";

export const TopNav = () => {
  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold">
              Book Store
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <CartPopOver />
          </div>
        </div>
      </div>
    </nav>
  );
};