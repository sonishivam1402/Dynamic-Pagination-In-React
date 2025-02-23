import React, { useEffect, useState } from 'react';
import '../styles/product.css';

const FrontendHeavyPagination = () => {
  const ProductCard = ({ title, image, price }) => {
    return (
      <div className="card">
        <img className="card-image" src={image} alt={title} />
        <h2 className="card-title">{title}</h2>
        <span className="card-price">${price}</span>
      </div>
    );
  };

  const Page_Size = 10;

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const loadDataFetch = async () => {
    const response = await fetch("https://dummyjson.com/products?limit=200");
    const json = await response.json();
    setData(json.products);
  };

  useEffect(() => {
    loadDataFetch();
  }, []);

  const totalProducts = data.length;
  const totalPages = Math.ceil(totalProducts / Page_Size);
  const start = currentPage * Page_Size;
  const end = start + Page_Size;

  const handlePageClick = (e) => {
    const pageNumber = Number(e.target.textContent);
    setCurrentPage(pageNumber - 1);
  }

  const handlePage = (e) => {
    if (e.target.textContent === '<') {
      setCurrentPage((prev) => prev  - 1);
    } else {
      setCurrentPage((prev) => prev + 1);
    }
  }

  return (
    <div className="container">
      <h1 className="title">Frontend Heavy Pagination</h1>
      <div className='pagination-container'>
        <button className='page-number' onClick={handlePage} disabled={currentPage==0}>&lt;</button>
        {[...Array(totalPages).keys()].map((index) => (
          <span key={index} className={"page-number" + (currentPage===index ? " active":"")} onClick={handlePageClick}>{index + 1}</span>
        ))}
        <button className='page-number' onClick={handlePage} disabled={currentPage == totalPages-1}>&gt;</button>
      </div>


      <div className="grid">
        {data.slice(start, end).map((product) => (
          <ProductCard key={product.id} title={product.title} image={product.thumbnail} price={product.price} />
        ))}
      </div>
      <div className="button-container">




        {/* Load More Button */}
        {/* {showCard < total && (
          <button onClick={() => setShowCard((prev) => prev + 5)} className="load-more">
            Load More
          </button>
        )} */}
      </div>
    </div>
  );
};

export default FrontendHeavyPagination;
