import React from 'react';
import { Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';

interface ImageNodeProps {
  node: any;
  isSelected: boolean;
  onSelect: () => void;
  onDragMove: (e: any) => void;
  onDragEnd: (e: any) => void;
  onTransformEnd: (e: any) => void;
}

const ImageNode: React.FC<ImageNodeProps> = ({ node, isSelected, onSelect, onDragMove, onDragEnd, onTransformEnd }) => {
  const [image] = useImage(node.imageUrl || '');
  
  return (
    <KonvaImage
      id={`node-${node.id}`}
      image={image}
      x={node.position.x}
      y={node.position.y}
      width={node.width || 200}
      height={node.height || 200}
      draggable
      onClick={onSelect}
      onTap={onSelect}
      onDragMove={onDragMove}
      onDragEnd={(e) => {
        onDragEnd(e);
      }}
      onTransformEnd={onTransformEnd}
      stroke={isSelected ? '#6B46C1' : 'transparent'}
      strokeWidth={isSelected ? 3 : 0}
    />
  );
};

export default ImageNode;
