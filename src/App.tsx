import { ReactFlow } from '@xyflow/react';
import { Slide } from './components/Slide';
import { Doc } from './components/Doc';

const nodeTypes = {
  doc: Doc,
};

export default function App() {
  const nodes = [
    { id: '0', type: 'doc', position: { x: 0, y: 0 }, data: {} },
  ];

  return <ReactFlow nodes={nodes} nodeTypes={nodeTypes} fitView />;
}