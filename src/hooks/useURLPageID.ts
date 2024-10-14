import { useSearchParams } from "react-router-dom";

export function useURLPageID() {
  const [searchParams] = useSearchParams();
  const pageID = Number(searchParams.get("page"));

  return { pageID };
}
