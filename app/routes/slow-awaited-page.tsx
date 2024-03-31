import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

export async function loader() {
  const delayDuration = 5000;
  await new Promise((resolve) => setTimeout(resolve, delayDuration));

  return json({
    message: `This message was delayed by ${Math.floor(
      delayDuration / 1000
    )} seconds.`,
  });
}

export default function SlowAwaitedPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <p>{data.message}</p>
      <Link to="/">Home!</Link>
    </div>
  );
}
