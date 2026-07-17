import { fetchOccasions } from "@/services/occasionService";
import OccasionSection from "./OccasionSection";
import type { OccasionItem } from "@/types/occasion";

export default async function OccasionSectionServer() {
  let data: OccasionItem[] = [];

  try {
    data = await fetchOccasions();
  } catch {
    return null;
  }

  return <OccasionSection data={data} />;
}