import React, { useContext, useEffect, useState } from 'react';
import ProductsControll from './ProductsControll';
import ProductsView from './ProductsView';
import UserContext from '../../context/userContext';
import { PULL_PRODUCTS_BY_USER_URL } from '../../routes/URLS';
import axios from 'axios';
import Loading from "../../shared/Loading";

const Products = () => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  let fetchProducts = async () => {
    if (user) {
      setLoading(true);
      try {
        const link = PULL_PRODUCTS_BY_USER_URL + "?userId=" + user.id;
        const response = await axios.get(link);
        setProducts(response.data.products);
        setLoading(false);
      }
      catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    }
  };

  let toBePurchased = [];

  let purchasedProducts = [];

  useEffect(() => {

    if (products.length > 0) {

      const prods = [...products];

      toBePurchased = prods.filter(product => !product.is_taken);

      purchasedProducts = prods.filter(product => product.is_taken);

      toBePurchased.sort((a, b) => b.product_name && a.product_name.localeCompare(b.product_name));

      purchasedProducts.sort((a, b) => b.product_name && a.product_name.localeCompare(b.product_name));

      let sortedProducts = [...toBePurchased, ...purchasedProducts];

      if (JSON.stringify(products) !== JSON.stringify(sortedProducts)) {
        setProducts(sortedProducts);
      }

    }

  }, [toBePurchased, purchasedProducts]);

  useEffect(() => {
    fetchProducts();
  }, [user]);

  return (
    <>
      <Loading cn={"prod"} on={loading} />
      <div style={{ backgroundImage: "url('https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg')", minHeight: "641px", backgroundSize: 'cover', justifyItems: "center", backgroundAttachment: 'fixed' }}>
        <ProductsControll setProducts={setProducts} />
        {products.length > 0 ? (
          <div className='flex w-[100%] justify-center'>
            <div className='bg-white bg-opacity-65 w-[30%] rounded-lg'>
              <ProductsView products={products} setProducts={setProducts} />
            </div>
          </div>
        ) : (
          <div className='flex justify-center'>
            <div className='w-[40%]'>
              {!user ? (
                <h2 className='text-center bg-slate-300 rounded-xl text-red-600 text-2xl'>Only Registered Users Can Add Products!</h2>
              ) : (
                <h2 className='text-center bg-slate-300 rounded-xl text-blue-600 text-2xl'> Add Products!</h2>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Products;
