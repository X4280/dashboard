import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
const GridLayout = dynamic(
  () => import('react-grid-layout').then(mod => mod.WidthProvider(mod.Responsive)),
  { ssr: false }
);

export default function Home() {
  const defaultLayout = [
    { i: 'a', x: 0, y: 0, w: 4, h: 2 },
    { i: 'b', x: 4, y: 0, w: 4, h: 2 },
    { i: 'c', x: 8, y: 0, w: 4, h: 2 },
  ];
  const [layout, setLayout] = useState(defaultLayout);

  useEffect(() => {
    const saved = window.localStorage.getItem('dashboard-layout');
    if (saved) setLayout(JSON.parse(saved));
  }, []);

  const onLayoutChange = nl => {
    setLayout(nl);
    window.localStorage.setItem('dashboard-layout', JSON.stringify(nl));
  };

  return (
    <div className="container">
      <h1>My Draggable Dashboard</h1>
      <GridLayout
        className="layout"
        layouts={{ lg: layout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4 }}
        rowHeight={30}
        isDraggable
        isResizable
        margin={[10, 10]}
        onLayoutChange={onLayoutChange}
      >
        <div key="a" className="widget">Widget A</div>
        <div key="b" className="widget">Widget B</div>
        <div key="c" className="widget">Widget C</div>
      </GridLayout>
    </div>
  );
}
