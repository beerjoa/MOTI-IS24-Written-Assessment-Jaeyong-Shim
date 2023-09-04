import { useCallback } from 'react';
import ReactFlow, {
  Node,
  useNodesState,
  useEdgesState,
  Edge,
  addEdge,
  Connection,
  ConnectionLineType,
  Panel,
  EdgeTypes,
  NodeTypes,
  ConnectionMode,
} from 'reactflow';
import 'reactflow/dist/style.css';

import PersonNode from './PersonNode';

import styles from './Flow.module.css';
import { dummyPerson } from '../models/Person';
import RelationEdge from './RelationEdge';

const getNodeId = () => `randomnode_${+new Date()}`;

const initialNodes: Node[] = [
  {
    id: '1',
    data: dummyPerson,
    position: { x: 250, y: 5 },
    type: 'custom',
    className: styles.personNode,
  },
  {
    id: '2',
    data: { ...dummyPerson, first_name: 'Node 2', person_id: getNodeId() },
    position: { x: 100, y: 100 },
    type: 'custom',
    className: styles.personNode,
  },
  {
    id: '3',
    data: { ...dummyPerson, first_name: 'Node 3', person_id: getNodeId() },
    position: { x: 400, y: 100 },
    type: 'custom',
    className: styles.personNode,
  },
  {
    id: '4',
    data: { ...dummyPerson, first_name: 'Node 4', person_id: getNodeId() },
    position: { x: 400, y: 200 },
    type: 'custom',
    className: styles.personNode,
  },
];

const initialEdges: Edge[] = [];

const nodeTypes: NodeTypes = {
  custom: PersonNode,
};

const edgeTypes: EdgeTypes = {
  custom: RelationEdge,
};

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // useEffect(() => {
  //   apiService.getPersons().then((persons) => {
  //     const newNodes = persons.map((person) => {
  //       return {
  //         id: person.person_id,
  //         data: { label: person.first_name },
  //         position: { x: Math.random() * 500, y: Math.random() * 500 }, // Adjust position as needed
  //       };
  //     });
  //     setNodes(newNodes);
  //   });
  // }, [setNodes]);

  console.log(edges);
  const onConnect = useCallback(
    (params: Connection | Edge) => {
      const duple = edges.filter((edge) => edge.target === params.target);

      if (duple.length > 0) return;

      setEdges((eds) =>
        addEdge({ ...params, data: { label: 'test' }, type: 'custom' }, eds)
      );
    },
    [edges, setEdges]
  );

  const onClear = useCallback(() => {
    setNodes([]);
    setEdges([]);
  }, [setNodes, setEdges]);

  const onAdd = useCallback(() => {
    const newNode = {
      id: getNodeId(),
      data: { ...dummyPerson, first_name: getNodeId(), person_id: getNodeId() },
      position: {
        x: Math.random() * window.innerWidth - 100,
        y: Math.random() * window.innerHeight,
      },
      type: 'custom',
      className: styles.personNode,
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  return (
    <div className={styles.flow}>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        connectionLineType={ConnectionLineType.SmoothStep}
        connectionMode={ConnectionMode.Loose}
        fitView
      >
        <Panel position="top-right">
          <button onClick={onClear}>clear</button>
          <button onClick={onAdd}>add node</button>
        </Panel>
      </ReactFlow>
    </div>
  );
}

export default Flow;
