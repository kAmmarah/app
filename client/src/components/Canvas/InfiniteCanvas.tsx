import React, { useState } from 'react';
import { Stage, Layer, Rect, Text, Circle } from 'react-konva';
import { useCanvasStore } from '../../store/canvasStore';
import { v4 as uuidv4 } from 'uuid';

interface InfiniteCanvasProps {
  createNode: (data: any) => void;
  updateNodeData: (nodeId: string, updates: any) => void;
  lockNode: (nodeId: string, locked: boolean) => void;
  sendCursorMove: (x: number, y: number) => void;
}

const InfiniteCanvas: React.FC<InfiniteCanvasProps> = ({
  createNode,
  sendCursorMove
}) => {
  const { nodes, selectedNodeId, setSelectedNode } = useCanvasStore();
  const [tool, setTool] = useState<'sticky' | 'text'>('sticky');
  const [stagePos, setStagePos] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const handleStageClick = (e: any) => {
    if (e.target === e.target.getStage() || e.target.getClassName() === 'Rect') {
      const stage = e.target.getStage();
      const pointer = stage.getPointerPosition();
      
      if (pointer && (tool === 'sticky' || tool === 'text')) {
        const newNode = {
          id: uuidv4(),
          type: tool,
          position: {
            x: (pointer.x - stagePos.x) / zoom,
            y: (pointer.y - stagePos.y) / zoom
          },
          content: '',
          acl: { locked: false, allowedRoles: ['lead', 'contributor', 'viewer'] }
        };
        
        createNode(newNode);
      }
    }
  };

  const colors = ['#FFEB3B', '#4CAF50', '#2196F3', '#FF9800', '#E91E63', '#9C27B0'];

  return (
    <div className="relative w-full h-full bg-gray-100">
      <div className="absolute top-4 left-4 z-10 bg-white rounded-lg shadow-lg p-2 flex space-x-2">
        <button
          onClick={() => setTool('sticky')}
          className={`px-3 py-1 rounded ${tool === 'sticky' ? 'bg-purple-600 text-white' : 'bg-gray-100'}`}
        >
          Sticky Note
        </button>
        <button
          onClick={() => setTool('text')}
          className={`px-3 py-1 rounded ${tool === 'text' ? 'bg-purple-600 text-white' : 'bg-gray-100'}`}
        >
          Text
        </button>
      </div>

      <Stage
        width={window.innerWidth}
        height={window.innerHeight - 60}
        onClick={handleStageClick}
        onWheel={(e) => {
          const scaleBy = 1.05;
          const stage = e.target.getStage();
          
          if (stage) {
            const oldScale = zoom;
            const pointer = stage.getPointerPosition();

            if (pointer) {
              const mousePointTo = {
                x: (pointer.x - stagePos.x) / oldScale,
                y: (pointer.y - stagePos.y) / oldScale,
              };

              const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;
              
              setZoom(newScale);
              setStagePos({
                x: pointer.x - mousePointTo.x * newScale,
                y: pointer.y - mousePointTo.y * newScale,
              });
            }
          }
        }}
        onMouseMove={(e) => {
          const stage = e.target.getStage();
          if (stage) {
            const pointer = stage.getPointerPosition();
            if (pointer) {
              sendCursorMove(pointer.x, pointer.y);
            }
          }
        }}
      >
        <Layer>
          {nodes.map((node, i) => {
            const color = colors[i % colors.length];
            const isSelected = selectedNodeId === node.id;
            
            return (
              <React.Fragment key={node.id}>
                <Rect
                  x={node.position.x}
                  y={node.position.y}
                  width={200}
                  height={150}
                  fill={color}
                  stroke={isSelected ? '#6B46C1' : 'transparent'}
                  strokeWidth={isSelected ? 3 : 0}
                  shadowBlur={10}
                  shadowOpacity={0.2}
                  cornerRadius={8}
                  onClick={() => setSelectedNode(node.id)}
                />
                <Text
                  x={node.position.x + 10}
                  y={node.position.y + 10}
                  width={180}
                  height={130}
                  text={node.content || 'Double-click to edit...'}
                  fontSize={14}
                  fontFamily="Arial"
                  fill="#333"
                  editable
                  onDoubleClick={() => setSelectedNode(node.id)}
                />
                {node.acl.locked && (
                  <Circle
                    x={node.position.x + 180}
                    y={node.position.y + 10}
                    radius={8}
                    fill="#FF0000"
                  />
                )}
              </React.Fragment>
            );
          })}
        </Layer>
      </Stage>
      
      <div className="absolute bottom-4 right-4 bg-white px-3 py-1 rounded-lg shadow text-sm text-gray-600">
        Zoom: {Math.round(zoom * 100)}%
      </div>
    </div>
  );
};

export default InfiniteCanvas;
