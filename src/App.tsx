import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { TaskContainer } from './components/TaskContainer';
import { addContainer } from './redux/actions/TaskActions';

function App() {
  // const containers = useSelector((state: any) => {
  //   return Object.keys(state.containers)
  // })
  let containers = useSelector((state: any) => state.containers)
  containers = Object.keys(containers);
  const [containerName,setContainerName] = useState("");
  const dispatch = useDispatch();
  function createContainer(){
    dispatch(addContainer(containerName));
  }
  return (<>
    <input value={containerName} onChange={e => setContainerName(e.target.value)} placeholder={":)"} />
    <button onClick={() => createContainer()}>Add List</button>
    <Container>
      <Row>
      {containers.map((container: any) => {
        return <Col xs={10}><TaskContainer containerId={container} containerTitle={container} /></Col>;
      })}
      </Row>
    </Container>
   </>
  );
}

export default App;
