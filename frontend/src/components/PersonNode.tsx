/* eslint-disable react/function-component-definition */
import { memo, FC } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

const PersonNode: FC<NodeProps> = ({ data, xPos, yPos }) => {
  return (
    <>
      <div>
        <div>
          Name: <strong>{`${data.last_name} ${data.first_name}`}</strong>
        </div>
        <div>
          Description: <strong>{data.description}</strong>
        </div>
        <div>Gender: {data.gender === 'U' ? 'Non-Binary' : data.gender}</div>
        <div>
          Position:{' '}
          <strong>
            {xPos.toFixed(2)}, {yPos.toFixed(2)}
          </strong>
        </div>
      </div>

      <Handle type="source" position={Position.Top} id="a" />
      <Handle type="source" position={Position.Right} id="b" />
      <Handle type="source" position={Position.Bottom} id="c" />
      <Handle type="source" position={Position.Left} id="d" />
    </>
  );
};

export default memo(PersonNode);
