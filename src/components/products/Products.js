import React, { useState, useEffect } from 'react';
import Bounce from 'react-reveal/Bounce';
import useProduct from '../../hooks/useProduct';
import Heading from '../Heading';
import Product from './Product';

const Products = () => {
    const [data] = useProduct();
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

    // Khi data được load, gán luôn cho filteredProducts
    useEffect(() => {
        setFilteredProducts(data);
    }, [data]);

    // Hàm lọc sản phẩm dựa trên khoảng giá khi nhấn nút "Lọc"
    const handleFilter = () => {
        const filtered = data.filter(product => {
            const price = parseFloat(product.price);
            if (minPrice !== '' && price < parseFloat(minPrice)) return false;
            if (maxPrice !== '' && price > parseFloat(maxPrice)) return false;
            return true;
        });
        setFilteredProducts(filtered);
    };

    return (
        <section className="max-w-screen-xl mx-auto px-6 py-6 pb-24">
            <Heading title="Products" />
            {/* Phần lọc theo giá với 2 input và nút "Lọc" */}
            <div className="flex items-center space-x-4 mb-6">
                <input
                    type="number"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="border border-gray-300 p-2 rounded"
                />
                <input
                    type="number"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="border border-gray-300 p-2 rounded"
                />
                <button 
                    onClick={handleFilter}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                >
                    Filter
                </button>
            </div>
            {/* Hiển thị sản phẩm đã được lọc */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 py-6">
                {filteredProducts.slice(0, 6).map(product => (
                    <Bounce left key={product.id}>
                        <Product {...product} />
                    </Bounce>
                ))}
            </div>
        </section>
    );
};

export default Products;
