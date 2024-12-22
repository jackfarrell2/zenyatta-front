import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Folder, FileText, Check, Footprints, Dot } from 'lucide-react';
import styles from '../styles/FileExplorer.module.css'
import { APITask } from './ProcessDash';

interface FileNode {
    name: string;
    type: 'file' | 'folder';
    children?: FileNode[];
}

interface FileNodeProps {
    node: FileNode;
    path?: string;
}

interface FileExplorerProps {
    tasks: APITask[]
}

const FileExplorer: React.FC<FileExplorerProps> = (props) => {
    const initialFiles: FileNode[] = props.tasks.map(task => ({
        name: task.label,
        type: 'file'
    }));

    const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

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
                    onClick={() => node.type === 'folder' && toggleFolder(currentPath)}
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
                        <Dot className={styles.fileIcon} size={16} />
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
                {initialFiles.map((file, index) => (
                    <FileNode
                        key={`/${file.name}-${index}`}
                        node={file}
                    />
                ))}
            </div>
        </div>
    );
};

export default FileExplorer;