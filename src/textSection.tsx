import { getRandomVariant } from "@/lib/db/queries";
import useGoogleTag from "./useGoogleTag";

export async function TextSection({
  sectionId,
  defaultValue,
}: {
  sectionId: string;
  defaultValue: string;
}) {
  const { experiment, variant, hasCookie } = await getRandomVariant(sectionId);
  useGoogleTag({ variant, experiment, hasCookie });

  if (!experiment || !variant) {
    return defaultValue;
  }
  return variant.text;
}
