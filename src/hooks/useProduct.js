import { useState, useEffect } from 'react';

const useProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Giả sử API trả về danh sách sản phẩm tại endpoint /api/products
    fetch('http://localhost:5000/api/product/getall')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Nếu dữ liệu có trường _id, chuyển thành id để sử dụng trong component
        const formattedProducts = data.map(product => ({
          ...product,
          id: product._id || product.id,
        }));
        setProducts(formattedProducts);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return [products];
};

export default useProduct;
