import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../styles/FormModal.scss';
import { FaTimes } from 'react-icons/fa';
import { FiHelpCircle } from 'react-icons/fi';
import { ImLocation } from 'react-icons/im';
import ModalContext from '../store/modal-context';
import useInput from '../hooks/use-input';
import AppContext from '../store/app-context';
import useImage from '../hooks/use-image';
import { createPortal } from 'react-dom';

const FormModal = () => {

    //----[getting date and time]----
    const currentDate = new Date();

    //date
    const currentMonth = currentDate.getMonth() + 1;
    const monthDisplay = currentMonth >= 10 ? currentMonth : ('0' + currentMonth);
    const today = (currentDate.getFullYear() + '-' + monthDisplay + '-' + currentDate.getDate()).toString();
    //time
    const currentTime = (currentDate.getHours() + ':' + currentDate.getMinutes()).toString();

    //----[context for modal]-----
    const modalData = useContext(ModalContext);
    const appContext = useContext(AppContext);

    const isEditing = appContext.isEditing;
    const editID = appContext.editID;
    const editingItem = appContext.editingObject;

    //regEx for validity of registration
    const reg = /^[\w]{1,2}[\\-][\w]{1,5}$/;
    const regErrorMsg = `Two parts separated by a hyphen.
Prefix should be either one or two characters.
Suffix should be between one and five characters`

    // ----------[Input Hooks]----------
    //registration
    const {
        value: registration,
        hasError: registrationHasError,
        isValid: isRegValid,
        valueChangeHandler: registrationChangeHandler,
        inputBlurHandler: registrationBlurHandler,
        reset: resetReg
    } = useInput(value => { return (value.trim() !== '' && reg.test(value)) }, isEditing, 'registration');

    //make
    const {
        value: make,
        hasError: makeHasError,
        isValid: isMakeValid,
        valueChangeHandler: makeChangeHandler,
        inputBlurHandler: makeBlurHandler,
        reset: resetMake
    } = useInput(value => value.trim() !== '' && value.length < 128, isEditing, 'make');

    //model
    const {
        value: model,
        hasError: modelHasError,
        isValid: isModelValid,
        valueChangeHandler: modelChangeHandler,
        inputBlurHandler: modelBlurHandler,
        reset: resetModel
    } = useInput(value => { return (value.trim() !== '' && value.length < 128) }, isEditing, 'model');

    //date
    const {
        value: date,
        hasError: dateHasError,
        isValid: isDateValid,
        valueChangeHandler: dateChangeHandler,
        inputBlurHandler: dateBlurHandler,
        reset: resetDate
    } = useInput(value => { return value !== '' && value <= today }, isEditing, 'date');

    //time
    const {
        value: time,
        hasError: timeHasError,
        isValid: isTimeValid,
        valueChangeHandler: timeChangeHandler,
        inputBlurHandler: timeBlurHandler,
        reset: resetTime
    } = useInput(value => {
        if (date === today) {
            return value !== '' && value <= currentTime;
        } else return value !== ''
    }, isEditing, 'time');


    //location
    const {
        value: location,
        hasError: locationHasError,
        isValid: isLocationValid,
        valueChangeHandler: locationChangeHandler,
        inputBlurHandler: locationBlurHandler,
        reset: resetLocation
    } = useInput(value => { return (value.trim() !== '' && value.length < 255) }, isEditing, 'location');

    //image
    const {
        fileChangeHandler: imageChangeHandler,
        uploadFiles,
        name: imageName,
        url: imagePath,
        progress,
        reset: resetImage
    } = useImage();

    // ----------[Functions]----------
    //check the validity of the whole form
    let isFormValid = false;

    if (isRegValid && isMakeValid && isModelValid && isDateValid && isTimeValid && isLocationValid) {
        isFormValid = true
    }

    //function to reset the values of the form
    const resetForm = () => {
        resetReg(); resetMake(); resetModel(); resetDate(); resetTime(); resetLocation(); resetImage();
    }

    //function when clsoing form
    const closeForm = () => {
        modalData.closeModal();
        appContext.clearEdit();
        resetForm();
    }

    //Submitting the form
    const submitHandler = async (e) => {
        e.preventDefault();
        if (!isFormValid) {
            return
        }
        let spotting = {
        };
        //editing an item
        if (isEditing) {
            spotting = {
                id: editID,
                itemImage: !imagePath ? editingItem.itemImage : imagePath,
                registration: registration.toUpperCase(),
                make,
                model,
                date,
                time,
                location
            }
            appContext.editData(editID, spotting);
            appContext.clearEdit();
            modalData.closeModal();
        }
        //submitting a new item
        else {
            spotting = {
                id: uuidv4(),
                itemImage: imagePath,
                registration: registration.toUpperCase(),
                make,
                model,
                date,
                time,
                location
            }
            appContext.addData(spotting);
        }
        resetForm();
    }


    //--------------------------------------[RETURN]---------------------------------------------
    return createPortal(
        <>
            {modalData.isModalOpen && <div className="overlay"></div>}
            <div className={`${modalData.isModalOpen ? 'modal show' : 'modal'}`}>
                <div className="app-modal-content">
                    <header>
                        <h2>Add new Spotting</h2>
                        <FaTimes onClick={closeForm} className="close-btn" />
                    </header>
                    <hr />
                    <form action="" id="newSpotting" onSubmit={submitHandler}>
                        {/* row 01 */}
                        <div className="row">
                            <div className="form-group col-sm-6">
                                <label htmlFor="registration">Registration</label>
                                <div className="row">
                                    <div className="col-10">
                                        <input type='text'
                                            className={`form-control form-control-sm ${registrationHasError ? 'invalid' : null}`}
                                            id='registration'
                                            name='registration'
                                            placeholder='G-BNLZ'
                                            onChange={registrationChangeHandler}
                                            value={registration}
                                            onBlur={registrationBlurHandler}
                                        />
                                        {registrationHasError && <span className="error">invalid! hover ? for help</span>}

                                    </div>
                                    <div className="col-2">
                                        <FiHelpCircle className="help" data-toggle="tooltip" data-placement="bottom" title={regErrorMsg} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* row 02 */}
                        <div className="row">
                            <div className="form-group col-6">
                                <label htmlFor="make">Make</label>
                                <input type='text'
                                    className={`form-control form-control-sm ${makeHasError ? 'invalid' : null}`}
                                    id='make'
                                    name='make'
                                    placeholder='Boeing'
                                    onChange={makeChangeHandler}
                                    onBlur={makeBlurHandler}
                                    value={make}
                                />
                                {makeHasError && <span className="error">minimum characters: 1 and maximum characters:128</span>}
                            </div>
                            <div className="form-group col-6">
                                <label htmlFor="model">Model</label>
                                <input type='text'
                                    className={`form-control form-control-sm ${modelHasError ? 'invalid' : null}`}
                                    id='model'
                                    name='model'
                                    placeholder='700-747'
                                    onChange={modelChangeHandler}
                                    onBlur={modelBlurHandler}
                                    value={model}
                                />
                                {modelHasError && <span className="error">minimum characters: 1 and maximum characters:128</span>}
                            </div>
                        </div>
                        {/* row 03 */}
                        <div className="row">
                            <div className="form-group col-6">
                                <label htmlFor="date">Date</label>
                                <input type="date"
                                    className={`form-control form-control-sm ${dateHasError ? 'invalid' : null}`}
                                    id="date"
                                    name="date"
                                    onChange={dateChangeHandler}
                                    onBlur={dateBlurHandler}
                                    value={date}
                                />
                                {dateHasError && <span className="error">Date should be today or past</span>}
                            </div>
                            <div className="form-group col-6">
                                <label htmlFor="time">time</label>
                                <input type="time"
                                    className={`form-control form-control-sm ${timeHasError ? 'invalid' : null}`}
                                    id="time"
                                    name="time"
                                    onChange={timeChangeHandler}
                                    onBlur={timeBlurHandler}
                                    value={time}
                                />
                                {timeHasError && <span className="error">Time should be now or past</span>}
                            </div>
                        </div>
                        {/* row 04 */}
                        <div className="row">
                            <div className="form-group col-sm-8">
                                <label htmlFor="location">Location</label>
                                <div className="row">
                                    <div className="col-10">
                                        <input type="text"
                                            className={`form-control form-control-sm ${locationHasError ? 'invalid' : null}`}
                                            id="location"
                                            name="location"
                                            placeholder='London Gatwick (LGW)'
                                            onChange={locationChangeHandler}
                                            onBlur={locationBlurHandler}
                                            value={location}
                                        />
                                        {locationHasError && <span className="error">invalid</span>}
                                    </div>
                                    <div className="location col-2">
                                        <ImLocation className="location-icon" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* row 05 */}
                        <div className="row">
                            <div className="form-group col-sm-12">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="custom-file">
                                            <input type="file"
                                                className="custom-file-input"
                                                id="customFile"
                                                name="image"
                                                onChange={imageChangeHandler}
                                            />
                                            <label className="custom-file-label" htmlFor="customFile">Choose Image</label>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <p>{imageName}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-2">
                                        <button onClick={(e) => uploadFiles(e)} className="btn btn-sm btn-secondary">Upload</button>
                                    </div>
                                    <div className="col-sm-4">
                                        <p>{progress}% uploaded</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <button type="submit"
                            className="btn submit-btn"
                            value="submit"
                            disabled={!isFormValid}>{appContext.isEditing ? "Edit" : "Submit"}</button>
                    </form>
                </div>
            </div>
        </>, document.getElementById('modal-root')
    );
};

export default FormModal;
