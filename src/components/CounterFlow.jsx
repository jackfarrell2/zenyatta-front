import { ReactFlow } from "@xyflow/react";
import { CounterNode } from './CounterNode'

const nodeTypes = {
    counterNode: CounterNode
};

function CounterFlow() {
    return (
        <div>
            <ReactFlow nodeTypes={nodeTypes} />
        </div>
    )
}

export { CounterFlow }