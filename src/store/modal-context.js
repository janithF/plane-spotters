import React, { useState } from 'react'

const ModalContext = React.createContext({
    isModalOpen:'',
    openModal:()=>{},
    closeModal:()=>{}
});

export const ModalContextProvider=(props)=>{

    const [isModalOpen,setIsModalOpen] = useState(false);

    const openModal=()=>{
        setIsModalOpen(true);
    }

    const closeModal=()=>{
        setIsModalOpen(false);
    }

    return <ModalContext.Provider value={{
        isModalOpen,
        openModal,
        closeModal
    }}>
        {props.children}
    </ModalContext.Provider>
} 
export default ModalContext;