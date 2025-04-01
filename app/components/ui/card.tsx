export function Card({ children }: { children: React.ReactNode }) {
    return (
      <div className="border rounded-lg p-4 shadow-md">
        {children}
      </div>
    );
  }
  