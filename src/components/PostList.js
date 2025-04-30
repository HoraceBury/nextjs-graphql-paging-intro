import Link from "next/link";
import Pagination from "./Pagination";

export default function PostList(props) {
  const { posts, currentPage, totalPages } = props;

  {/* Calculates whther the next/previous pagination buttons should be disabled */}
  const nextDisabled = parseInt(currentPage, 10) === parseInt(totalPages, 10);
  const prevDisabled = parseInt(currentPage, 10) === 1;

  return (
    <>
      <ol className="postlist">
        {posts.items.map((post) => (
          <li key={post.sys.id}>
            <article>
              <Link href='#'>
                <h2>{post.title}</h2>
              </Link>
            </article>
          </li>
        ))}
      </ol>

      {/* Using a Pagination component to navigate to different pages */}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        nextDisabled={nextDisabled}
        prevDisabled={prevDisabled}
      />
    </>
  );
}
