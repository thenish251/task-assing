import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect, useCallback } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Card, CardTitle, CardText } from 'reactstrap';
import {FcAlarmClock} from 'react-icons/fc';


const Timer = ({ onSaveTask, timeElapsed, setTimeElapsed, stage, setStage }) => {
    
    const [intervalId, setIntervalId] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');


    const incrementTimer =  useCallback(() => {
        setTimeElapsed((timeElapsed) => timeElapsed+1)
    },[])

    useEffect(() => {
        if (stage === 'started') {
            const id = setInterval(incrementTimer, 1000);
            setIntervalId(id);
          } else {
            clearInterval(intervalId);
            setIntervalId(null);
          }
    }, [stage]);

    const startTimer = () => {
        setStage('started');
    };

    const pauseTimer = () => {
        setStage('paused')
    };

    const saveTimer = () => {
        setModalOpen(true);
    };

    const handleChange = (e) => {
        if (e.target.name === 'title') {
            setTaskTitle(e.target.value);
        } else {
            setTaskDescription(e.target.value);
        }
    };

    const handleSaveTask = () => {
        const formattedTime = new Date(timeElapsed * 1000).toISOString().substr(11, 8);
        onSaveTask({ title: taskTitle, description: taskDescription, timeElapsed: formattedTime});
        setModalOpen(false);
        setTaskTitle('');
        setTaskDescription('');
        setStage('paused');
    };

    const handleCancelSave = () => {
        setModalOpen(false);
    };

    const formattedTime = new Date(timeElapsed * 1000).toISOString().substr(11, 8);

    return (
        <Card body className="text-center" style={{marginTop: 30}}>
            <CardTitle><h3> <FcAlarmClock /> {formattedTime}</h3></CardTitle>
            <CardText style={{marginTop: 30}}>
                <Button color="success" onClick={startTimer} disabled={stage !== 'paused'}>Start</Button>{'  '}
                <Button color="warning" onClick={pauseTimer} disabled={stage !== 'started'}>Pause</Button>{'  '}
                <Button color="primary" onClick={saveTimer} disabled={stage !== 'paused'}>Save</Button>
            </CardText>
            <Modal isOpen={modalOpen}>
                <ModalHeader>Save Task</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="taskTitle">Title</Label>
                            <Input type="text" name="title" id="taskTitle" value={taskTitle} onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="taskDescription">Description</Label>
                        <Input type="textarea" name="description" id="taskDescription" value={taskDescription} onChange={handleChange} />
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSaveTask}>Save</Button>{' '}
                <Button color="secondary" onClick={handleCancelSave}>Cancel</Button>
            </ModalFooter>
        </Modal>
    </Card >
  );
};

export default Timer;
