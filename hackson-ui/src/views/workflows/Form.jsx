import React, { forwardRef, useState, useImperativeHandle } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  TextField,
  Select,
  MenuItem,
} from '@mui/material';

const DEFAULT_TASK = {
  name: 'New Task',
  fun_id: 1,
  depends_on: []
};

export const TaskForm = forwardRef((props, formRef) => {
  const { data, onChange } = props;
  const [formData, setFormData] = useState({ ...DEFAULT_TASK, ...data });
  const onHandleSubmit = (e) => {
    return formData;
  };

  useImperativeHandle(formRef, () => ({
    onHandleSubmit
  }));

  const onFormChange = (e, type) => {
    const newForm = {
      ...formData,
      [type]: e.target.value
    };
    setFormData(newForm);
    onChange(newForm);
  };

  return (
    <Box component="form" noValidate onSubmit={onHandleSubmit} sx={{ width: 340 }}>
      <FormControl fullWidth id="name" sx={{ mb: 2 }}>
        <FormLabel required>Name</FormLabel>
        <TextField
          required
          defaultValue={formData.name}
          onChange={(e) => onFormChange(e, 'name')}
        />
      </FormControl>
      <FormControl fullWidth id="fun_id" sx={{ mb: 2 }}>
        <FormLabel required>Function</FormLabel>
        <Select
          required
          defaultValue={formData.fun_id}
          fullWidth
          onChange={(e) => onFormChange(e, 'fun_id')}
        >
          <MenuItem value={1}>ingetsion_module</MenuItem>
          <MenuItem value={2}>transformation_</MenuItem>
          <MenuItem value={3}>quantity_check_</MenuItem>
          <MenuItem value={4}>process_failed_</MenuItem>
          <MenuItem value={5}>process_success_module</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
});

const DEFAULT_WF = {
  name: 'New Workflow'
};

export const WorkflowForm = forwardRef((props, formRef) => {
  const { data } = props;
  const [formData, setFormData] = useState({ ...DEFAULT_WF, ...data });
  const onHandleSubmit = (e) => {
    return formData;
  };

  useImperativeHandle(formRef, () => ({
    onHandleSubmit
  }));

  const onFormChange = (e, type) => {
    setFormData({
      ...formData,
      [type]: e.target.value
    })
  };

  return (
    <Box component="form" noValidate onSubmit={onHandleSubmit} sx={{ width: 340 }}>
      <FormControl fullWidth id="name" sx={{ mb: 2 }}>
        <FormLabel required>Name</FormLabel>
        <TextField
          required
          defaultValue={formData.name}
          onChange={(e) => onFormChange(e, 'name')}
        />
      </FormControl>
      {
        data && (
          <React.Fragment>
            <FormControl fullWidth id="status" sx={{ mb: 2 }}>
              <FormLabel>Status</FormLabel>
              <Select
                value={formData.status}
                readOnly
                fullWidth
              >
                <MenuItem value={1}>Created</MenuItem>
                <MenuItem value={2}>Deployed</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth id="create_time" sx={{ mb: 2 }}>
              <FormLabel>Create Time</FormLabel>
              <TextField
                readOnly
                defaultValue={formData.create_time}
              />
            </FormControl>
          </React.Fragment>
        )}
        <FormControl fullWidth id="cluster_name" sx={{ mb: 2 }}>
          <FormLabel>Cluster Name</FormLabel>
          <TextField
            readOnly
            defaultValue={formData.cluster_name || "master-computer-cluster"}
          />
        </FormControl>
    </Box>
  )
});