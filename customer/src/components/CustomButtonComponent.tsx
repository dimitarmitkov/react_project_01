import React, { useState } from 'react';
import { Button } from 'primereact/button';
import '../assets/css/ButtonDemo.css';

export class ButtonDemo extends Component {

    const ButtonDemo = () => {

        const [loading1, setLoading1] = useState(false);
        const [loading2, setLoading2] = useState(false);
    
        const onLoadingClick1 = () => {
            setLoading1(true);
    
            setTimeout(() => {
                setLoading1(false);
            }, 2000);
        }
    
        const onLoadingClick2 = () => {
            setLoading2(true);
    
            setTimeout(() => {
                setLoading2(false);
            }, 2000);
        }

        return (
            <div className="button-demo">
                <div className="card">
                    <h5>Basic</h5>
                    <Button label="Submit" />
                    <Button label="Disabled" disabled />
                    <Button label="Link" className="p-button-link" />
                    </div>
            </div>
        )
    }
}

export default ButtonDemo;