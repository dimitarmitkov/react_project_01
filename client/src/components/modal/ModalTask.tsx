import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, DropdownButton, Dropdown } from 'react-bootstrap';

function MyVerticallyCenteredModal(props: any) {

    const progressArray: string[] = ["initial", "selected", "progress", "review", "done"];
    const cities = [
        { label: 'New York', value: 'NY' },
        { label: 'Rome', value: 'RM' },
        { label: 'London', value: 'LDN' },
        { label: 'Istanbul', value: 'IST' },
        { label: 'Paris', value: 'PRS' }
    ];

    const [selectedCity1, setSelectedCity1] = useState<any>(null);
    const onCityChange = (e: { value: any }) => {
        setSelectedCity1(e.value);
    }

    let dropdownButtonsArray: any = [];

    progressArray.forEach(function (element: any, k: number) {
        dropdownButtonsArray.push(<Dropdown.Item as="button" key={'bbd' + k}>{element}</Dropdown.Item>);
    });

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.data.taskName}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>{props.data.taskProgress}</h4>
                <p>
                    {props.data.taskType}
                </p>



                <DropdownButton id="dropdown-item-button" title="Select status">
                    {dropdownButtonsArray}
                </DropdownButton>

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default function ModalApp(props: any[]) {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <>
            <Button variant="danger" onClick={() => setModalShow(true)}>
                Edit Task
            </Button>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                data={props}
            />
        </>
    );
}
    // }
// }

// export default ModalTasks;

//   render(<App />);