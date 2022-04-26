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
        } else {
            toast.configure();
            toast('No users attached to this task.');
        }
    }

    const getUsers = () => {

        const urlGet = "http://localhost:62000/api/v1/users";

        axios.get(urlGet)
            .then(result => {

                setUsers(result.data.map((el: any) => ({ value: el.id, label: el.firstName + ' ' + el.lastName })));
            })
            .catch(err => console.log(err));
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

            const resArray = props.map((e: any) => ({ userId: e.value, taskId: taskIdGlobal }));
            const urlLogData = "http://localhost:62000/api/v1/usertasks";
            const queryLogData = { userIdArray: resArray, taskId: taskIdGlobal }


            const result = await axios.put(urlLogData, queryLogData);
            if (result.status === 200) {

                const idArray = result.data.map((r: any) => r.userId);
                const resultAllowedUsersArray = [...allowedUsers, ...idArray];

                users.forEach((user: any) => {
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
                {/* <Container> */}

                    <Row> 
                        <Col sm={9} className="mt-3">
                            <ReactSelect options={users} isMulti closeMenuOnSelect={false} hideSelectedOptions={false} components={{ Option }} onChange={handleChange} value={optionSelected} />
                        </Col>

                        <Col sm={3} className="mt-3 button-danger-multi">
                            <Button variant="secondary" type="submit" onClick={() => logData(optionSelected)}>Submit user</Button>
                        </Col>
                    </Row>
                {/* </Container> */}
            </span>
        );
    } else {
        return null;
    }
}

export default MultiSelector;
