import React, { useEffect, useState } from 'react';
import '../styles/product.css';

const Product = () => {
    const [data, setData] = useState([]);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(5);
    //const limit = 5;
    const [total, setTotal] = useState(30);

    const loadDataFetch = async (currentLimit, currentSkip) => {
        try {
            const response = await fetch(`https://dummyjson.com/products?limit=${currentLimit}&skip=${currentSkip}`);
            const result = await response.json();
            setData(result.products);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        loadDataFetch(limit, skip);
    }, [limit, skip]);

    const pageNumber = () => {
        let btnCount = total / limit;
        let buttons = [];

        for (let i = 0; i < btnCount; i++) {
            buttons.push(
                <button key={i} onClick={() => handlePageClick(i * btnCount)} className={(i * btnCount) == skip ? "active" : ""}>
                    {i + 1}
                </button>
            );
        }
        return buttons;
    };

    const handlePageClick = (page) => {
        setSkip(page);
    };

    const pageNav = (e) => {
        const action = e.target.getAttribute("data-action");
        setSkip((prevSkip) => {
            let newSkip = prevSkip;
            if (action === "prev") {
                newSkip -= Number(limit);
            } else {
                newSkip += Number(limit);
            }
            return newSkip;
        });
    };

    const showProduct = (formData) => {
        setTotal(formData.get("totalProducts"));
        setLimit(formData.get("limitProducts"));
        pageNumber();
        loadDataFetch(limit, 0);
    }

    return (
        <>
            <div className="product-container">
                <h2>Products</h2>
                <div className='form-container'>
                    <form action={showProduct}>
                        <label htmlFor="totalProducts">Total Products to have : </label>
                        <input type="number" name='totalProducts' min={0} /><br /><br />
                        <label htmlFor="limitProducts">Products to display per page : </label>
                        <input type="number" name='limitProducts' min={0} /><br /><br />
                        <button type='submit'>Submit</button>
                    </form>
                </div>
                <div className="card-container">
                    {data.map((product) => (
                        <div key={product.id} className="card">
                            <img src={product.thumbnail} alt={product.title} className="product-image" />
                            <div className="card-content">
                                <h3>{product.title}</h3>
                                <p className="price">Price: ${product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='pagination-container'>
                <button onClick={pageNav} data-action="prev" disabled={skip === 0}>Prev</button>
                {pageNumber()}
                <button onClick={pageNav} data-action="next" disabled={skip >= total - limit}>Next</button>
            </div>
        </>
    );
};

export default Product;
