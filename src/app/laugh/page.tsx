import type { Metadata } from "next";
import Laugh from "./laugh";

export const metadata: Metadata = {
  title: "BWAHAHAHA",
};

export default function LaughPage() {
  return <Laugh />;
}
