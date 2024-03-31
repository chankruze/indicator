import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Indicator</h1>
      <ul>
        <li>
          <Link to="fast-static-page">Fast static page ;)</Link>
        </li>
        <li>
          <Link to="slow-awaited-page">Slow awaited page! :(</Link>
        </li>
      </ul>
    </div>
  );
}
