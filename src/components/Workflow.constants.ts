import { Edge, Node } from '@xyflow/react'

export const initialEdges: Edge[] = [];

export const initialNodes: Node[] = [
    {
        id: '1',
        position: { x: 100, y: 100 },
        data: { amount: 10 },
        type: 'paymentInit',
    }
];