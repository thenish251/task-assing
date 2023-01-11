import React, { useState } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Container, Alert } from 'reactstrap';
import Timer from './Timer';
import Tasks from './Tasks';
import 'bootstrap/dist/css/bootstrap.min.css';
import {TfiAlarmClock} from 'react-icons/tfi';

const App = () => {
  const [currentPage, setCurrentPage] = useState('timer');
  const [tasks, setTasks] = useState([]);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [error,setError] = useState(false);
  const [stage, setStage] = useState('paused');

  const saveTask = (task) => {
    setTasks([...tasks, task]);
  };


  const updateTask = (updatedTask) => {
    setTasks(updatedTask);
  };

  return (
    <Container fixed>
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand> <TfiAlarmClock/> Time Tracking App</NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="#" onClick={() => setCurrentPage('timer')}>Timer</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" onClick={() => {
                if(stage === 'started'){
                  setError(true);
                  return;
                }
                setCurrentPage('tasks')
                setError(false);
                
                }}>Tasks</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
        {currentPage === 'timer' ? (
          <Timer 
          onSaveTask={saveTask} 
          timeElapsed={timeElapsed} 
          setTimeElapsed={setTimeElapsed} 
          stage={stage} 
          setStage={setStage}
          />
        ) : (
          <Tasks tasks={tasks} onUpdateTask={updateTask} />
        )}
      </div>

      {error && <Alert variant='danger' style={{marginTop: 50}}> Pause the timer. To move to tasks section.</Alert>}
    </Container>
  );
};

export default App;
