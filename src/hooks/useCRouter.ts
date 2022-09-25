import { useCallback } from "react";
import { useRouter } from "next/router";
import { ParsedUrlQueryInput } from "querystring";

export const useCRouter = () => {
  const router = useRouter();

  const pushHere = useCallback(
    async (newQuery: ParsedUrlQueryInput = {}) => {
      await router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, ...newQuery },
        },
        undefined,
        { scroll: false }
      );
    },
    [router]
  );

  return {
    ...router,
    pushHere,
  };
};
