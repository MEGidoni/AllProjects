import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { productsValidation } from '../../../schemas/productsValidition';
import { MdCancel } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";

const EditProduct = ({ defaultValues , closeEditMode , updateProduct }) => {
    const { register,reset, handleSubmit , formState : { errors } , watch } = useForm(
        {
          defaultValues:defaultValues ,
          resolver: zodResolver(productsValidation)
        });
        const setValues = ()=>{

          handleSubmit(
            
            (data)=>{
              updateProduct(data)
              closeEditMode()
            })();
        }
  return (
    <form className="flex gap-1 w-full justify-between items-center">
            <input placeholder='amount' className='w-16 outline-none border px-2 py-1' {...register("amount", { valueAsNumber: true })} type='number' />
            <input placeholder={errors.product_name && errors.product_name.message} className='outline-none border px-2 py-1' {...register("product_name")} type='text' />
            <div className='flex gap-3'>
                <MdCancel onClick={closeEditMode} color='red' cursor="pointer" size={28} />
                <FaCircleCheck onClick={setValues} color='green' cursor="pointer" className='mt-0.5' size={24} />
            </div>
        </form>
  )
}

export default EditProduct