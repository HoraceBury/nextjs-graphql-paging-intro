import ContentfulApi from "@/lib/ContentfulApi";
import { Config } from "@/lib/Config";

import PostList from '@/components/PostList';

export async function generateStaticParams({ params }) {
    const totalPages = Math.ceil(10 / Config.pagination.pageSize);

    const paths = [];

    /**
     * Start from page 2, so we don't replicate /recipe
     * which is page 1
     */
    for (let page = 2; page <= totalPages; page++) {
        paths.push({ page: page.toString() });
    }

    return paths;

}

export default async function RecipeIndexPage({params}) {
    const { page } = await params;
    
    const postSummaries = await ContentfulApi.getPaginatedPostSummaries(page);
    const totalPages = Math.ceil(postSummaries.total / Config.pagination.pageSize);

    return (
        <PostList 
            posts={postSummaries} 
            totalPages={totalPages}
            currentPage={page}
       />
    );
}
