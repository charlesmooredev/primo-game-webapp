import { PrimoResults } from "../../../helpers/primoGameRules.ts";
import { useMemo } from "react";

interface Props {
  results: PrimoResults | null;
}

export function PrimoGameResults({ results }: Props) {
  const resultsCls = useMemo(() => {
    return `${
      results === PrimoResults.Won ? "text-green-500" : "text-red-500"
    } font-semibold text-[2.0rem]`;
  }, [results]);

  if (results === null) return;

  return <div className={resultsCls}>{results}</div>;
}
