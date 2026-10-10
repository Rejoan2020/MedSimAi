import { redirect } from 'next/navigation';

// Feedback lives at /cases/<case>/feedback/<attemptId>; without an attempt, go back to the case
export default async function page({ params }) {
  const { id } = await params;
  redirect(`/cases/${id}`);
}
