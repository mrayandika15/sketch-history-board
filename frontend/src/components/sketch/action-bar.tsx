const ActionBar = ({ actions }: { actions: React.ReactNode[] }) => {
  return (
    <div className="border-t border-border px-6 py-4 flex items-center justify-between bg-card">
      <div className="flex gap-2">
        {actions.map((action) => (
          <p key={`action-bar-${action}`}>{action}</p>
        ))}
      </div>
    </div>
  );
};

export default ActionBar;
