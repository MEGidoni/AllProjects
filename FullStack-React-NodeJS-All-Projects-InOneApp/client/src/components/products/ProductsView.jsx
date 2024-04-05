import React, { useContext, useState } from 'react';
import Product from './Product';
import UserContext from '../../context/userContext';
import { DELETE_PRODUCT_URL, UPDATE_PRODUCT_URL } from '../../routes/URLS';
import axios from 'axios';
import Loading from '../../shared/Loading';

const ProductsView = ({ products, setProducts }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);

  const onDeleteClick = async (id) => {
    try {
      setLoading(true);
      await axios.post(DELETE_PRODUCT_URL, { id });
      setProducts(products.filter(product => product.id !== id));
      setLoading(false);
    }
    catch (error) {
      console.error("Error deleting product:", error);
      setLoading(false);
    }
  };

  const onUpdateTaken = async (id) => {

    let x;

    const findProduct = () => products.map(product => {
      if (product.id === id) {
        return product;
      }
    })
    const pist = findProduct();
    for (let index = 0; index < pist.length; index++) {
      if (pist[index]) {
        x = pist[index].is_taken;
      }
    }

    try {
      setLoading(true);
      await axios.post(UPDATE_PRODUCT_URL, { id, new_is_taken: !x });
      setProducts(products.map(product => {
        if (product.id === id) {
          return { ...product, is_taken: !product.is_taken };
        }
        return product;
      }));
      setLoading(false)
    }
    catch (error) {
      console.error("Error changing product:", error);
      setLoading(false);
    }
  };
  
  const updateProduct = async (id, { amount, product_name }) => {

    try {
      setLoading(true);
      await axios.post(UPDATE_PRODUCT_URL, { id , newName:product_name , newAmount: amount });
      setProducts(products.map(product => {
        if (product.id === id) {
          return { ...product, amount, product_name };
        }
        return product;
      }));
      setLoading(false)
    }
    catch (error) {
      console.error("Error changing product:", error);
      setLoading(false);
    }
  };

  if (!user) {
    return <div> <h2 className='text-center text-red-600 text-2xl'>Only Registered Users Can Add Products!</h2></div>;
  }

  if (loading) {
    return <Loading on={loading} />;
  }

  if (products.length === 0) {
    return <div> <h2 className='text-center text-blue-600 text-2xl'>Add Products!</h2></div>;
  }

  return (
    <div className='flex flex-col items-center gap-2'>
      {products
        .filter(product => product.user_id === user.id)
        .map(product => (
          <Product
            key={product.id}
            product={product}
            user_id={user.id}
            onDeleteClick={() => onDeleteClick(product.id)}
            onUpdateTaken={() => onUpdateTaken(product.id)}
            updateProduct={({ amount, product_name }) => updateProduct(product.id, { amount, product_name })}
          />
        ))}
    </div>
  );
};

export default ProductsView;

