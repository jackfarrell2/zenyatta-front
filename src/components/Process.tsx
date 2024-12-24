import React from 'react';
import { ReactFlow, Controls, Background, applyEdgeChanges, applyNodeChanges, NodeChange, EdgeChange, Node, Edge, Connection, addEdge, useReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { APITask } from './ProcessDash';
import TaskNode from './TaskNode';
import { transformTasksToNodes, transformTasksToEdges } from '../utils/transformTasks';


const rfStyle = {
    backgroundColor: '#B8CEFF',
}

interface ProcessProps {
    tasks: APITask[],
    focus: number,
    reFocus: number,
}

const Process: React.FC<ProcessProps> = (props) => {
    const initialNodes: Node[] = transformTasksToNodes(props.tasks);
    const initialEdges: Edge[] = transformTasksToEdges(props.tasks);
    const { setCenter } = useReactFlow();

    const [nodes, setNodes] = React.useState<Node[]>(initialNodes);
    const [edges, setEdges] = React.useState<Edge[]>(initialEdges);

    React.useEffect(() => {
        const targetNode = nodes[props.focus];
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
    }, [props.focus, props.reFocus, setCenter, nodes])

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
    );
}

export default Process