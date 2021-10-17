import { useState } from 'react'
import { storage } from '../firebase';

const useImage = () => {

    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [url, setUrl] = useState('');
    const [progress,setProgress] = useState('');

    const fileChangeHandler = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setName(file.name);
    }

    const uploadFiles = (e) => {
        e.preventDefault();
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot => {
                const prog = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(prog);
            },
            error => {
                alert('photo upload failed!');
            },
            () => {
                storage
                    .ref('images')
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        setUrl(url);
                    })
            }
        )
    }

    const reset=()=>{
        setImage('');
        setUrl('');
        setProgress('');
        setName('');
    }

    return (
        {
            fileChangeHandler,
            uploadFiles,
            name,
            url,
            progress,
            reset
        }
    );
};

export default useImage