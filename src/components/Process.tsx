import React from 'react';
import { ReactFlow, Controls, Background, applyEdgeChanges, applyNodeChanges, NodeChange, EdgeChange, Node, Edge, Connection, addEdge } from '@xyflow/react';
import { useQuery } from '@tanstack/react-query';
import config from '../config'
import '@xyflow/react/dist/style.css';
import Task from './Task';

const rfStyle = {
    backgroundColor: '#B8CEFF',
}

const initialNodes: Node[] = [
    {
        id: 'node-1',
        type: 'task',
        position: { x: 0, y: 0 },
        data: { value: 123 },
    },
    {
        id: 'node-2',
        type: 'task',
        position: { x: 0, y: 200 },
        data: { value: 123 },
    }
]

// const initialNodes: Node[] = [
// ]

const initialEdges: Edge[] = [{ id: 'edge-1', source: 'node-1', target: 'node-2', sourceHandle: 'a' }];

const apiUrl = `${config.apiUrl}`

const CustomFlow: React.FC = () => {
    const [nodes, setNodes] = React.useState<Node[]>(initialNodes);
    const [edges, setEdges] = React.useState<Edge[]>(initialEdges);
    const [tasksState, setTasksState] = React.useState(null)
    const nodeTypes = React.useMemo(() => ({ task: Task }), []);

    // Fetch tasks
    const { data: tasks, isLoading: tasksLoading } = useQuery(['tasks'], async () => {
        const response = await fetch(`${apiUrl}/processes`)
        if (!response.ok) {
            throw new Error('Failed to fetch tasks')
        } else {
            setTasksState(tasks['data']['title'])
        }
        const data = await response.json()
        return data

    })

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
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
}

export default CustomFlow