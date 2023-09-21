export const WF_LIST_CLOUMNS = [
  {
    field: 'name',
    label: 'Name',
    align: 'left',
    render: 'Dataflow'
  },

  {
    field: 'status',
    label: 'Status',
    width: 200,
    render: 'Status'
  },
  {
    field: 'create_time',
    label: 'Create Time',
    width: 300,
  },
  {
    field: 'cluster_name',
    label: 'Cluster Name',
    width: 300,
  },
  {
    field: 'actions',
    label: 'Actions',
    align: 'center',
    width: 180,
    render: 'Actions'
  },
];

export const WF_LIST_DATA = [
  {
    "id": 0,
    "name": "Workflow name 1",
    "status": 1,
    "create_time": "9/21/2023 HH:MM:SS",
    "cluster_name": "master-computer-cluster",
    "cluster_id": "string",
    "job_id": "string"
  },
  {
    "id": 1,
    "name": "Workflow name 2",
    "status": 2,
    "create_time": "9/21/2023 HH:MM:SS",
    "cluster_name": "master-computer-cluster",
    "cluster_id": "string",
    "job_id": "string"
  },
  {
    "id": 2,
    "name": "Workflow name 3",
    "status": 1,
    "create_time": "9/21/2023 HH:MM:SS",
    "cluster_name": "master-computer-cluster",
    "cluster_id": "string",
    "job_id": "string"
  },
  {
    "id": 3,
    "name": "Workflow name 4",
    "status": 2,
    "create_time": "9/21/2023 HH:MM:SS",
    "cluster_name": "master-computer-cluster",
    "cluster_id": "string",
    "job_id": "string"
  },
  {
    "id": 0,
    "name": "Workflow name 1",
    "status": 1,
    "create_time": "9/21/2023 HH:MM:SS",
    "cluster_name": "master-computer-cluster",
    "cluster_id": "string",
    "job_id": "string"
  },
  {
    "id": 1,
    "name": "Workflow name 2",
    "status": 2,
    "create_time": "9/21/2023 HH:MM:SS",
    "cluster_name": "master-computer-cluster",
    "cluster_id": "string",
    "job_id": "string"
  },
  {
    "id": 2,
    "name": "Workflow name 3",
    "status": 1,
    "create_time": "9/21/2023 HH:MM:SS",
    "cluster_name": "master-computer-cluster",
    "cluster_id": "string",
    "job_id": "string"
  },
  {
    "id": 3,
    "name": "Workflow name 4",
    "status": 2,
    "create_time": "9/21/2023 HH:MM:SS",
    "cluster_name": "master-computer-cluster",
    "cluster_id": "string",
    "job_id": "string"
  },
  {
    "id": 0,
    "name": "Workflow name 1",
    "status": 1,
    "create_time": "9/21/2023 HH:MM:SS",
    "cluster_name": "master-computer-cluster",
    "cluster_id": "string",
    "job_id": "string"
  },
  {
    "id": 1,
    "name": "Workflow name 2",
    "status": 2,
    "create_time": "9/21/2023 HH:MM:SS",
    "cluster_name": "master-computer-cluster",
    "cluster_id": "string",
    "job_id": "string"
  },
  {
    "id": 2,
    "name": "Workflow name 3",
    "status": 1,
    "create_time": "9/21/2023 HH:MM:SS",
    "cluster_name": "master-computer-cluster",
    "cluster_id": "string",
    "job_id": "string"
  },
  {
    "id": 3,
    "name": "Workflow name 4",
    "status": 2,
    "create_time": "9/21/2023 HH:MM:SS",
    "cluster_name": "master-computer-cluster",
    "cluster_id": "string",
    "job_id": "string"
  }
];

export const WF_TASK_LIST = [
  {
    id: 'a',
    name: 'ingestion',
    workflow_id: 0
  },
  {
    id: 'b',
    name: 'transformation',
    depends_on: ['a'],
    workflow_id: 0
  },
  {
    id: 'c',
    name: 'extract',
    depends_on: ['b', 'a'],
    workflow_id: 0
  },
  {
    id: 'd',
    name: 'A',
    depends_on: ['c'],
    workflow_id: 0
  },
  {
    id: 'e',
    name: 'B',
    depends_on: ['c'],
    workflow_id: 0
  },
];