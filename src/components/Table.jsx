import React from 'react';

const Table = ({ title, columns, data }) => {
  return (
    <div className="w-full bg-[#2A2A2A] p-6 sm:p-8 rounded-xl font-sans">
      
      {/* Table Title */}
      {title && (
        <h2 className="mb-10 text-xl font-bold text-white text-start">{title}</h2>
      )}

      {/* Responsive Wrapper */}
      <div className="w-full pb-4 overflow-x-auto">
        <div className="min-w-200"> {/* Forces scroll on small screens */}
          
          {/* Table Header */}
          <div 
            className="grid gap-4 px-6 mb-3"
            style={{ 
              gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` 
            }}
          >
            {columns.map((col, index) => (
              <div 
                key={index} 
                className={`text-sm text-gray-300 font-medium ${col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'}`}
              >
                {col.label}
              </div>
            ))}
          </div>

          {/* Table Body (Rows) */}
          <div className="flex flex-col gap-3">
            {data.map((row, rowIndex) => (
              <div 
                key={rowIndex}
                className="grid gap-4 px-6 py-4 bg-[#1A1A1A] rounded-lg items-center transition-colors hover:bg-[#222222]"
                style={{ 
                  gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` 
                }}
              >
                {columns.map((col, colIndex) => (
                  <div 
                    key={colIndex}
                    className={`text-sm ${col.align === 'center' ? 'flex justify-center' : col.align === 'right' ? 'flex justify-end' : 'flex justify-start'}`}
                  >
                    {/* Use custom render function if provided, otherwise render raw data */}
                    {col.render ? col.render(row[col.key], row) : (
                      <span className="text-gray-300">{row[col.key]}</span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Table;