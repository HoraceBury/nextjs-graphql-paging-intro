import Link from "next/link";

export default function Pagination(props) {
    const { totalPages, currentPage, prevDisabled, nextDisabled } = props;

    // Dynamically calculates the correct URL for next/prev buttons based on current page
    const prevPageUrl = `/recipe/${parseInt(currentPage, 10) - 1}`;

    const nextPageUrl = `/recipe/${parseInt(currentPage, 10) + 1}`;

    return (
        <ol className="pagination">
            <li>
                {prevDisabled && <span>Previous page</span>}
                {!prevDisabled && (
                    <Link href={prevPageUrl}>
                        Previous page
                    </Link>
                )}
            </li>
            <li>
                Page {currentPage} of {totalPages}
            </li>
            <li>
                {nextDisabled && <span>Next page</span>}
                {!nextDisabled && (
                    <Link href={nextPageUrl}>
                        Next page
                    </Link>
                )}
            </li>
        </ol>
    );
}
