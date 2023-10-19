const Loader = () => {
  return (
    <div className="h-screen bg-black/10 w-screen fixed top-0 left-0 flex items-center justify-center z-50">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
