import React, { useState, useEffect, useRef } from 'react';
import { Dropdown } from 'primereact/dropdown';
import './DropdownButton.css';
import axios from 'axios';

const DropdownButton = () => {

    const [selectValues, setSelectValues] = useState(null);

    // const valuesArray = [{name: '5'},{name: '10'}, {name: 'All'}];
    const valuesArray2 = [5, 10, 100];

    const onCityChange2 = (e: any) => {
        setSelectValues(e.value);
    }
    
    return (
        <div className="dropdown-demo" key = {'paginateDropDown'}>
                {/* <Dropdown id ={'dropDownButton'} value={selectedCity2} options={valuesArray} onChange={onCityChange2} optionLabel="name" placeholder="Numbers per page" editable /> */}
                <Dropdown id ={'dropDownButton'} value={selectValues} options={valuesArray2} onChange={onCityChange2} placeholder="Numbers per page" editable />
        </div>
    );
}

export default DropdownButton;
