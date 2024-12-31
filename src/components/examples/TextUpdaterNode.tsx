import React from 'react';
import { Handle, Position } from '@xyflow/react';

const handleStyle = { left: 10 };

interface TextUpdaterNodeProps {
    data: {
        label: string;
    };
    isConnectable: boolean;
}

const TextUpdaterNode = ({ data, isConnectable }: TextUpdaterNodeProps) => {
    const onChange = React.useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
        console.log(evt.target.value);
    }, []);

    return (
        <div className='text-updater-node'>
            <Handle type='target' position={Position.Top} isConnectable={isConnectable} />
            <div>
                <label htmlFor='text'>Text:</label>
                <input id='text' name='text' onChange={onChange} className='nodrag' />
            </div>
            <Handle
                type='source'
                position={Position.Bottom}
                id='a'
                style={handleStyle}
                isConnectable={isConnectable}
            />
        </div>
    )

}

export default TextUpdaterNode