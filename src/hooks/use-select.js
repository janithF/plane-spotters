import { useContext, useState } from 'react';
import AppContext from '../store/app-context';

const useSelect=()=>{
    const appContext = useContext(AppContext)
    const [enteredValue,setEnteredValue] = useState('All');
    const valueChangeHandler=e=>{
        const name=e.target.name
        setEnteredValue(e.target.value);
        appContext.filterContent(e.target.value,name);
    }   

    return({
        value:enteredValue,
        valueChangeHandler
    })
}

export default useSelect;