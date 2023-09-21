import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material-ui
import {
  LinearProgress,
  Stack,
  Typography,
  Link,
  Button,
  IconButton,
  Popover,
  Box
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PlayArrow from '@mui/icons-material/PlayArrow';
import CloudSync from '@mui/icons-material/CloudSync';

import Dot from 'components/@extended/Dot';
import Modal from 'components/Modal';

import { TaskForm, WorkflowForm } from './Form';
import DataFlow from './DataFlow';

export const Linker = ({ value }) => {
  return (
    <Link color="secondary" component={RouterLink} to="workflow">
      {value}
    </Link>
  )
};

export const Dataflow = (props) => {
  const { id, row, value, actions } = props;
  const [openFlow, setOpenFlow] = React.useState(row.test);
  return (
    <React.Fragment>
      <Link component="button" onClick={()=>{setOpenFlow(true)}}>{value}</Link>
      {
        openFlow && <DataFlow key={id} id={id} row={row} actions={actions} onClose={()=>{setOpenFlow(false)}} />
      }
    </React.Fragment>
  )
};

export const Progress = (props) => {
  const { value, row } = props;

  const getColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'warning'
      case 'Approved':
        return 'success';
      case 'Rejected':
        return 'error';
      default:
        return 'primary';
    };
  }
  return (
    <LinearProgress color={getColor(row.status)} variant="determinate" value={value} title={`${value}%`} />
  )
};

export const Status = ({ value }) => {
  let color;
  let title;

  switch (value) {
    case 1:
      color = 'warning';
      title = 'Created';
      break;
    case 2:
      color = 'success';
      title = 'Deployed';
      break;
    default:
      color = 'primary';
      title = 'None';
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
};

const ActionsOld = (props) => {
  const { id, row, actions } = props;
  const formRef = React.useRef(null);
  const [openTask, setOpenTask] = React.useState(false);
  const [openRun, setOpenRun] = React.useState(false);

  const onClickRun = (e) => {
    setOpenRun(e.currentTarget)
  }

  const onHandleClose = () => {
    setOpenTask(false);
    setOpenRun();
  };

  const onCreateSave = () => {
    const from = formRef.current.onHandleSubmit();
    actions.handleCreate('task', {id, data: from });
    onHandleClose();
  };

  const onWorkflowRun = () => {
    actions.handleWorkflowRun(id);
    onHandleClose();
  };

  return (
    <Stack direction="row" spacing={0} justifyContent="center">
      <IconButton onClick={() => setOpenTask(true)} color="secondary" aria-label="Add a tsak" title="Add a tsak">
        <AddIcon />
      </IconButton>
      <IconButton onClick={onClickRun} color="success" aria-label="Run the workflow" title="Run the workflow">
        <PlayArrow />
      </IconButton>
      {
        openTask &&
        <Modal
          key={id}
          title={`Create Task for ${row.name}`}
          maxWidth="xs"
          scroll="paper"
          show={openTask}
          onClose={onHandleClose}
          actions={[
            {
              close: true,
              children: 'Cancel'
            },
            {
              children: 'Save',
              variant: "contained",
              onClick: onCreateSave
            }
          ]}
        >
          <TaskForm ref={formRef} />
        </Modal>
      }
      {
        openRun &&
        <Popover
          id={id}
          open={!!openRun}
          anchorEl={openRun}
          onClose={onHandleClose}
        >
          <Box
            alignItems="center"
            sx={{ p: 2 }}
          >
            <Typography>
              Confirm that you want to run:
              <Button
                variant="contained"
                color="success"
                endIcon={<PlayArrow />}
                sx={{ ml: 1 }}
                onClick={onWorkflowRun}
              >
                Run
              </Button>
            </Typography>

          </Box>
        </Popover>
      }
    </Stack>
  )
};

export const Actions = (props) => {
  const { id, actions } = props;
  const [openRun, setOpenRun] = React.useState(false);
  const [runType, setRunType] = React.useState('Run');

  const onClickRun = (e, type) => {
    setOpenRun(e.currentTarget);
    setRunType(type);
  }

  const onHandleClose = () => {
    setOpenRun();
  };

  const onWorkflowRun = () => {
    actions.handleWorkflowRun(id, runType.toLowerCase());
    onHandleClose();
  };

  return (
    <Stack direction="row" spacing={0} justifyContent="center">
      <IconButton onClick={(e)=>onClickRun(e, 'Deploy')} color="warning" aria-label="Deploy the workflow" title="Deploy the workflow">
        <CloudSync />
      </IconButton>
      <IconButton onClick={(e)=>onClickRun(e, 'Run')} color="success" aria-label="Run the workflow" title="Run the workflow">
        <PlayArrow />
      </IconButton>
      {
        openRun &&
        <Popover
          id={id}
          open={!!openRun}
          anchorEl={openRun}
          onClose={onHandleClose}
        >
          <Box
            alignItems="center"
            sx={{ p: 2 }}
          >
            <Typography>
              Confirm that you want to run:
              <Button
                variant="contained"
                sx={{ ml: 1 }}
                onClick={onWorkflowRun}
              >
                {runType}
              </Button>
            </Typography>

          </Box>
        </Popover>
      }
    </Stack>
  )
};

export const WorkflowCreate = (props) => {
  const { actions, onClose, show } = props;
  const formRef = React.useRef(null);

  const onCreateSave = () => {
    const from = formRef.current.onHandleSubmit();
    actions.handleCreate('workflow', from);
    onClose();
  };
  if(!show) return null;
  return (
    <Modal
      key={'workflow-modal'}
      title={`Create Workflow`}
      maxWidth="sm"
      scroll="paper"
      show={show}
      onClose={onClose}
      actions={[
        {
          close: true,
          children: 'Cancel'
        },
        {
          children: 'Save',
          variant: "contained",
          onClick: onCreateSave
        }
      ]}
    >
      <WorkflowForm ref={formRef} />
    </Modal>
  )
}