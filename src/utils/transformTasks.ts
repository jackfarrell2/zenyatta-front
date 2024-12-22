import { Node, Edge } from '@xyflow/react';
import { APITask } from '../components/ProcessDash';

const transformTasksToNodes = (tasks: APITask[]): Node[] => {
    return tasks.map((task, index) => ({
        id: task.id,
        position: {
            x: 0,
            y: window.innerHeight * 0.42 * index,
        },
        data: { label: task.label },
        type: 'task'
    }))
};

const transformTasksToEdges = (tasks: APITask[]): Edge[] => {
    const res = []
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].targets.length > 0) {
            for (let j = 0; j < tasks[i].targets.length; j++) {
                const thisTask = {
                    id: `edge-${tasks[i].id}-${tasks[i].targets[j]}`,
                    source: tasks[i].id,
                    target: tasks[i].targets[j],
                }
                res.push(thisTask)
            }
        }
    }
    return res
}

export { transformTasksToNodes, transformTasksToEdges }