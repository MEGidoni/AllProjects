import { Card, Button } from 'flowbite-react';
import { TiDelete } from "react-icons/ti";
import { MdBorderColor } from "react-icons/md";
import React from 'react'
import { useNavigate } from 'react-router-dom';

const CardFolder = ({ folderName, bgColor , deleteFolder , id , time }) => {

    console.log("entered card folder");

    const nav = useNavigate();


    return (
        <div className='min-w-[333px]'>

            <Card className="max-w-sm m-4" style={{ background: `${bgColor ? bgColor : "gray"}` }}>

                <div className='flex justify-between'>
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {folderName ? folderName : "NO NAME"}
                    </h5>
                    <TiDelete size={31} cursor={"pointer"} onClick={deleteFolder} />
                </div>
                <div className='flex justify-between'>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    {`${time.hour > 9 ? time.hour : '0' + time.hour}:${time.minutes > 9 ? time.minutes : '0' + time.minutes}:${time.seconds > 9 ? time.seconds : '0' + time.seconds} , ${time.dayOfMonth}/${time.month}/${time.year} `}
                </p>
                {/* <MdBorderColor className='pe-1' size={30} cursor={"pointer"} color='green'/> */}
                </div>
                <Button
                outline gradientDuoTone="purpleToBlue"
                onClick={ ()=>nav( "/notes" , {state:{folderId:id , nameOfFolder:folderName}} ) }
                >
                    Enter Folder
                    <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path
                            fillRule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </Button>
            </Card>
        </div>
    );
}

export default CardFolder