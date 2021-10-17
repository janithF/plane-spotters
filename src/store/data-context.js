import React from 'react'

const DataContext = React.createContext({

})
export default DataContext;

export const DataContextProvider=(props)=>{

    const getData=()=>{

    }

    const addData=()=>{
        
    }

    return <DataContext.Provider value={{}}>
        {props.children}
    </DataContext.Provider>
}