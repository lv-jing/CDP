import React from 'react';
import { Skeleton } from 'antd';

export default function CustomizeSkeleton() {
  return (
    <div className="vpadding-level-1">
      <div className="content-container vmargin-level-4 hpadding-level-4 vpadding-level-4">
        <Skeleton active />
      </div>
      <div className="content-container vmargin-level-4 hpadding-level-4 vpadding-level-4">
        <Skeleton active />
      </div>
    </div>
  );
}
