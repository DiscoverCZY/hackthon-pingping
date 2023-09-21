import React, { useState, useEffect } from 'react';
// material-ui
import {
  Box,
  Grid,
  Typography,
  Button,
  Alert
} from '@mui/material';
import Add from '@mui/icons-material/Add';


import Table from 'components/table';
import * as Celler from './Celler';
import "./style.css";

import { WF_LIST_CLOUMNS, WF_LIST_DATA } from 'mock/Workflow';

const Workflows = () => {
  const [workflows, setWorkfolows] = useState(null);
  const [alert, setAlert] = useState();

  const handleAlert = (type, msg) => {
    setAlert({
      severity: type,
      children: msg
    });
    const timmer = type === 'success' ? 1000 : 3000;
    setTimeout(() => setAlert(), timmer);
  }

  const getWorkflowList = () => {
    setWorkfolows(null);
    fetch('/api/workflow/list', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      },
    }).then(async (response) => {
      const { data } = await response.json();
      setWorkfolows(data);
    }
    ).catch(error => {
      console.error(error);
      // handleAlert('error', error.message);
      setWorkfolows([]);
      // setWorkfolows(WF_LIST_DATA);
    });
  };

  const handleWorkflowRun = (id, type = 'run') => {
    fetch(`/api/workflow/${type}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id,
      }),
    }).then(async (response) => {
      handleAlert('success', 'Start running');
    }
    ).catch(error => {
      console.error(error);
      handleAlert('error', error.message);
    });
  };

  const handleCreate = (type, data, method = "POST") => {
    const api = type === 'task' ? '/task' : '';
    fetch(`/api/workflow${api}`, {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    }).then(async (response) => {
      getWorkflowList();
    }
    ).catch(error => {
      console.error(error);
      // handleAlert('error', error.message);
      // getWorkflowList();
    });
  };

  const [openWorkflowCreat, setOpenWorkflowCreat] = React.useState(false);
  const onHandleWorkflowCreate = (v) => {
    setOpenWorkflowCreat(v);
  };

  useEffect(() => {
    getWorkflowList();
  }, []);


  return (
    <Box className="workflows">
      <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
        <Grid item>
          <Typography variant="h5">Workflow</Typography>
        </Grid>
        {
          alert &&
          <Grid item>
            <Alert {...alert} />
          </Grid>
        }

        <Grid item>
          <Button variant="contained" endIcon={<Add />} onClick={() => onHandleWorkflowCreate(true)}>
            Create
          </Button>
        </Grid>
      </Grid>
      <Table
        name="Workflows"
        columns={WF_LIST_CLOUMNS}
        data={workflows}
        components={{
          ...Celler
        }}
        actions={{
          getWorkflowList,
          handleWorkflowRun,
          handleCreate
        }}
      />
      <Celler.WorkflowCreate
        actions={{
          getWorkflowList,
          handleCreate
        }}
        show={openWorkflowCreat}
        onClose={() => onHandleWorkflowCreate(false)}
      />
    </Box>
  )
}

export default Workflows;