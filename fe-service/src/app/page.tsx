"use client";

import { useState, useEffect } from "react";
import books from "@/lib/data/books.json";
import { ProductCard } from "@/components/ProductCard";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [maxVisiblePages, setMaxVisiblePages] = useState(4);
  const router = useRouter();
  
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerPage(8);
        setMaxVisiblePages(7); 
      } else {
        setItemsPerPage(4);
        setMaxVisiblePages(4);
      }
    };

    updateItemsPerPage();
    //also call this when the window resizes
    window.addEventListener('resize', updateItemsPerPage);
    
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  //if currentPage is 2, startIndex is 4, if currentPage is 3, startIndex is 8, given items per page is 4
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBooks = books.slice(startIndex, endIndex);
  
  const goToPage = (page: number) => {
    setCurrentPage(page);
  };
  const totalPages = Math.ceil(books.length / itemsPerPage);
  const getVisiblePages = () => {
    const pages = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);
    
    let startPage = Math.max(1, currentPage - halfVisible);
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  const visiblePages = getVisiblePages();

  const handleBookClick = (id: string) => {
    router.push(`/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Digital Books Store
          </h1>
          <p>
            Discover amazing digital books and start your reading journey
          </p>
        </header>
        <main>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {currentBooks.map((book) => (
              <ProductCard key={book.id} product={book} onClick={() => handleBookClick(book.id)} />
            ))}
          </div>
          <div className="flex justify-center items-center space-x-2 mb-8">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft />
            </button>
            <div className="flex space-x-1">
              {visiblePages[0] > 1 && (
                <>
                  <button
                    onClick={() => goToPage(1)}
                    className="px-3 py-2 rounded-lg text-sm font-medium bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                  >
                    1
                  </button>
                  {visiblePages[0] > 2 && (
                    <span className="px-2 py-2 text-gray-500">...</span>
                  )}
                </>
              )}
              {visiblePages.map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              {visiblePages[visiblePages.length - 1] < totalPages && (
                <>
                  {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
                    <span className="px-2 py-2 text-gray-500">...</span>
                  )}
                  <button
                    onClick={() => goToPage(totalPages)}
                    className="px-3 py-2 rounded-lg text-sm font-medium bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowRight />
            </button>
          </div>
          <div className="text-center text-gray-600">
            <p>
              Showing {startIndex + 1}-{Math.min(endIndex, books.length)} of {books.length} books
            </p>
            <p className="text-sm mt-1">
              Page {currentPage} of {totalPages}
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}