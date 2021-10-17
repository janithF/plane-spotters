import React, { useContext } from 'react';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { FaTimes } from 'react-icons/fa'
import AppContext from '../store/app-context';
import ModalContext from '../store/modal-context';
import '../styles/More.scss';
const More = ({ closeMoreMenu, id }) => {

    const appContext = useContext(AppContext);
    const modalContext = useContext(ModalContext);

    return (
        <div className="more show">
            <div className="more-content" >
                <div className="menu-header">
                    <FaTimes className="close-btn" onClick={closeMoreMenu} />
                </div>
                <p className="menu-item" onClick={() => { appContext.editItem(id); modalContext.openModal(); closeMoreMenu() }}><AiOutlineEdit />Edit</p>
                <p className="menu-item" style={{ color: 'red' }}
                    onClick={() => { appContext.removeContent(id); closeMoreMenu() }}>
                    <AiOutlineDelete />
                    Remove
                </p>
            </div>
        </div>
    );
};

export default More;