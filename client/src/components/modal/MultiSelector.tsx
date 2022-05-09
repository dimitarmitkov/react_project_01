import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { default as ReactSelect } from 'react-select';
import { components } from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import { valuesLinks } from '../../enumerators';
import configData from '../../config.json';
import './multiSelector.css';
import 'react-toastify/dist/ReactToastify.css';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const ws = new WebSocket(configData.WEBSOCKET_URL);

interface MultiSelectorProps {
    createdAt: string;
    taskName: string;
    taskType: string;
    taskId: number;
    id: number;
};

interface IdArrayResultProps {
    userId: number;
};

interface ElementResultDataProps {
    id: number;
    firstName: string;
    lastName: string;
};

interface LogDataProps {
    value: number;
};

interface UserOfUsersProps {
    value: number;
    label: string;
};

interface UserOfAllowedUsersListProps {
    id: number;
};

const Option = (props: any) => {
    return (
        <div>
            <components.Option {...props}>
                <input
                    type='checkbox'
                    checked={props.isSelected}
                    onChange={() => null}
                />{' '}
                <label>{props.label}</label>
            </components.Option>
        </div>
    );
};

const MultiSelector = (props: MultiSelectorProps) => {

    let main = {
        createdAt: props.createdAt,
        taskName: props.taskName,
        taskType: props.taskType,
        firstName: ''
    };
    const taskIdGlobal = props.taskId ? props.taskId : props.id;

    const [users, setUsers] = useState<never[]>([]);
    const [optionSelected, setOptionSelected] = useState<[]>([]);
    const [allowedUsers, setAllowedUsers] = useState([]);

    const getAllowedUsers = async (currentTaskId: number) => {

        const usersUrl = SERVER_URL + valuesLinks.UserTasks;
        const usersQuery = { idData: currentTaskId };

        const result = await axios.patch(usersUrl, usersQuery)
        const currentData = result.data;

        if (currentData.length > 0) {

            setAllowedUsers(currentData.map((user: UserOfAllowedUsersListProps) => user.id));
        } else {
            toast.configure();
            toast('No users attached to this task.');
        }
    }

    const getUsers = async () => {

        const urlGet = SERVER_URL + valuesLinks.Users;

        const result = await axios.get(urlGet);

        setUsers(result.data.map((el: ElementResultDataProps) => ({ value: el.id, label: el.firstName + ' ' + el.lastName })));
    }

    useEffect(() => {

        getAllowedUsers(taskIdGlobal);
        getUsers();
    }, [taskIdGlobal]);

    if (users.length > 0) {

        const handleChange = (selected: any) => {
            setOptionSelected(selected);
        };

        const logData = async (props: [] | null) => {

            const resArray = props ? props.map((e: LogDataProps) => ({ userId: e.value, taskId: taskIdGlobal })) : [];
            const urlLogData = SERVER_URL + valuesLinks.UserTasks;
            const queryLogData = { userIdArray: resArray, taskId: taskIdGlobal }

            const result = await axios.put(urlLogData, queryLogData);
            if (result.status === 200) {

                const idArray = result.data.map((r: IdArrayResultProps) => r.userId);
                const resultAllowedUsersArray = [...allowedUsers, ...idArray];

                users.forEach((user: UserOfUsersProps) => {
                    if (idArray.includes(user.value)) {
                        main['firstName'] = user.label;
                        ws.send(JSON.stringify({ main, action: 'added', allowedList: resultAllowedUsersArray }));
                    }
                })

                window.location.reload();
            } else {
                toast.configure();
                toast('Something went wrong, you are not allowed.');
            }
        }

        return (
            <span
                className="d-inline-block"
                data-toggle="popover"
                data-trigger="focus"
                data-content="Please select account(s)"
            >
                <Row>
                    <Col sm={9} className="mt-3">
                        {/* <ReactSelect options={users} isMulti closeMenuOnSelect={false} hideSelectedOptions={false} components={{ Option }} onChange={(e: SelectedProps[])=>{handleChange(e)}} value={optionSelected} /> */}
                        <ReactSelect options={users} isMulti closeMenuOnSelect={false} hideSelectedOptions={false} components={{ Option }} onChange={handleChange} value={optionSelected} />
                    </Col>

                    <Col sm="auto" className="mt-3 button-danger-multi">
                        <Button variant="secondary" type="submit" onClick={() => logData(optionSelected)}>Submit user</Button>
                    </Col>
                </Row>
            </span>
        );
    } else {
        return null;
    }
}

export default MultiSelector;
