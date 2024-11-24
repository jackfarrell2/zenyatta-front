import { useState, useCallback } from 'react';
import { EdgeChange, NodeChange, ReactFlow, applyEdgeChanges, applyNodeChanges, Background, Controls, addEdge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes = [
    {
        id: '1',
        position: { x: 0, y: 0 },
        data: { label: 'Hello' },
        type: 'input',
    },
    {
        id: '2',
        position: { x: 100, y: 100 },
        data: { label: 'World' },
    },
];

const initialEdges = [{ id: '1-2', source: '1', target: '2', label: 'to the', type: 'step' }];


function Flow() {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);
    const onNodesChange = useCallback(
        (changes: NodeChange<{ id: string; position: { x: number; y: number; }; data: { label: string; }; type: string; } | { id: string; position: { x: number; y: number; }; data: { label: string; }; type?: undefined; }>[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [],
    );
    const onEdgesChange = useCallback(
        (changes: EdgeChange<{ id: string; source: string; target: string; label: string; type: string; }>[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [],
    );
    const onConnect = useCallback(
        (params: any) => setEdges((eds) => addEdge(params, eds)),
        [],
    );
    return (
        <div style={{ height: '100vh', width: '100vw' }}>
            <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} fitView>
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
}

export { Flow };