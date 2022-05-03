import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { default as ReactSelect } from "react-select";
import { components } from "react-select";
import './multiSelector.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ws = new WebSocket('ws://127.0.0.1:8000/ws');

const Option = (props: any) => {
    return (
        <div>
            <components.Option {...props}>
                <input
                    type="checkbox"
                    checked={props.isSelected}
                    onChange={() => null}
                />{" "}
                <label>{props.label}</label>
            </components.Option>
        </div>
    );
};

const MultiSelector = (props: any) => {

    let main = {
        createdAt: props.createdAt,
        taskName: props.taskName,
        taskType: props.taskType,
        firstName: ''
    };
    const taskIdGlobal = props.taskId ? props.taskId : props.id;

    const [users, setUsers] = useState<never[]>([]);
    const [optionSelected, setOptionSelected] = useState(null);
    const [allowedUsers, setAllowedUsers] = useState([]);

    const getAllowedUsers = async (currentTaskId: number) => {

        const usersUrl = "http://localhost:62000/api/v1/usertasks";
        const usersQuery = { idData: currentTaskId };

        const result = await axios.patch(usersUrl, usersQuery)
        const currentData = result.data;

        if (currentData.length > 0) {
            const allowedUsersList = () => (
                currentData.map((name: any) => name.id)
            );

            setAllowedUsers(allowedUsersList);
        } 
    }

    const getUsers = async () => {

        const urlGet = "http://localhost:62000/api/v1/users";

        const result = await axios.get(urlGet);

        setUsers(result.data.map((el: any) => ({ value: el.id, label: el.firstName + ' ' + el.lastName })));
    }

    useEffect(() => {

        getAllowedUsers(taskIdGlobal);
        getUsers();
    }, [taskIdGlobal]);

    if (users.length > 0) {

        const handleChange = (selected: any) => {
            setOptionSelected(selected);
        };

        const logData = async (props: any) => {

            let resArray = [];
            
            try {
                resArray = props.map((e: any) => ({ userId: e.value, taskId: taskIdGlobal }));
            } catch (error) {
                console.log('some error');
            }
            
            const urlLogData = "http://localhost:62000/api/v1/usertasks";
            const queryLogData = { userIdArray: resArray, taskId: taskIdGlobal };

            const result = await axios.put(urlLogData, queryLogData);
            if (result.status === 200) {

                const idArray = result.data.map((r: any) => r.userId);
                const resultAllowedUsersArray = [...allowedUsers, ...idArray];

                try {
                    users.forEach((user: any) => {
                        if (idArray.includes(user.value)) {
                            main['firstName'] = user.label;
                            ws.send(JSON.stringify({ main, action: 'added', allowedList: resultAllowedUsersArray }));
                        }
                    });
                } catch (error) {
                    console.log('error');
                }
                
            } else {
                toast.configure();
                toast('Something went wrong, you are not allowed.');
            }
        }
        const multiSelectorComponent = <span
            className="d-inline-block"
            data-toggle="popover"
            data-trigger="focus"
            data-content="Please select account(s)"
        >
            <Row>
                <Col sm={9} className="mt-3">
                    <ReactSelect options={users} isMulti closeMenuOnSelect={false} hideSelectedOptions={false} components={{ Option }} onChange={handleChange} value={optionSelected} />
                </Col>

                <Col sm="auto" className="mt-3 button-danger-multi">
                    <Button id="multi-user-submit-button" variant="secondary" type="submit" onClick={() => logData(optionSelected)}>Submit user</Button>
                </Col>
            </Row>
        </span>
        return (multiSelectorComponent);
    } else {
        return null;
    }
}

export default MultiSelector;
