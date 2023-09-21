import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  Box
} from '@mui/material';

import Modal from 'components/Modal';

import Flow from './Flow';
import { TaskForm, WorkflowForm } from '../Form';

import { WF_TASK_LIST } from 'mock/Workflow';

const DataFlow = (props) => {
  const { id, row, onClose, actions } = props;
  const { name } = row;

  const flowAPI = useRef();
  const onInit = (reactFlowInstance) => { flowAPI.current = reactFlowInstance; console.log('flow loaded:', reactFlowInstance)};

  const [taskList, setTaskList] = useState(new Map());
  const [tasks, setTasks] = useState();
  const [task, setTask] = useState();

  const handleTaskFlow = (data, setList) => {
    const nodes = [];
    const edges = [];
    data.forEach((element, index) => {
      const id = element.id || `node-${index}`;
      if(setList) taskList.set(id, element);
      nodes.push(element);
      if (element.depends_on && element.depends_on.length) {
        element.depends_on.forEach((source, idx) => {
          edges.push({
            id: `edge-${index}-${idx}`,
            source,
            target: id,
            animated: true
          })
        });

      }
    });
    return {
      nodes,
      edges
    }
  }
  const getWorkflowList = () => {
    setTasks();
    fetch(`/api/workflow/task/list/${id}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      },
    }).then(async (response) => {
      const { data } = await response.json();
      const taskFlow = handleTaskFlow(data, true);
      setTasks(taskFlow);
    }
    ).catch(error => {
      console.error(error);

      /* const taskFlow = handleTaskFlow(WF_TASK_LIST, true);
      setTasks(taskFlow); */
    });
  };

  const _onNodeClick = (node) => {
    const { data } = node;
    setTask(data);
  }

  const _onPaneClick = () => {
    setTask();
  }

  const onRunClick = (e) => {
    const type = e.target.innerText.toLowerCase();
    actions.handleWorkflowRun(id, type);
  };

  const taskFormRef = React.useRef(null);
  const workflowFormRef = React.useRef(null);
  const onClickWFUpdate = (type) => {
    const form = workflowFormRef.current.onHandleSubmit();

    const data = {
      id: form.id,
      name: form.name
    }

    actions.handleCreate('workflow', data, 'PUT');
  };

  // task
  const onTaskChange = (data) => {
    const taskID = data.id;

    taskList.set(taskID, data);
    flowAPI.current.setNodes((nds) =>
      nds.map((node) => {
        if (node.id === taskID) {
          node.data = {
            ...data,
            label: data.name,
          };
        }

        return node;
      })
    );
  };
  const onClickTaskUpdate = () => {
    const _edges = flowAPI.current.getEdges();
    const edgesMap = new Map();
    _edges.forEach(e=> {
      const id = e.target;
      const edge = edgesMap.get(id) || [];
      edgesMap.set(id, [...edge, e.source])
    })
    console.log(edgesMap)
    /* const taskData = {
      id: form.id,
      workflow_id: form.workflow_id,
      name: form.name,
      fun_id: form.fun_id,
      depends_on: form.depends_on
    }
    const from = taskFormRef.current.onHandleSubmit();
    const data = []; */

    // actions.handleCreate('task', data, 'PUT');
  };




  useEffect(() => {
    getWorkflowList();
  }, []);


  return (
    <Modal
      key={'dataflow'}
      title={`Workflow: ${name}`}
      fullScreen
      show
      onClose={onClose}
    >
      <Box className="data-flow">
        <Box className="flow">
          <Flow
            data={tasks}
            onNodeClick={_onNodeClick}
            onPaneClick={_onPaneClick}
            onInit={onInit}
          >
          </Flow>
        </Box>
        <Box className={`side open`}>
          {
            task ?
              (
                <Box className="task">
                  <Box className="title">{task.name || 'Create a task'}</Box>
                  <Box className="taskFrom">
                    <TaskForm key={task.id || 'new'} data={task} ref={taskFormRef} onChange={onTaskChange} />
                  </Box>
                  <Box className="actions">
                    <Button
                      variant="contained"
                      onClick={onClickTaskUpdate}
                    >
                      {task.id ? 'Update' : 'Save'}
                    </Button>
                  </Box>
                </Box>
              ) :
              (
                <Box className="task workflow">
                  <Box className="title">{row.name}</Box>
                  <Box className="taskFrom">
                    <WorkflowForm data={row} ref={workflowFormRef} />
                  </Box>
                  <Box className="actions">
                    <Button
                      variant="contained"
                      sx={{ mr: 1 }}
                      color="warning"
                      onClick={onRunClick}
                    >
                      Deploy
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ mr: 1 }}
                      color="success"
                      onClick={onRunClick}
                    >
                      Run
                    </Button>
                    <Button
                      variant="contained"
                      onClick={onClickWFUpdate}
                    >
                      Update
                    </Button>
                  </Box>
                </Box>
              )
          }
        </Box>
      </Box>
    </Modal>
  )
};

export default DataFlow;
