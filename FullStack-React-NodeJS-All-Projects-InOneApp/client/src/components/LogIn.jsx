import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { LuEye, LuEyeOff } from "react-icons/lu";
import { LOGIN_URL } from '../routes/URLS';
import { useNavigate , useLocation } from 'react-router-dom';
import { getAxiosStatus } from '../utils/utils';
import Loading from '../shared/Loading';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { loginValidation } from '../../schemas/usersScema';
import UserContext from '../context/userContext';
const LogIn = () => {
    const { setUser } = useContext(UserContext)
    const [loading, setLoading] = useState(false);
    const [passShow, setpassShow] = useState(false);
    const { register, handleSubmit, setError, watch, formState: { errors } } = useForm(
        {
            resolver: zodResolver(loginValidation),
            mode: "onChange"
        });

    const [emailw] = watch(["email"]);

    const nav = useNavigate();

    const login = async (data) => {
        setLoading(true);
        try {
            const resp = await axios.post(LOGIN_URL, data);
            setUser(resp.data.user)
            setLoading(false);
            nav("/products",{state:{userId:"111"}})
        }
        catch (err) {
            setLoading(false);
            if (getAxiosStatus(err) == 404 || getAxiosStatus(err) == 401) {
                setError("error", { message: "username or password incorrect!" });
            }
            else {
                console.log(err);
                setError("error", { message: "ERROR!!!" })
            }
        }
    }
    return (
        <>
            <div className="max-w-md mx-auto mt-8 p-8 bg-white rounded shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Log In</h2>
                <form onSubmit={handleSubmit(login)}>
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
                            {/* {
                        passwordw?
                    (errors?.password?.message?
                    <span className='text-red-600'>{errors?.password?.message}</span>
                    :
                    <span className="material-symbols-outlined text-green-500">check</span>)
                    :
                    (<span></span>)
                    } */}
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
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-3 rounded focus:outline-none hover:bg-blue-600"
                    >
                        Log In
                    </button>
                    <br />
                    <br />
                    <br />
                    {errors.error && <span className='text-red-600'>{errors.error.message}</span>}
                </form>
            </div>
            <Loading on={loading} />
        </>
    )
}

export default LogIn