const SketchCanvas = () => {
  return (
    <div className="flex-1 bg-card border-b border-border flex items-center justify-center">
      <div className="w-full h-full bg-white rounded-none flex items-center justify-center">
        <div className="text-center">
          <div className="w-32 h-32 bg-muted rounded-lg mx-auto mb-4 flex items-center justify-center">
            <span className="text-muted-foreground text-sm">Canvas Area</span>
          </div>
          <p className="text-muted-foreground text-sm">
            Your drawing will appear here
          </p>
        </div>
      </div>
    </div>
  );
};

export default SketchCanvas;
