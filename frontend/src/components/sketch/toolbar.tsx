const ToolBar = ({ actions }: { actions: React.ReactNode[] }) => {
  return (
    <div className="border-b border-border px-6 py-3 flex items-center gap-2 bg-card">
      <div className="flex items-center gap-1">
        {actions.map((action) => action)}
      </div>

      <div className="ml-auto flex items-center gap-2">
        <label className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Brush Size:</span>
          <input
            type="range"
            min="1"
            max="20"
            defaultValue="5"
            className="w-24"
          />
        </label>
      </div>
    </div>
  );
};

export default ToolBar;
