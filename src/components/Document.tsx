import React from 'react';
import { FC } from 'react';
import Editor from './Editor';
import '../styles/Document.css'

const Document: FC = () => {
    return (
        <div className='document-content'>
            <Editor />
        </div>
    )
}

export default Document