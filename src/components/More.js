import React, { useContext } from 'react';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import AppContext from '../store/app-context';
import ModalContext from '../store/modal-context';
import '../styles/More.scss';
const More = ({ closeMoreMenu, id }) => {

    const appContext = useContext(AppContext);
    const modalContext = useContext(ModalContext);

    const removeSpotter = () => {
        appContext.removeContent(id);
        closeMoreMenu();
    }

    return (
        <div className="more show">
            <div className="more-content" >
                <div className="menu-header">
                    <FaTimes className="close-btn" onClick={closeMoreMenu} />
                </div>
                <Link to={`/home/${id}/edit`} >
                    <p className="menu-item" onClick={() => { appContext.editItem(id); modalContext.openModal(); closeMoreMenu() }}>
                        <AiOutlineEdit />Edit
                    </p>
                </Link>
                <p className="menu-item" style={{ color: 'red' }}
                    onClick={removeSpotter}>
                    <AiOutlineDelete />
                    Remove
                </p>
            </div>
        </div>
    );
};

export default More;