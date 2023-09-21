import React, { useCallback } from 'react';
import {
  Button,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ReactFlow, {
  ReactFlowProvider,
  Controls,
  Panel,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  MarkerType,
  addEdge
} from 'reactflow';
import 'reactflow/dist/style.css';

import Loader from 'components/Loader';

const getNodeId = () => `randomnode_${+new Date()}`;

const proOptions = { hideAttribution: true };
const defaultEdgeOptions = {
  // animated: false,
  type: 'smoothstop',
  markerEnd: {
    type: MarkerType.ArrowClosed
  },
  style: {
    strokeWidth: 1,
    stroke: '#78909c',
  }
}

const setNodesLabel = (data) => {
  return data.map((node, index) => ({
    id: node.id,
    data: { ...node, label: node.name },
    position: { x: 0, y: index * 100 },
  }));
}

const LayoutFlow = (props) => {
  const { data, onNodeClick, nodeTypes, children, ...flowProps } = props;

  const [nodes, setNodes, onNodesChange] = useNodesState(setNodesLabel(data.nodes));
  const [edges, setEdges, onEdgesChange] = useEdgesState(data.edges);

  const _onNodeClick = (_, node) => {
    onNodeClick && onNodeClick(node);
  }

  const onAddNode = useCallback(() => {
    const id = getNodeId();
    const newNode = {
      id,
      data: { label: 'New Task', name: 'New Task', create: id },
      position: {
        x: Math.random() * 200,
        y: Math.random() * 200,
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeClick={_onNodeClick}
      onConnect={onConnect}
      fitView
      defaultEdgeOptions={defaultEdgeOptions}
      nodeTypes={nodeTypes}
      proOptions={proOptions}
      style={{
        backgroundColor: '#e3f2fd',
      }}
      {...flowProps}
    >
      {children}
      <Panel position="top-right">
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAddNode}
          sx={{ mr: 1 }}
        >
          Create Task
        </Button>
      </Panel>
      <Controls position="bottom-right" />
      <Background variant={BackgroundVariant.Cross} />
    </ReactFlow>
  );
};

export default function Flow(props) {
  return (
    <ReactFlowProvider>
      {
        props.data ?
          <LayoutFlow {...props} /> :
          <Loader show={true} bg />
      }
    </ReactFlowProvider>
  );
}
