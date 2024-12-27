import React from 'react';
import { ReactFlow, Controls, Background, applyEdgeChanges, applyNodeChanges, NodeChange, EdgeChange, Node, Edge, Connection, addEdge, useReactFlow, Panel } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Box, CircularProgress, IconButton } from '@mui/material';
import TaskNode from './TaskNode';
import { transformTasksToNodes, transformTasksToEdges } from '../utils/transformTasks';
import { useQuery } from '@tanstack/react-query';
import config from '../config'
import { FocusContext, FocusContextType } from './ProcessDash';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TaskModal from './TaskModal';

const apiUrl = `${config.apiUrl}`

const rfStyle = {
    backgroundColor: '#B8CEFF',
}

interface ProcessProps {
    initialProcess: number;
}

export interface TaskModalStateType {
    open: boolean;
    step: number | null
}

const defaultTaskModalState: TaskModalStateType = {
    open: false,
    step: null,
}
export interface TaskModalContextType {
    taskModalState: TaskModalStateType
    setTaskModalState: React.Dispatch<React.SetStateAction<TaskModalStateType>>;
}

const defaultTaskModalContext: TaskModalContextType = {
    taskModalState: defaultTaskModalState,
    setTaskModalState: () => { }
}

export const TaskModalContext = React.createContext<TaskModalContextType>(defaultTaskModalContext)

const Process: React.FC<ProcessProps> = (props) => {
    const [nodes, setNodes] = React.useState<Node[]>([]);
    const [edges, setEdges] = React.useState<Edge[]>([]);
    const [taskModalState, setTaskModalState] = React.useState<TaskModalStateType>(defaultTaskModalState)
    const { focus, setFocus } = React.useContext<FocusContextType>(FocusContext)

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

    React.useEffect(() => {
        const targetNode = nodes[focus.step];
        if (targetNode) {
            setCenter(
                targetNode.position.x + (targetNode.measured?.width ?? 0) / 2,
                targetNode.position.y + (targetNode.measured?.height ?? 0) / 2 + 115,
                {
                    duration: 800,
                    zoom: 1.2
                }
            );
        }
    }, [focus.step, setCenter, nodes])

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
            <TaskModalContext.Provider value={{ taskModalState, setTaskModalState }}>
                <TaskModal open={taskModalState['open']} setTaskModalState={setTaskModalState} />
                <Box sx={{ height: '100vh', width: '85vw', p: 0, m: 0 }}>
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
            </TaskModalContext.Provider>
        </>
    );
}

export default Process