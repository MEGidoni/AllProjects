import { zodResolver } from '@hookform/resolvers/zod';
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import { productsValidation } from '../../../schemas/productsValidition';
import UserContext from '../../context/userContext'
import {v4 as uuid, validate} from "uuid";
import { ADD_PRODUCT_URL } from '../../routes/URLS';
import { getAxiosStatus } from '../../utils/utils';
import axios from 'axios';

const ProductsControll = ({ setProducts }) => {
  const { user, setUser } = useContext(UserContext)

  const { register,reset, setError ,  handleSubmit , formState : { errors } , watch } = useForm(
    {
      defaultValues:{
        amount : 1
      },
      resolver: zodResolver(productsValidation)
    });

  const addProduct = async (data) => {
    // console.log(data);
    const prod = { id:uuid() , user_id:user.id , is_taken : false , ...data };
    
      // console.log({ prod });
      try {
          await axios.post(ADD_PRODUCT_URL, prod);
      }
      catch (err) {
          if (getAxiosStatus(err) == 409) {
              setError("error", { message: "product is alrady in your cart!" });
              return alert("product is alrady in your cart!");
          }
          else {
              setError("error", { message: "Network Error!" });
              return alert("network error!");
          }
      }
      setProducts(products =>
        [ prod , ...products ]
      )
      reset();
  }

  const [amountw,product_namew] = watch(["amount", "product_name"]);

  return (
    <>
    <form onSubmit={handleSubmit(addProduct)} className="p-4 flex justify-center items-center">
      <div>
        <input {...register("amount" , {valueAsNumber:true})} type='number' className="border p-2 m-2 w-28 rounded-md" placeholder="Amount" disabled={!user} />
        {
          !amountw ?
          (errors?.amount?.message ?
            <span className='bg-white text-red-600 rounded-md mx-2'>Amount must be greater than zero!</span>
            :
            <span className="bg-white material-symbols-outlined text-green-500 rounded-md mx-2">check</span>)
            :
            (<span></span>)
        }
      </div>
      <div>
        <input {...register("product_name")} type='text' className="border p-2 m-2 rounded-md" placeholder="Product" disabled={!user} />
        {
          product_namew?
          (errors?.product_name?.message ?
            <span className='bg-white text-red-600 rounded-md mx-2'>{errors?.product_name?.message}</span>
            :
            <span className="bg-white material-symbols-outlined text-green-500 rounded-md mx-2">check</span>)
            :
            (<span></span>)
        }
      </div>
      <button className={user?"bg-blue-500 text-white px-4 py-2 rounded":"bg-gray-500 text-white px-4 py-2 rounded"}  disabled={!user}>Add</button>
    </form>
    {/* <div className=' flex justify-center h-10'>
    <span className='text-red-600'>{errors?.amount?.message || errors?.product_name?.message}
    </span>
  </div> */}
  </>
  )
}

export default ProductsControll