import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import './paginate.css';
import TasksCard from '../TasksCard';
import { Card, Col } from 'react-bootstrap';


function App() {
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [perPage] = useState(5);
  const [pageCount, setPageCount] = useState(5)


  const getData = async() => {
    //   const res = await axios.get("http://localhost:62000/api/v1/tasks")
    //   const data = res.data;
      console.log(data);

      let progressArray: string[] = ["initial", "selected", "progress", "review", "done"];

        // this function is responsible to loop through progress array and create task cards 
        // function tasksFunction(value: string) {
        //     return data.filter(function (obj: any) {
        //         return obj.taskProgress === value;
        //     }).map((task: any, k: number) =>
        //         <TasksCard task={task} key={k} />
        //     );
        // }

        // this function below sets first letter of word as capital
        // function capitalizeFirstLetter(word: string) {
        //     if (typeof word !== 'string') return '';
        //     return word.charAt(0).toUpperCase() + word.slice(1);
        // }

        // progressArray.map((element: string, elKey: number) =>{
        //     const slice = data.slice(offset, offset + perPage);
        //         const postData = slice.map((pd: any, pdk: number) =>{
        //             return <Col sm={2} className="padding-0" key={element + elKey + 1}>
        //             <Card
        //                 bg={''}
        //                 key={element + elKey + 2}
        //                 text={'dark'}
        //                 style={{ height: '100%' }}
        //                 className="padding-0"
        //             >
        //                 <Card.Header key={element + elKey + 3}>{capitalizeFirstLetter(element)}</Card.Header>
        //                 <Card.Body key={element + elKey + 4}>
        //                     {tasksFunction(element)}
        //                 </Card.Body>
        //             </Card>
        //         </Col>
                
        //         }) 
                
                
        //         setData(postData)
        //         setPageCount(Math.ceil(data.length / perPage))

        // })
      
                
  }
  const handlePageClick = (e: any) => {
    const selectedPage = e.selected;
    setOffset(selectedPage + 1)
    console.log(selectedPage);
    
};

 useEffect(() => {
   getData()
 }, [offset])

  return (
    <div className="App">
      {data}
       <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    // subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
    </div>
  );
}

export default App;