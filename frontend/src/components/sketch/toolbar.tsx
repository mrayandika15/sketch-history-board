const ToolBar = ({ actions }: { actions: React.ReactNode[] }) => {
  return (
    <div className="border-b border-border px-6 py-3 flex items-center gap-2 bg-card">
      <div className="flex items-center gap-1">
        {actions.map((action, idx) => (
          <span key={`action-${idx}`}>{action}</span>
        ))}
      </div>
    </div>
  );
};

export default ToolBar;
