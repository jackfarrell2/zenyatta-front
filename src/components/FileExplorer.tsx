import React, { useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { ChevronRight, ChevronDown, Folder, File } from 'lucide-react';
import styles from '../styles/FileExplorer.module.css'
import { APITask } from './ProcessDash';
import { useQuery } from '@tanstack/react-query';
import config from '../config'
import { FocusContext, FocusContextType } from './ProcessDash';

const apiUrl = `${config.apiUrl}`
interface FileNode {
    id: string;
    stepNumber: number;
    name: string;
    type: 'file' | 'folder';
    children?: FileNode[];
    parentProcessId: number
}

interface FileNodeProps {
    node: FileNode;
    path?: string;
}

interface FileExplorerProps {
    process: number;
}

function createFileNode(task: APITask): FileNode {
    if (task.isLeaf) {
        return {
            id: task.id,
            stepNumber: task.stepNumber,
            name: task.label,
            type: 'file',
            parentProcessId: task.parentProcessId,
        };
    }

    return {
        id: task.id,
        stepNumber: task.stepNumber,
        name: task.label,
        type: 'folder',
        children: task.subTasks.map((subTask, index) =>
            createFileNode(subTask)
        ),
        parentProcessId: task.parentProcessId
    };
}

const FileExplorer: React.FC<FileExplorerProps> = (props) => {
    const [tasks, setTasks] = React.useState([])
    const [title, setTitle] = React.useState('')
    const { focus, setFocus } = React.useContext<FocusContextType>(FocusContext)
    useQuery(
        ['fileExplorerTasks'],
        async () => {
            const response = await fetch(`${apiUrl}/process/${props.process.toString()}`);
            if (!response.ok) {
                throw new Error('Failed to fetch tasks in the file explorer');
            }
            const res = await response.json();
            return res;
        },
        {
            onSuccess: (res) => {
                setTasks(res.data.tasks);
                setTitle(res.data.title)
            },
        }
    );

    const initialFiles: FileNode[] = tasks.map((task, index) =>
        createFileNode(task)
    );
    React.useEffect(() => {
        if (title) {
            setExpandedFolders(new Set([`/${title}`]));
        }
    }, [title]);

    const rootNode: FileNode = {
        id: 'root-node',
        name: title,
        type: 'folder',
        children: initialFiles,
        parentProcessId: -1,
        stepNumber: -1
    }

    const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set([`/${title}`]));

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
                        if (node.type === 'folder' && node.id !== 'root-node') {
                            // Folders
                            if (focus.process === node.parentProcessId) {
                                // Same process view folder
                                setFocus({
                                    ...focus,
                                    step: node.stepNumber - 1
                                })
                            } else {
                                // Different process view folder
                                setFocus({ process: node.parentProcessId, step: node.stepNumber - 1 })
                            }
                            toggleFolder(currentPath);
                        } else if (node.id === 'root-node') {
                            // Root folder
                            toggleFolder(currentPath);
                        } else {
                            // Files
                            if (focus.process === node.parentProcessId) {
                                // Same process view file
                                setFocus({
                                    ...focus,
                                    step: node.stepNumber - 1
                                })
                            } else {
                                // Different process view file
                                setFocus({ process: node.parentProcessId, step: node.stepNumber - 1 })
                            }
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
        <Box sx={{ height: '100%', width: '100%' }}>
            {tasks.length > 0 ? (
                <div className={styles.fileExplorer}>
                    <div className={styles.container}>
                        <FileNode node={rootNode} />
                    </div>
                </div>
            ) : (
                <Box>
                    <CircularProgress />
                </Box>
            )}
        </Box>
    );
}
export default FileExplorer;