import React from 'react';
import { ReactFlow, Controls, Background, applyEdgeChanges, applyNodeChanges, NodeChange, EdgeChange, Node, Edge, Connection, addEdge, useReactFlow, Panel } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Box, CircularProgress, IconButton } from '@mui/material';
import TaskNode from '../task/TaskNode';
import { transformTasksToNodes, transformTasksToEdges } from '../../utils/transformTasks';
import { useQuery } from '@tanstack/react-query';
import config from '../../config'
import { FocusContext, FocusContextType } from './ProcessDash';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Manual from '../manual/Manual';
import { ManualContext, ManualContextType } from '../process/ProcessDash';


const apiUrl = `${config.apiUrl}`

const rfStyle = {
    backgroundColor: '#B8CEFF',
}

interface ProcessProps {
    initialProcess: number;
}

const Process: React.FC<ProcessProps> = (props) => {
    const [nodes, setNodes] = React.useState<Node[]>([]);
    const [edges, setEdges] = React.useState<Edge[]>([]);
    const { focus, setFocus } = React.useContext<FocusContextType>(FocusContext)
    const { manualState } = React.useContext<ManualContextType>(ManualContext)


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
            refetchOnWindowFocus: false,
        },
    );

    const { setCenter } = useReactFlow();

    const nodeFocus = React.useCallback(() => {
        const targetNode = nodes[focus.step];
        if (targetNode) {
            setTimeout(() => {
                setCenter(
                    targetNode.position.x + (targetNode.measured?.width ?? 0) / 2,
                    targetNode.position.y + (targetNode.measured?.height ?? 0) / 2 + 115,
                    {
                        duration: 800,
                        zoom: 1.2
                    }
                );
            }, 100);
        }
    }, [focus.step, nodes, setCenter]);

    React.useEffect(() => {
        if (!manualState.open && nodes.length > 0) {
            nodeFocus();
        }
    }, [focus.step, nodeFocus, manualState.open, nodes]);

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

    const handleBackClick = () => {
        setFocus(prevFocus => ({
            ...prevFocus,
            process: prevFocus.process - 1,
            step: 0
        }));
    };

    return (
        <>
            {(manualState.open === true) ? (
                <Box sx={{ height: '100vh', p: 0, m: 0, overflow: 'auto' }}>
                    <Manual />
                </Box>
            ) : (
                <>
                    <Box sx={{ height: '100vh', p: 0, m: 0 }}>
                        {(tasksLoading || nodes.length === 0) ? (
                            <Box>
                                <CircularProgress />
                            </Box>
                        ) : (
                            <div style={{ height: '100%', 'width': '100%' }}>
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
                                    <Panel position='top-left'>
                                        <IconButton size='large' disabled={(props.initialProcess === focus.process) ? true : false} onClick={handleBackClick}>
                                            <ArrowBackIcon />
                                        </IconButton>
                                    </Panel>
                                    <Background />
                                    <Controls />
                                </ReactFlow>
                            </div>
                        )}
                    </Box>
                </>
            )}
        </>
    )
}

export default Process