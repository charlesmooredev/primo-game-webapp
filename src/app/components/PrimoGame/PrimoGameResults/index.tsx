import { PrimoResults } from "../../../helpers/primoGameRules.ts";

interface Props {
  results: PrimoResults | null;
  prizeNumber: number;
}

export function PrimoGameResults({ results, prizeNumber }: Props) {
  if (results === null) return;

  return (
    <div style={{ fontSize: "24px", fontWeight: "bold" }}>
      {results} - {prizeNumber}
    </div>
  );
}
