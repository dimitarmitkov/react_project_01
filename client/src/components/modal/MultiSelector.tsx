import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import ReactDOM from "react-dom";
import { default as ReactSelect } from "react-select";
import { components } from "react-select";
import './multiSelector.css';





// const users = [
//     { value: "ocean1", label: "Ocean" },
//     { value: "blue", label: "Blue" },
//     { value: "purple", label: "Purple" },
//     { value: "red", label: "Red" },
//     { value: "orange", label: "Orange" },
//     { value: "yellow", label: "Yellow" },
//     { value: "green", label: "Green" },
//     { value: "forest", label: "Forest" },
//     { value: "slate", label: "Slate" },
//     { value: "silver", label: "Silver" }
// ];

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

    let taskIdGlobal = props.taskId ? props.taskId : props.id;

    const [users, setUsers] = useState<never[]>([]);

    const getUsers = () => {

        axios.get("http://localhost:62000/api/v1/users")
            .then(result => {

                setUsers(result.data.map((el: any) => ({ value: el.id, label: el.firstName + ' ' + el.lastName })));
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {

        getUsers();
    }, []);

    const [optionSelected, setOptionSelected] = useState(null);

    if (users.length > 0) {


        const handleChange = (selected: any) => {
            setOptionSelected(selected);
        };

        const logData = (props: any) => {

            let resArray = props.map((e: any)=>({userId: e.value, taskId: taskIdGlobal}));


            axios.put("http://localhost:62000/api/v1/usertasks",
            {
                userIdArray: resArray,
                taskId: taskIdGlobal
            }
            )
            .then(result=>{
                console.log(result);
                if(result.status===200){
                    window.location.reload();
                }
            })
            .catch(err=>console.log(err));
        }


        return (
            <span
                className="d-inline-block"
                data-toggle="popover"
                data-trigger="focus"
                data-content="Please selecet account(s)"
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
