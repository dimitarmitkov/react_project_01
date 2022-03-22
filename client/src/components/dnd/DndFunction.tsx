import React, { useState } from 'react';
import '../App.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TasksCard from '../TasksCard';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'primereact/button';
import { Container, Row, Col, Card } from 'react-bootstrap';
// dnd
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from 'uuid';
import capitalizeFirstLetter from '../functions/capitalizeFirstLetter';


class ShowTasksList extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            tasks: []
        };
    }

    componentDidMount() {
        axios
            .get('http://localhost:62000/api/v1/tasks')
            .then(response => {
                this.setState({
                    tasks: response.data
                })
            })
            .catch(err => {
                console.log('Error from ShowTasksList');
            })
    };



    render() {
        const tasks = this.state.tasks

        // state array declaration
        let progressArray: string[] = ["initial", "selected", "progress", "review", "done"];

        // this function is responsible to loop through progress array and create task cards 
        function tasksFunction(value: string) {
            return tasks.filter(function (obj: any) {
                return obj.taskProgress === value;
            }).map((task: any, k: number) => {
                const [taskColumns, setTaskColumns] = useState(progressArray);
                return <DragDropContext onDragEnd={result => onDragEnd(result, taskColumns, setTaskColumns)}>
                    <TasksCard task={task} key={k} />
                </DragDropContext>
            }
            );
        }

        // create array of elements 
        let elementArray: any = [];

        // this statement returns text if no task and array of elements (progressArray) if task have legit value
        if (!tasks) {
            return "there is no task record!";
        } else {

            progressArray.forEach(function (element: any, elKey: number) {

                elementArray.push(


                    <Col sm={2} className="padding-0" key={element + elKey + 1}>

                        <Droppable droppableId={element + elKey + 10} key={element + elKey + 20}>
                            {(provided, snapshot) => {
                                return (
                                    <Draggable
                                        key={element + elKey + 20}
                                        draggableId={element + elKey + 10}
                                        index={element}
                                    >
                                        {(provided, snapshot) => {
                                            return (
                                                <Card
                                                    bg={''}
                                                    key={element + elKey + 2}
                                                    text={'dark'}
                                                    style={{ height: '100%' }}
                                                    className="padding-0"
                                                >
                                                    <Card.Header key={element + elKey + 3}>{capitalizeFirstLetter(element)}</Card.Header>
                                                    <Card.Body key={element + elKey + 4}>
                                                        {tasksFunction(element)}
                                                    </Card.Body>
                                                </Card>
                                            )
                                        }}
                                    </Draggable>
                                );
                            }}
                        </Droppable>
                    </Col>
                );
            });
        }

        const onDragEnd = (result: any, taskColumns: any, setTaskColumns: any) => {
            if (!result.destination) return;
            const { source, destination } = result;

            if (source.droppableId !== destination.droppableId) {
                const sourceColumn = taskColumns[source.droppableId];
                const destColumn = taskColumns[destination.droppableId];
                const sourceItems = [...sourceColumn.items];
                const destItems = [...destColumn.items];
                const [removed] = sourceItems.splice(source.index, 1);
                destItems.splice(destination.index, 0, removed);
                setTaskColumns({
                    ...taskColumns,
                    [source.droppableId]: {
                        ...sourceColumn,
                        items: sourceItems
                    },
                    [destination.droppableId]: {
                        ...destColumn,
                        items: destItems
                    }
                });
            } else {
                const column = taskColumns[source.droppableId];
                const copiedItems = [...column.items];
                const [removed] = copiedItems.splice(source.index, 1);
                copiedItems.splice(destination.index, 0, removed);
                setTaskColumns({
                    ...taskColumns,
                    [source.droppableId]: {
                        ...column,
                        items: copiedItems
                    }
                });
            }
        };



        // return (
        // function App() {
        //     const [taskColumns, setTaskColumns] = useState(progressArray);
        //     return (
        //         <div className="context-wrapper">
        //             <DragDropContext
        //                 onDragEnd={result => onDragEnd(result, taskColumns, setTaskColumns)}
        //             >
        //                 {Object.entries(taskColumns).map(([columnId, column], index) => {
        //                     return (
        //                         <div className="column-wrap" key={columnId}>
        //                             <div style={{ margin: 8 }}>
        //                                 <Droppable droppableId={columnId} key={columnId}>
        //                                     {(provided, snapshot) => {
        //                                         return (
        //                                             <div className="dropbox"
        //                                                 {...provided.droppableProps}
        //                                                 ref={provided.innerRef}
        //                                                 style={{
        //                                                     background: snapshot.isDraggingOver
        //                                                         ? "#eee"
        //                                                         : "#ddd"

        //                                                 }}
        //                                             >
        //                                                 {column.items.map((item, index) => {
        //                                                     return (
        //                                                         <Draggable
        //                                                             key={item.id}
        //                                                             draggableId={item.id}
        //                                                             index={index}
        //                                                         >
        //                                                             {(provided, snapshot) => {
        //                                                                 return (
        //                                                                     <div className="dragbox"
        //                                                                         ref={provided.innerRef}
        //                                                                         {...provided.draggableProps}
        //                                                                         {...provided.dragHandleProps}
        //                                                                         style={{

        //                                                                             backgroundColor: snapshot.isDragging
        //                                                                                 ? "#929292"
        //                                                                                 : "#454545",
        //                                                                             ...provided.draggableProps.style
        //                                                                         }}
        //                                                                     >
        //                                                                         {item.content}
        //                                                                     </div>
        //                                                                 );
        //                                                             }}
        //                                                         </Draggable>
        //                                                     );
        //                                                 })}
        //                                                 {provided.placeholder}
        //                                             </div>
        //                                         );
        //                                     }}
        //                                 </Droppable>
        //                             </div>
        //                         </div>
        //                     );
        //                 })}
        //             </DragDropContext>
        //         </div>
        //     );

        // }

        return (
            <div>
                <Row>
                    {elementArray}
                </Row>

            </div>
        );
    }
}

export default ShowTasksList;


