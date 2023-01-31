import { Link } from "@remix-run/react";

export default function Paging({
  total,
  current,
}: {
  total: number;
  current: number;
}) {
  if (total <= 1) {
    return <></>;
  }
  return (
    <footer className="footer-center">
      <div className="btn-group">
        {Array.from(Array(total), (_, i) =>
          current === i ? (
            <span key={i} className="btn-active btn-xs btn">
              {i + 1}
            </span>
          ) : (
            <Link
              to={`?p=${i + 1}`}
              prefetch="intent"
              key={i}
              className="btn-xs btn"
            >
              {i + 1}
            </Link>
          )
        )}
      </div>
    </footer>
  );
}
