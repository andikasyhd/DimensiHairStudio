export default function PageHeader({ title, breadcrumb, children }) {
    
    // Fungsi bantu: jika breadcrumb berupa array, render per item
    const renderBreadcrumb = () => {
      if (typeof breadcrumb === "string") {
        return (
          <span id="breadcrumb-current" className="text-gray-500">
            {breadcrumb}
          </span>
        );
      }
  
      if (Array.isArray(breadcrumb)) {
        return breadcrumb.map((item, index) => (
          <span key={index} className="flex items-center space-x-1">
            {index > 0 && (
              <span id="breadcrumb-separator" className="text-gray-500 mx-1">/</span>
            )}
            <span
              className={
                index === breadcrumb.length - 1
                  ? "text-gray-500"
                  : "text-gray-500"
              }
            >
              {item}
            </span>
          </span>
        ));
      }
  
      return null;
    };
  
    return (
      <div id="pageheader-container" className="flex items-center justify-between p-4">
        {/* Sisi Kiri */}
        <div id="pageheader-left" className="flex flex-col">
          <span id="pageheader-title" className="text-3xl font-semibold">
            {title}
          </span>
          <div id="breadcrumb-links" className="flex items-center font-medium space-x-2 mt-2">
            {renderBreadcrumb()}
          </div>
        </div>
  
        {/* Sisi Kanan */}
        <div id="action-button">
          {children}
        </div>
      </div>
    );
  }
  