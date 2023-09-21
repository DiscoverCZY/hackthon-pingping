import datetime
from databricks_api import DatabricksAPI

from _tools.db import connector

client = DatabricksAPI(
    host="https://adb-8728304164668675.15.azuredatabricks.net",
    token="dapi935f6a648e513a7400b217643c3d65ab"
)

CLUSTER_DICT = {
    "0920-14439-3sibjfsv": "MASTER-CLUSTER-COMPUTER"
}


def deploy(workflow_id: int):
    workflow = connector.query_one("SELECT * FROM workflow WHERE id = %s", workflow_id)
    if workflow is None:
        raise Exception("workflow definition not found")
    tasks = connector.execute(
        "SELECT af.notebook_path as notebook_path, wt.name as name, wt.depends_on as depends_on, wt.run_if as run_if"
        " FROM workflow_task wt INNER JOIN data_funcs af ON wt.func_id = af.id WHERE wt.workflow_id = %s",
        workflow_id)
    if tasks is None or len(tasks) == 0:
        raise Exception("workflow's tasks definition not found")
    payload = []
    for task in tasks:
        depends = task['depends_on']
        depend_list = []
        if depends is not None:
            for depend in depends.split('.'):
                depend_list.append({
                    'task_key': depend
                })

        payload.append({
            'task_key': task['name'],
            'run_if': task['run_if'],
            'existing_cluster_id': workflow['cluster_id'],
            'notebook_task': {
                'notebook_path': task['notebook_path'],
                'source': 'WORKSPACE'
            },
            'depends_on': depend_list
        })
    result = client.jobs.create_job(
        name=workflow['name'],
        max_concurrent_runs=1,
        tasks=payload,
        format="MULTI_TASK",
    )
    if result is None:
        raise Exception(f"create workflow {workflow['name']} failed")
    connector.update("workflow", {'job_id': result['job_id'], 'status': 2}, f"id = {workflow_id}")


def create(name: str, cluster_id: str):
    # check workflow existed
    existed_id = get_workflow_id(name)
    if existed_id is not None:
        raise Exception(f"workflow {name} has been existed, cannot create it")
    # add workflow
    if len(name) == 0 or len(cluster_id) == 0:
        raise Exception("missing the required parameters of creating the workflow")
    data = {'name': name, 'cluster_id': cluster_id,
            'cluster_name': CLUSTER_DICT[cluster_id],
            'status': 1, 'create_time': datetime.datetime.now()}
    connector.insert('workflow', data)
    created_id = get_workflow_id(name)
    if created_id is None:
        raise Exception(f"create workflow {name} failed")
    # add tasks / only create the default tasks now
    __create_default_tasks(created_id)


def get_workflow_id(name: str):
    if len(name) == 0:
        return
    result = connector.query_one("SELECT * FROM workflow WHERE name = %s", name)
    if result is None:
        return
    return result['id']


def __create_default_tasks(workflow_id: int):
    __create_task('ingestion', workflow_id, 1, [])
    __create_task('transformation', workflow_id, 2, ['ingestion'])
    __create_task('quantity_check', workflow_id, 3, ['transformation'])
    __create_task('process_failed', workflow_id, 4, ['quantity_check'], 'ALL_FAILED')
    __create_task('process_success', workflow_id, 5, ['quantity_check'])


def __create_task(name: str, workflow_id: int, func_id: int, depends_on: [], run_if='ALL_SUCCESS'):
    if len(name) == 0 or workflow_id is None or func_id is None:
        raise Exception("missing the required parameters of creating the task")
    depends_on_joined = None if len(depends_on) == 0 else ','.join(depends_on)
    data = {'name': name, 'workflow_id': workflow_id, 'func_id': func_id,
            'run_if': run_if, 'depends_on': depends_on_joined,
            'create_time': datetime.datetime.now()}
    connector.insert('workflow_task', data)


def __create_default_funcs():
    __create_func('ingestion_module', '/Shared/ingestion.py')
    __create_func('transformation_module', '/Shared/transformation.py')
    __create_func('quantity_check_module', '/Shared/quantity_check.py')
    __create_func('process_failed_module', '/Shared/process_failed.py')
    __create_func('process_success_module', '/Shared/process_success.py')


def __create_func(name: str, notebook_path: str, func_type='CODE'):
    data = {'name': name, 'func_type': func_type,
            'notebook_path': notebook_path,
            'create_time': datetime.datetime.now()}
    connector.insert('data_funcs', data)

# __create_default_funcs()
