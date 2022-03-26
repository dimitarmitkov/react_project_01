import React, { useState, useEffect, useRef } from 'react';
import { Dropdown } from 'primereact/dropdown';
import './DropdownButton.css';

const DropdownButton = () => {

    const [lazyItems, setLazyItems] = useState([]);
    const [lazyLoading, setLazyLoading] = useState(false);
    const [selectedCity2, setSelectedCity2] = useState(null);

    let loadLazyTimeout = useRef(null);

    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];


    const valuesArray = [{name: '5'},{name: '10'}, {name: 'All'}];

    useEffect(() => {
        setLazyItems(Array.from({ length: 100000 }));
        setLazyLoading(false);
    },[]); // eslint-disable-line react-hooks/exhaustive-deps


    const onCityChange2 = (e: any) => {
        setSelectedCity2(e.value);
    }

    

    
    return (
        <div className="dropdown-demo" key = {'paginateDropDown'}>
                <Dropdown id ={'dropDownButton'} value={selectedCity2} options={valuesArray} onChange={onCityChange2} optionLabel="name" placeholder="Numbers per page" editable />
        </div>
    );
}

export default DropdownButton;
                 