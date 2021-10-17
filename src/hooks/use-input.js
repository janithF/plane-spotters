import { useContext, useEffect, useState } from 'react';
import AppContext from '../store/app-context';

const useInput = (validateValue,isEditing,inputName) => {

    const { editingObject} = useContext(AppContext);

    const [enteredvalue, setEnteredValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);
    
    useEffect(() => {
        if (isEditing) {
            if(inputName === 'image'){
                return
            }else
            setEnteredValue(editingObject[inputName])
        }
    }, [editingObject, inputName, isEditing])

    const valueIsValid = validateValue(enteredvalue);
    const hasError = !valueIsValid && isTouched;


    const valueChangeHandler = e => {
        setEnteredValue(e.target.value);
    }

    const inputBlurHandler = e => {
        setIsTouched(true)
    }

    const reset = () => {
        setEnteredValue('');
        setIsTouched(false)
    }


    return (
        {
            value: enteredvalue,
            isValid: valueIsValid,
            hasError,
            valueChangeHandler,
            inputBlurHandler,
            reset
        }
    );
};

export default useInput;