import axios from 'axios';
import React, { useState } from 'react'
import { REGISTER_URL } from '../routes/URLS';
import { getAxiosStatus } from '../utils/utils';
import { useNavigate } from 'react-router-dom';
import Loading from '../shared/Loading';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { registerValidation } from '../../schemas/usersScema';
import { LuEye, LuEyeOff } from 'react-icons/lu';


const SignUp = () => {

    const { register, handleSubmit, setError, formState: { errors, isSubmitting }, watch } = useForm(
        {
            resolver: zodResolver(registerValidation),
            mode: "onChange",
        });

    const [passShow, setpassShow] = useState(true);
    const [namew, emailw, passwordw] = watch(["name", "email", "password"]);


    const nav = useNavigate();

    const my_register = async (data) => {
        // console.log({ data });
        try {
            await axios.post(REGISTER_URL, data);
            nav("/login");
        }
        catch (err) {
            if (getAxiosStatus(err) == 409) {
                setError("error", { message: "email already registered!" });
            }
            else {
                setError("error", { message: "Network Error!" });
            }
        }
    }




    return (
        <>
            <div className="max-w-md mx-auto mt-8 p-8 bg-white rounded shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
                <form
                    onSubmit={handleSubmit(my_register)}
                >
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-600 text-sm font-medium mb-2">
                            Name
                        </label>
                        <input

                            {...register("name")}

                            className="w-full border p-2 rounded focus:outline-none focus:border-blue-500"
                        />
                        {
                            namew ?
                                (errors?.name?.message ?
                                    <span className='text-red-600'>{errors?.name?.message}</span>
                                    :
                                    <span className="material-symbols-outlined text-green-500">check</span>)
                                :
                                (<span></span>)
                        }
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-600 text-sm font-medium mb-2">
                            Email
                        </label>
                        <input

                            {...register("email")}

                            className="w-full border p-2 rounded focus:outline-none focus:border-blue-500"

                        />
                        {
                            emailw ?
                                (errors?.email?.message ?
                                    <span className='text-red-600'>{errors?.email?.message}</span>
                                    :
                                    <span className="material-symbols-outlined text-green-500">check</span>)
                                :
                                (<span></span>)

                        }
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-600 text-sm font-medium mb-2">
                            Password
                        </label>
                        <div className='flex items-center'>
                            <input
                                type={passShow ? 'text' : 'password'}
                                {...register("password")}

                                className="w-full border p-2 me-2 rounded focus:outline-none focus:border-blue-500"
                            />
                            {
                                passShow ?
                                    <LuEyeOff
                                        size={24}
                                        cursor={"pointer"}
                                        onClick={() => setpassShow(passShow => !passShow)} />
                                    :
                                    <LuEye
                                        size={24}
                                        cursor={"pointer"}
                                        onClick={() => setpassShow(passShow => !passShow)}
                                    />
                            }
                        </div>
                        {
                            passwordw ?
                                (errors?.password?.message ?
                                    <span className='text-red-600'>{errors?.password?.message}</span>
                                    :
                                    <span className="material-symbols-outlined text-green-500">check</span>)
                                :
                                (<span></span>)
                        }
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-3 rounded focus:outline-none hover:bg-blue-600"
                    >
                        Sign Up
                    </button>
                    <br />
                    <br />
                    <br />
                    {errors.error && <span className='text-red-600'>{errors.error.message}</span>}
                </form>
            </div>

            <Loading on={isSubmitting} />

        </>
    )
}

export default SignUp