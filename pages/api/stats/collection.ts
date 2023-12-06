import { gql } from "@apollo/client";
import client from "../apollo";

export default async function collection(req: Request, res: Response) {
  const resp = await client.query({
    query: gql`
    query CollectionStats($slugs: [String!], $sortBy: String, $page: Int, $limit: Int, $slugsDisplay: [String!]) {
  allCollections(slugs: $slugs, sortBy: $sortBy, page: $page, limit: $limit, slugsDisplay: $slugsDisplay) {
    total
    collections {
      slug
      statsV2 {
        floor1h
        floor24h
        floor7d
        buyNowPrice
        numListed
        numMints
        sales1h
        sales24h
        sales7d
        volume1h
        volume7d
        volume24h
      }
      name
      firstListDate
      slugMe
    }
  }
}
    `,
    variables: {
      slugsDisplay: ["doge_"],
    },
  });

  const data = resp?.data.allCollections?.collections[0].statsV2;
  return (
    res
      // @ts-ignore
      .status(200)
      .json({ ...data, loading: resp.loading, error: resp.error })
  );
}
