const CustomScrollbar = ({ children }) => {
    return (
      <div className="relative z-50 h-screen overflow-y-scroll 
        scrollbar 
        scrollbar-w-3 
        scrollbar-track-[#0F1626]/20 
        scrollbar-thumb-[#0F1626]/60 
        hover:scrollbar-thumb-[#FF533D] 
        scrollbar-thumb-rounded-full
        scrollbar-track-rounded-full">
        {children}
      </div>
    );
  };
  
  
  
export default CustomScrollbar;
  