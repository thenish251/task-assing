import React, {useState } from 'react';
import { ListGroup, ListGroupItem, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Tasks = ({ tasks, onUpdateTask}) => {
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState({title: null, description: null, timeElapsed: null});


    const handleEditTask = (task,index) => {
        tasks.splice(index, 1);
        onUpdateTask([...tasks]);
        setEditModalOpen(true);
        setCurrentTask(task);
    };

    const handleUpdateTask = () => {
        console.log(currentTask);
        tasks = [...tasks, currentTask];
        onUpdateTask(tasks);
        setEditModalOpen(false);
        setCurrentTask(null);
    };

    const handleCancelEdit = () => {
        setEditModalOpen(false);
        onUpdateTask([...tasks,currentTask]);
        setCurrentTask(null);
    };

    return (
        <ListGroup style={{marginTop: 30}}>
            {tasks.map((task,index) => (
                <ListGroupItem key={task.title} style={{paddingLeft: 15}}>
                    <h4>{task.title}</h4>
                    <p>{task.description}</p>
                    <p>Time Tracked: <b>{task.timeElapsed}</b></p>
                    <Button color="secondary" onClick={() => handleEditTask(task,index)}>
                        Edit
                    </Button>
                </ListGroupItem>
            ))}
            <Modal isOpen={editModalOpen}>
                <ModalHeader>Edit Task</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="taskTitle">Title</Label>
                            <Input disabled={true} type="text" id="taskTitle" value={currentTask ? currentTask.title : ''} onChange={(e) => setCurrentTask(currentTask => ({...currentTask, title: e.target.value}))} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="taskDescription">Description</Label>
                            <Input type="textarea" id="taskDescription" value={currentTask ? currentTask.description : ''} onChange={(e) => setCurrentTask(currentTask => ({...currentTask, description: e.target.value}))} />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleUpdateTask}>
                        Update
                    </Button>
                    <Button color="secondary" onClick={handleCancelEdit}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </ListGroup>
    );
};

export default Tasks;


