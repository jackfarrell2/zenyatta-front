import React from 'react';
import { ReactFlow, Controls, Background, applyEdgeChanges, applyNodeChanges, NodeChange, EdgeChange, Node, Edge, Connection, addEdge, useReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Box, CircularProgress } from '@mui/material';
import TaskNode from './TaskNode';
import { transformTasksToNodes, transformTasksToEdges } from '../utils/transformTasks';
import { useQuery } from '@tanstack/react-query';
import config from '../config'
import { FocusContext, FocusContextType } from './ProcessDash';

const apiUrl = `${config.apiUrl}`

const rfStyle = {
    backgroundColor: '#B8CEFF',
}

const Process: React.FC = (props) => {
    const [nodes, setNodes] = React.useState<Node[]>([]);
    const [edges, setEdges] = React.useState<Edge[]>([]);
    const { focus } = React.useContext<FocusContextType>(FocusContext)

    const { isLoading: tasksLoading } = useQuery(
        ['processViewTasks', focus.process],
        async () => {
            const response = await fetch(`${apiUrl}/process/${focus.process.toString()}`);
            if (!response.ok) {
                throw new Error('Failed to fetch tasks');
            }
            const res = await response.json();
            return res;
        },
        {
            onSuccess: (res) => {
                setNodes(transformTasksToNodes(res.data.tasks))
                setEdges(transformTasksToEdges(res.data.tasks))
            },
        }
    );

    const { setCenter } = useReactFlow();

    React.useEffect(() => {
        const targetNode = nodes[focus.step];
        if (targetNode) {
            setCenter(
                targetNode.position.x + 380,
                targetNode.position.y + 325,
                {
                    duration: 800,
                    zoom: 1.2
                }
            );
        }
    }, [focus, setCenter, nodes])

    const nodeTypes = React.useMemo(() => ({ task: TaskNode }), []);

    const onNodesChange = React.useCallback(
        (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [],
    );
    const onEdgesChange = React.useCallback(
        (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [],
    );
    const onConnect = React.useCallback(
        (params: Connection) => setEdges((eds) => addEdge(params, eds)),
        [],
    );


    return (
        <Box sx={{ height: '100%', width: '100%' }}>
            {(tasksLoading || nodes.length === 0) ? (
                <Box>
                    <CircularProgress />
                </Box>
            ) : (
                <div style={{ height: '100vh', 'width': '100vw' }}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        nodeTypes={nodeTypes}
                        fitView
                        style={rfStyle}
                        nodesDraggable={false}
                        zoomOnDoubleClick={false}
                    >
                        <Background />
                        <Controls />
                    </ReactFlow>
                </div>
            )}
        </Box>
    );
}

export default Process