import { Toast } from 'flowbite-react';
import { useContext } from 'react';
import { HiCheck } from 'react-icons/hi';
import toast from '../context/toast';

function MoveNote({des_fol}) {
    
    const { opentoast, setOpentoast } = useContext(toast);

    return (
        <Toast>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                <HiCheck className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">{<span className='text-[20px]'>{des_fol+" !"}</span>}</div>
            <Toast.Toggle onDismiss={()=>setOpentoast(false)} />
        </Toast>
    );
}

export default MoveNote;
