import React, { useContext, useEffect, useState } from 'react';
import useSelect from '../hooks/use-select';
import AppContext from '../store/app-context';
import '../styles/FilterContent.scss'

const FilterContent = () => {

    const appContext = useContext(AppContext);

    //make
    const {
        value: make,
        valueChangeHandler: makeChangeHandler
    } = useSelect();

    //model
    const {
        value: model,
        valueChangeHandler: modelChangeHandler
    } = useSelect();

    //registration
    const {
        value: registration,
        valueChangeHandler: registrationChangeHandler
    } = useSelect();


    return (
        <div>
            <h3>Latest photos</h3>
            <div className="filter-content">
                <h3>Filters</h3>
                <form>
                    <div className="row">
                        <div className="form-group col-sm">
                            <label htmlFor="make">Make</label>
                            <select className="form-control form-control-sm"
                                id="make"
                                value={make}
                                name="make"
                                onChange={makeChangeHandler}
                            >
                                {
                                    appContext.makes.map((make, index) => {
                                        return <option key={index}>{make}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group col-sm">
                            <label htmlFor="make">Model</label>
                            <select className="form-control form-control-sm"
                                id="model"
                                name="model"
                                value={model}
                                onChange={modelChangeHandler}
                            >
                                {
                                    appContext.models.map((model, index) => {
                                        return <option key={index}>{model}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group col-sm">
                            <label htmlFor="make">Registration</label>
                            <select className="form-control form-control-sm"
                                id="registration"
                                name="registration"
                                value={registration}
                                onChange={registrationChangeHandler}
                            >
                                {
                                    appContext.registrations.map((registration, index) => {
                                        return <option key={index}>{registration}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FilterContent;
