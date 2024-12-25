import { Node, Edge } from '@xyflow/react';
import { APITask } from '../components/ProcessDash';

const transformTasksToNodes = (tasks: APITask[]): Node[] => {
    return tasks.map((task, index) => ({
        id: task.id,
        stepNumber: task.stepNumber,
        position: {
            x: 0,
            y: window.innerHeight * 0.42 * index,
        },
        data: { label: task.label, isLeaf: task.isLeaf, linkedProcessId: task.linkedProcessId, stepNumber: task.stepNumber },
        type: 'task',
    }))
};

const transformTasksToEdges = (tasks: APITask[]): Edge[] => {
    const edges = []
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].targets.length > 0) {
            for (let j = 0; j < tasks[i].targets.length; j++) {
                const thisEdge = {
                    id: `edge-${tasks[i].id}-${tasks[i].targets[j]}`,
                    source: tasks[i].id,
                    target: tasks[i].targets[j],
                }
                edges.push(thisEdge)
            }
        }
    }
    return edges
}

export { transformTasksToNodes, transformTasksToEdges }