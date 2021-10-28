import React, { useContext } from 'react'
import '../styles/Header.scss'
import { VscDiffAdded } from 'react-icons/vsc'
import logo from '../assets/img/logo2x.png'
import ModalContext from '../store/modal-context'
import AppContext from '../store/app-context'
import { Link } from 'react-router-dom'

function Header() {

    const modalData = useContext(ModalContext);
    const { setIsEditing } = useContext(AppContext)

    return (
        <>
            <div className="header">
                <img src={logo} alt="logo" className="logo" />
                <Link to="/home/new-spotter">
                    <div className="app-btn-container" onClick={() => { modalData.openModal(); setIsEditing(false) }}>
                        <VscDiffAdded />
                        <button className="app-btn" >Submit Spotting</button>
                    </div>
                </Link>
            </div>
            <hr />
        </>
    )
}

export default Header
