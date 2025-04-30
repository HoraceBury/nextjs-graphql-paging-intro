import ContentfulApi from "@/lib/ContentfulApi";
import { Config } from "@/lib/Config";

import PostList from '@/components/PostList';

// This is run once at build time and it generates all the static routes for every page needed, based on the total number of pages
export async function generateStaticParams({ params }) {
    const totalPages = Math.ceil(10 / Config.pagination.pageSize);

    const paths = [];

    for (let page = 1; page <= totalPages; page++) {
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
