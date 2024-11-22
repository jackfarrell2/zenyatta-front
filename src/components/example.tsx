import { ReactFlow, Node, Edge, Background, Controls, useNodesState, useEdgesState, Connection, addEdge } from '@xyflow/react'
import '@xyflow/react/dist/style.css';
import { useCallback } from 'react';

const initialNodes: Node[] = [
    {
        id: '1',
        data: {
            label: 'Node 1',
        },
        position: { x: 0, y: 0 },
    },
    {
        id: '2',
        data: {
            label: 'Node 2',
        },
        position: { x: 200, y: 200 },
    },
    {
        id: '3',
        data: {
            label: 'Node 3',
        },
        position: { x: 100, y: 200 },
    },
];

const initialEdges: Edge[] = [
    {
        id: '1-2',
        source: '1',
        target: '2',
        animated: true,
    }
]

function Example() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

    const onConnect = useCallback(
        (connection: Connection) => {
            setEdges((prevEdges) => {
                const newEdge: Edge = {
                    id: `${prevEdges.length + 1}`,
                    source: connection.source,
                    target: connection.target,
                    sourceHandle: connection.sourceHandle,
                    targetHandle: connection.targetHandle,
                    animated: true,
                };
                return addEdge(newEdge, prevEdges);
            });
        },
        []
    );



    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} fitView>
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    )
}

export { Example }