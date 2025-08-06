// app/forbidden/page.tsx (or pages/forbidden.tsx)
import Link from 'next/link';

export default function ForbiddenPage() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>403 - Forbidden</h1>
      <p>You don t have permission to access this page.</p>
      <Link href="/">Return to Home</Link>
    </div>
  );
}