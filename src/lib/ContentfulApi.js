import { Config } from "@/lib/Config";

export default class ContentfulApi {
  static async callContentful(query) {
    const fetchUrl = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`;

    const fetchOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    };

    try {
      const data = await fetch(fetchUrl, fetchOptions).then((response) =>
        response.json(),
      );
      return data;
    } catch (error) {
      throw new Error("Could not fetch data from Contentful!");
    }
  }

  static async getPaginatedPostSummaries(page) {
    // Build the GraphQL query
    const skip = Config.pagination.pageSize * (page - 1);

    const query = `{
      recipeCollection(limit: ${Config.pagination.pageSize}, skip: ${skip}) {
        total
        items {
          sys {
            id
          }
          title
        }
      }
    }`;

    // Call out to the API
    const response = await this.callContentful(query);

    const paginatedPostSummaries = response.data.recipeCollection
      ? response.data.recipeCollection
      : { total: 0, items: [] };

    return paginatedPostSummaries;
  }
}
