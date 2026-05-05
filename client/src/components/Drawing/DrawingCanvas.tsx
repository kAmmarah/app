import React, { useRef, useState, useEffect } from 'react';
import { Pencil, Eraser, Download, FilePlus, Trash2, Palette } from 'lucide-react';
import { useCanvasStore } from '../../store/canvasStore';
import { v4 as uuidv4 } from 'uuid';
import { useUserStore } from '../../store/userStore';

const DrawingCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const [isEraser, setIsEraser] = useState(false);
  
  // To handle resizing of canvas
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });
  
  const { addNode } = useCanvasStore();
  const { currentUser } = useUserStore();

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        setCanvasSize({ width: clientWidth, height: clientHeight });
        
        // When resizing, we should preserve the drawing, but for simplicity we just set the new dimensions.
        // A full implementation would draw the old canvas onto the new one.
      }
    };
    
    window.addEventListener('resize', updateSize);
    updateSize(); // Initial sizing
    
    // Set white background initially
    setTimeout(() => {
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
      }
    }, 100);

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;
    
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;
    
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    ctx.lineTo(x, y);
    ctx.strokeStyle = isEraser ? '#ffffff' : color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const saveAsImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `drawing-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
  };

  const saveAsStickyNote = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const dataUrl = canvas.toDataURL('image/png');
    
    addNode({
      id: uuidv4(),
      type: 'image',
      position: { x: 0, y: 0 },
      content: 'Drawing',
      author: currentUser?.name || 'User',
      createdAt: new Date(),
      updatedAt: new Date(),
      acl: { locked: false, allowedRoles: ['lead', 'contributor', 'viewer'] },
      imageUrl: dataUrl,
    });
    
    alert('Drawing saved as a Sticky Note!');
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 rounded-2xl overflow-hidden shadow-inner border border-gray-200">
      {/* Toolbar */}
      <div className="bg-white p-4 border-b border-gray-200 flex flex-wrap items-center gap-4 z-10 shadow-sm">
        <div className="flex items-center space-x-2 bg-gray-100 p-1.5 rounded-lg">
          <button 
            onClick={() => setIsEraser(false)}
            className={`p-2 rounded-md transition-colors ${!isEraser ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:bg-gray-200'}`}
            title="Pencil"
          >
            <Pencil size={20} />
          </button>
          <button 
            onClick={() => setIsEraser(true)}
            className={`p-2 rounded-md transition-colors ${isEraser ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:bg-gray-200'}`}
            title="Eraser"
          >
            <Eraser size={20} />
          </button>
        </div>

        <div className="h-8 w-px bg-gray-300 mx-2 hidden sm:block"></div>

        <div className="flex items-center space-x-3">
          <div className="relative group cursor-pointer flex items-center space-x-2" title="Color Picker">
            <Palette size={20} className="text-gray-600" />
            <input 
              type="color" 
              value={color}
              onChange={(e) => {
                setColor(e.target.value);
                setIsEraser(false);
              }}
              className="w-8 h-8 p-0 border-0 rounded-md cursor-pointer appearance-none bg-transparent overflow-hidden"
            />
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-500">Size</span>
            <input 
              type="range" 
              min="1" 
              max="50" 
              value={brushSize}
              onChange={(e) => setBrushSize(parseInt(e.target.value))}
              className="w-24 accent-blue-600"
            />
            <span className="text-xs font-medium text-gray-400 w-4">{brushSize}</span>
          </div>
        </div>

        <div className="flex-1"></div>

        <div className="flex items-center space-x-2">
          <button 
            onClick={clearCanvas}
            className="flex items-center space-x-1.5 px-3 py-2 text-sm text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors font-medium"
          >
            <Trash2 size={16} />
            <span className="hidden sm:inline">Clear</span>
          </button>
          
          <button 
            onClick={saveAsImage}
            className="flex items-center space-x-1.5 px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors font-medium shadow-sm"
          >
            <Download size={16} />
            <span className="hidden sm:inline">Download</span>
          </button>
          
          <button 
            onClick={saveAsStickyNote}
            className="flex items-center space-x-1.5 px-3 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-medium shadow-sm"
          >
            <FilePlus size={16} />
            <span className="hidden sm:inline">Save as Sticky</span>
          </button>
        </div>
      </div>

      {/* Canvas Container */}
      <div 
        ref={containerRef}
        className="flex-1 w-full relative bg-gray-100 overflow-hidden cursor-crosshair"
      >
        <canvas
          ref={canvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="absolute top-0 left-0 bg-white shadow-sm"
          style={{ touchAction: 'none' }}
        />
      </div>
    </div>
  );
};

export default DrawingCanvas;
