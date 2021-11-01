import axios from 'axios'
import React, { useCallback, useState } from 'react'


const AppContext = React.createContext({
    appData: '',
    makes: [],
    models: [],
    isEditing: false,
    registrations: [],
    editingObject: {},
    editID: '',
    url: '',
    isLoading: false,
    error: '',
    filterContent: () => { },
    removeContent: () => { },
    setAppData: () => { },
    setIsEditing: () => { },
    editItem: () => { },
    clearEdit: () => { },
    getData: () => { },
    addData: () => { },
    editData:()=>{},
})

//----------------------------------[PROVIDER]-------------------------------------------------------
export const AppContextProvider = (props) => {

    const url = 'https://planespotters-352ac-default-rtdb.firebaseio.com/spotters.json';
    const itemUrl = 'https://planespotters-352ac-default-rtdb.firebaseio.com/spotters/';

    //state
    const [allData,setAllData]=useState([]);
    const [appData, setAppData] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editID, setEditID] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('')
    const [editingObject, setEditingObject] = useState({
        id: '',
        itemImage:'',
        registration: '',
        make: '',
        model: '',
        date: '',
        time: '',
        location: ''
    })

    //getting the uique categories
    const makes = ["All", ...new Set(allData.map(item => item.make))];
    const models = ["All", ...new Set(allData.map(item => item.model))];
    const registrations = ["All", ...new Set(allData.map(item => item.registration))];



    //function to get data from databse
    const getData = useCallback(async () => {

        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.get(url);
            const data = await response.data;
            const itemList = [];
            for (const key in data) {
                const { id,itemImage, model, make, registration, date, time, location } = data[key];
                itemList.push({
                    id, model, make, registration, date, time, location,itemImage
                })
                setAppData(itemList);
                setAllData(itemList);
            }
        }
        catch (error) {
            setError('something wrong');
        }
        setIsLoading(false)
    }, [])

    //function to filter content
    const filterContent = (value, name) => {
        if (value === "All") {
            getData();
            return
        }
        let newValues = allData.filter(item => item[name] === value)
        setAppData(newValues)
    }

    //function to add an item to the database
    const addData = async (spotter) => {
        try {
            await axios.put(itemUrl + spotter.id + '.json', spotter);
            alert('Added an Item')
            // console.log(itemUrl+spotter.id);

        } catch (error) {
            alert('something went wrong');
        }
        getData();
    }

    //function to remove content
    const removeContent = async (id) => {
        try {
            await axios.delete(itemUrl + id + '.json');
            alert('deleted')
        } catch (error) {
            alert('something went wrong')
        }
        getData();
    }

    //function to edit data
    const editData = async (id, spotter) => {
        try {
            await axios.put(itemUrl + id + '.json', spotter);
            alert('Updated the Item')
        } catch (error) {
            alert('something went wrong')
        }
        getData();
    }

    //function to trigger edit
    const editItem = (id) => {
        const editingItem = allData.find(item => item.id === id);
        setIsEditing(true);
        setEditID(id);
        setEditingObject(editingItem);
    }

    const clearEdit = () => {
        setIsEditing(false);
        setEditID('');
        setEditingObject('')
    }


    return (
        <AppContext.Provider value={{
            appData,
            makes,
            registrations,
            models,
            filterContent,
            removeContent,
            setAppData,
            isEditing,
            editID,
            editItem,
            setIsEditing,
            editingObject,
            clearEdit,
            url,
            getData,
            addData,
            isLoading,
            error,
            editData,
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContext;