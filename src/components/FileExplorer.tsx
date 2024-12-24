import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Folder, File } from 'lucide-react';
import styles from '../styles/FileExplorer.module.css'
import { APITask } from './ProcessDash';

interface FileNode {
    id: number;
    name: string;
    type: 'file' | 'folder';
    children?: FileNode[];
}

interface FileNodeProps {
    node: FileNode;
    path?: string;
}

interface FileExplorerProps {
    tasks: APITask[];
    title: string;
    handleFocus: (nodeToFocusIndex: number) => void;
}

function createFileNode(task: APITask, id: number): FileNode {
    if (task.isLeaf) {
        return {
            id,
            name: task.label,
            type: 'file'
        };
    }

    return {
        id,
        name: task.label,
        type: 'folder',
        children: task.subTasks.map((subTask, index) =>
            createFileNode(subTask, id * 100 + index)  // Using id*100 + index to ensure unique IDs
        )
    };
}

const FileExplorer: React.FC<FileExplorerProps> = (props) => {
    const initialFiles: FileNode[] = props.tasks.map((task, index) =>
        createFileNode(task, index)
    );

    const rootNode: FileNode = {
        id: -1,
        name: props.title,
        type: 'folder',
        children: initialFiles
    }

    const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set([`/${props.title}`]));

    const toggleFolder = (path: string): void => {
        const newExpanded = new Set(expandedFolders);
        if (newExpanded.has(path)) {
            newExpanded.delete(path);
        } else {
            newExpanded.add(path);
        }
        setExpandedFolders(newExpanded);
    };

    const FileNode: React.FC<FileNodeProps> = ({ node, path = '' }) => {
        const currentPath = `${path}/${node.name}`;
        const isExpanded = expandedFolders.has(currentPath);

        return (
            <div className={styles.fileNode}>
                <div
                    className={`${styles.fileRow} ${node.type === 'folder' ? styles.folderName : ''}`}
                    onClick={() => {
                        if (node.type === 'folder') {
                            toggleFolder(currentPath);
                            if (node.id >= 0) {
                                props.handleFocus(node.id);
                            }
                        } else {
                            props.handleFocus(node.id)
                        }
                    }}
                >
                    {node.type === 'folder' && (
                        <span className={styles.chevron}>
                            {isExpanded ? (
                                <ChevronDown size={16} />
                            ) : (
                                <ChevronRight size={16} />
                            )}
                        </span>
                    )}
                    {node.type === 'folder' ? (
                        <Folder className={styles.folderIcon} size={16} />
                    ) : (
                        <File className={styles.fileIcon} size={16} />
                    )}
                    <span className={styles.fileName}>{node.name}</span>
                </div>

                {node.type === 'folder' && isExpanded && node.children && (
                    <div className={styles.childrenContainer}>
                        {node.children.map((child, index) => (
                            <FileNode
                                key={`${currentPath}/${child.name}-${index}`}
                                node={child}
                                path={currentPath}
                            />
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className={styles.fileExplorer}>
            <div className={styles.container}>
                <FileNode node={rootNode} />
            </div>
        </div>
    );
};

export default FileExplorer;