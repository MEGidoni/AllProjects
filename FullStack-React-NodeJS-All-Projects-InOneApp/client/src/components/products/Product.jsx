import React, { useEffect, useState } from 'react'
import styled, { keyframes, css } from 'styled-components';
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { FiCheckSquare } from "react-icons/fi";
import EditProduct from './EditProduct';
import Pic from '../../roey/Pic';
import BoughtDiv from '../../roey/BoughtDiv';


// ==================================👇style👇============================================================


const colorChange = keyframes`
0% { color: blue; }
25% { color: red; }
50% { color: green; }
75% { color: pink; }
100% { color: blue; }
`;

const AnimatedText = styled.p.attrs(props => ({
    animate: props.animate ? 'true' : 'false'
}))`
    text-align: center;
    ${({ animate }) => animate === 'true' && css`
      animation: ${colorChange} 5s infinite;
    `}
    color: ${({ color }) => color};
  `;


// ==================================👆style👆============================================================

const Product = ({ product, onDeleteClick, onUpdateTaken, updateProduct }) => {
    const [isBought, setIsBought] = useState(product.isBought || false);
    const [isEditMode, setIsEditMode] = useState(false);
    const { amount, product_name, is_taken, id } = product;

    // ==================================👇style👇============================================================

    const [animate, setAnimate] = useState(true);
    const [color, setColor] = useState('red');

    const toggleAnimation = () => {
        setAnimate(prevAnimate => !prevAnimate);
        setColor(animate ? 'red' : 'blue');
    }

    // ==================================👆style👆============================================================

    return (
        <div className=" w-96 border-4 border-b-8 my-3 border-lime-300 bg-white p-4 rounded-xl shadow-md flex justify-between text-center items-center">
            {
                isEditMode ?
                    <EditProduct defaultValues={{ amount, product_name }} closeEditMode={() => setIsEditMode(false)} updateProduct={updateProduct} />
                    :
                    <>
                        <AnimatedText animate={!is_taken} color={color} className={`text-center font-bold font-serif text-3xl ${is_taken && "line-through"}`}>{amount}: <br /> {product_name}</AnimatedText>
                        {!is_taken ?
                            (!is_taken && <Pic product_name={product_name} />)
                            :
                            (
                                <BoughtDiv />
                            )
                        }
                        <div className='flex items-center gap-1.5'>
                            <MdDelete color='red' cursor={"pointer"} size={28} onClick={onDeleteClick} />
                            <FaRegEdit color='green' onClick={() => setIsEditMode(true)} cursor={"pointer"} size={24} />
                            <FiCheckSquare
                                style={{ background: `${!is_taken ? "white" : "blue"}`, color: `${!is_taken ? "blue" : "white"}` }}
                                size={24}
                                className="cursor-pointer mt-0.5"
                                onClick={() => {
                                    onUpdateTaken();
                                    setIsBought(isBought => !isBought);
                                    toggleAnimation();
                                }}
                            />
                        </div>
                    </>
            }
        </div>
    );
}

export default Product