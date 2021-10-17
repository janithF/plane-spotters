import React, { useContext, useEffect } from 'react';
import '../styles/List.scss';
import Item from './Item';
import AppContext from '../store/app-context';


const List = () => {

    const { appData, getData, isLoading} = useContext(AppContext);

    useEffect(() => {
        getData()
    }, [getData])

    return (
        <div className="container-fluid">
            <div className="row item-container">
                {!isLoading ?
                    appData.length !== 0 ?
                        appData.map(listItem => {
                            const { id, model, make, icon, date, time, location, itemImage } = listItem;
                            return (
                                <div className="" key={id}>
                                    <Item  {...listItem} />
                                </div>
                            )
                        })
                        : <h2 className='no-items'>No Items to Display</h2>
                    : <h2 className='no-items'>Loading</h2>}
            </div>
        </div>
    );
};

export default List;