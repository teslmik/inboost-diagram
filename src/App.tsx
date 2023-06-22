import React from 'react';
import { useSelector } from 'react-redux';
import ReactFlow, { OnNodesChange } from 'reactflow';
import CustomNode from './components/custom-node';
import { RootState, useAppDispatch } from './redux/store';
import { nodeChanged } from './redux/nodes/slice';

import './App.scss';
import 'reactflow/dist/style.css';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { nodes, edges } = useSelector((state: RootState) => state.nodes);

  const nodeTypes = React.useMemo(() => ({ customNode: CustomNode }), []);

  const onNodesChange: OnNodesChange = React.useCallback(
    (changes) => dispatch(nodeChanged(changes)),
    [dispatch],
  );

  return (
    <div className="app" style={{ height: '100vh', width: '100vw' }}>
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
      />
    </div>
  );
};

export default App;
