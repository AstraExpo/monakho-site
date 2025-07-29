// app/unauthorized/page.tsx
export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center">
      <div>
        <h1 className="text-3xl font-bold text-red-500">Access Denied</h1>
        <p className="mt-2">You do not have permission to access this page.</p>
      </div>
    </div>
  );
}
