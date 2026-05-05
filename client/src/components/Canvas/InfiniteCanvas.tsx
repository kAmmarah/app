import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Rect, Text, Circle, Transformer, Line } from 'react-konva';
import { useCanvasStore } from '../../store/canvasStore';
import { v4 as uuidv4 } from 'uuid';
import ImageNode from './ImageNode';

interface InfiniteCanvasProps {
  createNode: (data: any) => void;
  updateNodeData: (nodeId: string, updates: any) => void;
  lockNode: (nodeId: string, locked: boolean) => void;
  sendCursorMove: (x: number, y: number) => void;
}

const InfiniteCanvas: React.FC<InfiniteCanvasProps> = ({
  createNode,
  updateNodeData,
  sendCursorMove
}) => {
  const { nodes, selectedNodeId, setSelectedNode } = useCanvasStore();
  const [tool, setTool] = useState<'sticky' | 'text' | 'image' | 'select'>('select');
  const [stagePos, setStagePos] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [guidelines, setGuidelines] = useState<any[]>([]);

  const stageRef = useRef<any>(null);
  const layerRef = useRef<any>(null);
  const trRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Attach transformer to selected node
  useEffect(() => {
    if (selectedNodeId && trRef.current && layerRef.current) {
      const node = layerRef.current.findOne(`#node-${selectedNodeId}`);
      if (node) {
        trRef.current.nodes([node]);
        trRef.current.getLayer().batchDraw();
      }
    } else if (trRef.current) {
      trRef.current.nodes([]);
    }
  }, [selectedNodeId, nodes]);

  const handleStageClick = (e: any) => {
    if (e.target === e.target.getStage()) {
      setSelectedNode(null);
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
          width: tool === 'sticky' ? 200 : 150,
          height: tool === 'sticky' ? 150 : 50,
          acl: { locked: false, allowedRoles: ['lead', 'contributor', 'viewer'] }
        };
        createNode(newNode);
        setTool('select');
      }
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        
        // Let's create an image node in the center of the viewport
        const stage = stageRef.current;
        let x = -stagePos.x / zoom + 100;
        let y = -stagePos.y / zoom + 100;

        if (stage) {
          x = (-stagePos.x + stage.width() / 2) / zoom - 100;
          y = (-stagePos.y + stage.height() / 2) / zoom - 100;
        }

        const newNode = {
          id: uuidv4(),
          type: 'image',
          position: { x, y },
          content: '',
          imageUrl: dataUrl,
          width: 200, // Default, will resize based on aspect ratio in a real app
          height: 200,
          acl: { locked: false, allowedRoles: ['lead', 'contributor', 'viewer'] }
        };
        createNode(newNode);
        setTool('select');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExport = () => {
    if (selectedNodeId) {
      // Export selected
      const node = layerRef.current.findOne(`#node-${selectedNodeId}`);
      if (node) {
        const dataURL = node.toDataURL({ pixelRatio: 2 });
        downloadURI(dataURL, `export-${selectedNodeId}.png`);
      }
    } else {
      // Export whole canvas
      if (stageRef.current) {
        const dataURL = stageRef.current.toDataURL({ pixelRatio: 2 });
        downloadURI(dataURL, 'canvas-export.png');
      }
    }
  };

  const downloadURI = (uri: string, name: string) => {
    const link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Snapping logic
  const getLineGuideStops = (skipShape: any) => {
    const vertical: number[] = [0]; // can snap to origin
    const horizontal: number[] = [0];

    nodes.forEach((node) => {
      if (node.id === skipShape.attrs.id.replace('node-', '')) return;
      const box = {
        x: node.position.x,
        y: node.position.y,
        width: node.width || 200,
        height: node.height || 150
      };
      vertical.push(box.x, box.x + box.width, box.x + box.width / 2);
      horizontal.push(box.y, box.y + box.height, box.y + box.height / 2);
    });
    return { vertical, horizontal };
  };

  const getObjectSnappingEdges = (node: any) => {
    const box = node.getClientRect();
    const absPos = node.absolutePosition();
    return {
      vertical: [
        { guide: Math.round(box.x), offset: Math.round(absPos.x - box.x), snap: 'start' },
        { guide: Math.round(box.x + box.width / 2), offset: Math.round(absPos.x - box.x - box.width / 2), snap: 'center' },
        { guide: Math.round(box.x + box.width), offset: Math.round(absPos.x - box.x - box.width), snap: 'end' },
      ],
      horizontal: [
        { guide: Math.round(box.y), offset: Math.round(absPos.y - box.y), snap: 'start' },
        { guide: Math.round(box.y + box.height / 2), offset: Math.round(absPos.y - box.y - box.height / 2), snap: 'center' },
        { guide: Math.round(box.y + box.height), offset: Math.round(absPos.y - box.y - box.height), snap: 'end' },
      ],
    };
  };

  const getGuides = (lineGuideStops: any, itemBounds: any) => {
    const resultV: any[] = [];
    const resultH: any[] = [];
    const GUIDELINE_OFFSET = 5;

    lineGuideStops.vertical.forEach((lineGuide: number) => {
      itemBounds.vertical.forEach((itemBound: any) => {
        const diff = Math.abs(lineGuide - itemBound.guide);
        if (diff < GUIDELINE_OFFSET) {
          resultV.push({ lineGuide: lineGuide, diff: diff, snap: itemBound.snap, offset: itemBound.offset });
        }
      });
    });

    lineGuideStops.horizontal.forEach((lineGuide: number) => {
      itemBounds.horizontal.forEach((itemBound: any) => {
        const diff = Math.abs(lineGuide - itemBound.guide);
        if (diff < GUIDELINE_OFFSET) {
          resultH.push({ lineGuide: lineGuide, diff: diff, snap: itemBound.snap, offset: itemBound.offset });
        }
      });
    });

    const guides = [];
    const minV = resultV.sort((a, b) => a.diff - b.diff)[0];
    const minH = resultH.sort((a, b) => a.diff - b.diff)[0];

    if (minV) {
      guides.push({ lineGuide: minV.lineGuide, offset: minV.offset, orientation: 'V', snap: minV.snap });
    }
    if (minH) {
      guides.push({ lineGuide: minH.lineGuide, offset: minH.offset, orientation: 'H', snap: minH.snap });
    }
    return guides;
  };

  const handleDragMove = (e: any) => {
    const node = e.target;
    const lineGuideStops = getLineGuideStops(node);
    const itemBounds = getObjectSnappingEdges(node);
    const guides = getGuides(lineGuideStops, itemBounds);

    if (!guides.length) {
      setGuidelines([]);
      return;
    }

    const absPos = node.absolutePosition();
    guides.forEach((lg) => {
      if (lg.orientation === 'V') {
        absPos.x = lg.lineGuide + lg.offset;
      } else if (lg.orientation === 'H') {
        absPos.y = lg.lineGuide + lg.offset;
      }
    });

    node.absolutePosition(absPos);
    setGuidelines(guides);
  };

  const handleDragEnd = (e: any) => {
    setGuidelines([]);
    const id = e.target.id().replace('node-', '');
    if (id) {
      updateNodeData(id, {
        position: { x: e.target.x(), y: e.target.y() }
      });
    }
  };

  const handleTransformEnd = (e: any) => {
    const node = e.target;
    const id = node.id().replace('node-', '');
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    node.scaleX(1);
    node.scaleY(1);

    updateNodeData(id, {
      position: { x: node.x(), y: node.y() },
      width: Math.max(5, node.width() * scaleX),
      height: Math.max(5, node.height() * scaleY),
    });
  };

  const colors = ['#FFEB3B', '#4CAF50', '#2196F3', '#FF9800', '#E91E63', '#9C27B0'];

  return (
    <div className="relative w-full h-full bg-gray-100 overflow-hidden">
      <div className="absolute top-4 left-4 z-10 bg-white rounded-lg shadow-lg p-2 flex space-x-2">
        <button
          onClick={() => setTool('select')}
          className={`px-3 py-1 text-sm rounded ${tool === 'select' ? 'bg-purple-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
        >
          Select
        </button>
        <button
          onClick={() => setTool('sticky')}
          className={`px-3 py-1 text-sm rounded ${tool === 'sticky' ? 'bg-purple-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
        >
          Sticky Note
        </button>
        <button
          onClick={() => {
            setTool('image');
            fileInputRef.current?.click();
          }}
          className={`px-3 py-1 text-sm rounded ${tool === 'image' ? 'bg-purple-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
        >
          Image
        </button>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleImageUpload}
        />
        <div className="w-px bg-gray-300 mx-2" />
        <button
          onClick={handleExport}
          className="px-3 py-1 text-sm rounded bg-gray-100 hover:bg-gray-200 text-gray-800"
        >
          Export
        </button>
      </div>

      <Stage
        width={window.innerWidth}
        height={window.innerHeight - 60}
        ref={stageRef}
        onClick={handleStageClick}
        x={stagePos.x}
        y={stagePos.y}
        scaleX={zoom}
        scaleY={zoom}
        onWheel={(e) => {
          e.evt.preventDefault();
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
        <Layer ref={layerRef}>
          {nodes.map((node, i) => {
            const isSelected = selectedNodeId === node.id;

            if (node.type === 'image') {
              return (
                <ImageNode
                  key={node.id}
                  node={node}
                  isSelected={isSelected}
                  onSelect={() => setSelectedNode(node.id)}
                  onDragMove={handleDragMove}
                  onDragEnd={handleDragEnd}
                  onTransformEnd={handleTransformEnd}
                />
              );
            }

            const color = colors[i % colors.length];
            const w = node.width || 200;
            const h = node.height || 150;

            return (
              <React.Fragment key={node.id}>
                {node.type === 'sticky' ? (
                  <Rect
                    id={`node-${node.id}`}
                    x={node.position.x}
                    y={node.position.y}
                    width={w}
                    height={h}
                    fill={color}
                    stroke={isSelected ? '#6B46C1' : 'transparent'}
                    strokeWidth={isSelected ? 3 : 0}
                    shadowBlur={10}
                    shadowOpacity={0.2}
                    cornerRadius={8}
                    draggable
                    onClick={() => setSelectedNode(node.id)}
                    onDragMove={handleDragMove}
                    onDragEnd={handleDragEnd}
                    onTransformEnd={handleTransformEnd}
                  />
                ) : (
                  <Rect
                    id={`node-${node.id}`}
                    x={node.position.x}
                    y={node.position.y}
                    width={w}
                    height={h}
                    fill="transparent"
                    stroke={isSelected ? '#6B46C1' : 'transparent'}
                    strokeWidth={isSelected ? 3 : 0}
                    draggable
                    onClick={() => setSelectedNode(node.id)}
                    onDragMove={handleDragMove}
                    onDragEnd={handleDragEnd}
                    onTransformEnd={handleTransformEnd}
                  />
                )}
                
                <Text
                  x={node.position.x + 10}
                  y={node.position.y + 10}
                  width={w - 20}
                  height={h - 20}
                  text={node.content || 'Double-click to edit...'}
                  fontSize={14}
                  fontFamily="Arial"
                  fill="#333"
                  listening={false} // pass clicks to the rect
                />
                
                {node.acl.locked && (
                  <Circle
                    x={node.position.x + w - 20}
                    y={node.position.y + 10}
                    radius={8}
                    fill="#FF0000"
                  />
                )}
              </React.Fragment>
            );
          })}
          
          <Transformer ref={trRef} boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 20 || newBox.height < 20) {
              return oldBox;
            }
            return newBox;
          }} />

          {/* Guidelines */}
          {guidelines.map((lg, i) => {
            if (lg.orientation === 'V') {
              return (
                <Line
                  key={i}
                  points={[lg.lineGuide, -6000, lg.lineGuide, 6000]}
                  stroke="red"
                  strokeWidth={1}
                  dash={[4, 4]}
                />
              );
            } else {
              return (
                <Line
                  key={i}
                  points={[-6000, lg.lineGuide, 6000, lg.lineGuide]}
                  stroke="red"
                  strokeWidth={1}
                  dash={[4, 4]}
                />
              );
            }
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
