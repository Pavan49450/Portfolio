const Box = ({ children, className, onClick, style }) => {
  return (
    <div
      className={`shadow border border-zinc-100 p-4 rounded-md bg-white ${className}`}
      style={style}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Box;
