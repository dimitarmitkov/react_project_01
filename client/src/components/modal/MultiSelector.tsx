import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import ReactDOM from "react-dom";
import { default as ReactSelect } from "react-select";
import { components } from "react-select";
import './multiSelector.css';

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
    let taskIdGlobal = props.taskId ? props.taskId : props.id;

    const [users, setUsers] = useState<never[]>([]);
    const [optionSelected, setOptionSelected] = useState(null);
    const [allowedUsers, setAllowedUsers] = useState([]);

    const getAllowedUsers = (currentTaskId: number) => {

        let usersQuery = { idData: currentTaskId };
        axios.patch("http://localhost:62000/api/v1/usertasks", usersQuery)
            .then(result => {

                const currentData = result.data;

                if (currentData.length > 0) {
                    const allowedUsersList = () => (
                        currentData.map((name: any) => name.id)
                    );

                    setAllowedUsers(allowedUsersList);
                }

            })
            .catch(err => console.log(err));
    }

    const getUsers = () => {

        axios.get("http://localhost:62000/api/v1/users")
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

        const logData = (props: any) => {

            let resArray = props.map((e: any) => ({ userId: e.value, taskId: taskIdGlobal }));

            axios.put("http://localhost:62000/api/v1/usertasks",
                {
                    userIdArray: resArray,
                    taskId: taskIdGlobal
                }
            )
                .then(result => {
                    if (result.status === 200) {
                        const idArray = result.data.map((r: any) => r.userId);
                        const resultAllowedUsersArray = [...allowedUsers, ...idArray];

                        users.forEach((user: any) => {
                            if(idArray.includes(user.value)){
                                main['firstName']=user.label;
                                ws.send(JSON.stringify({main, action: 'added', allowedList: resultAllowedUsersArray }));
                            }
                        })

                        window.location.reload();
                    }
                })
                .catch(err => console.log(err));
        }

        return (
            <span
                className="d-inline-block"
                data-toggle="popover"
                data-trigger="focus"
                data-content="Please select account(s)"
            >
                <Container>
                    <Row>
                        <Col sm={10}>
                            <ReactSelect options={users} isMulti closeMenuOnSelect={false} hideSelectedOptions={false} components={{ Option }} onChange={handleChange} value={optionSelected} />
                        </Col>
                        <Col sm={2}>
                            <Button variant="danger" type="submit" onClick={() => logData(optionSelected)}>Submit</Button>
                        </Col>
                    </Row>
                </Container>

            </span>
        );
    } else {
        return null;
    }

}

export default MultiSelector;
