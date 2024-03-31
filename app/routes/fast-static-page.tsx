import { Link } from "@remix-run/react";

export default function FastStaticPage() {
  return (
    <div>
      <p>FastStaticPage</p>
      <Link to="/">Home!</Link>
    </div>
  );
}
