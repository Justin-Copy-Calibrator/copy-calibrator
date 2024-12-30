export const getVariant = async (sectionId: string) => {
  const response = await fetch(
    `https://copycalibrator.com/api/experiment/${sectionId}`,
    {
      method: 'GET',
    },
  );
  const json = await response.json();
  console.log('json', json);

  return json;
};

interface tagInGoogleAnalyticsProps {
  variant: { id: string };
  experiment: { id: string };
  hasCookie: boolean;
}
export const tagInGoogleAnalytics = ({
  variant,
  experiment,
  hasCookie,
}: tagInGoogleAnalyticsProps) => {
  const expVariantString = `CLBRTR-${experiment.id}-${variant.id}`;

  if (window?.gtag === undefined) {
    console.log(
      'Google tag manager not installed on window, install to continue.',
    );
    return;
  }
  window?.gtag('event', 'experience_impression', {
    exp_variant_string: expVariantString,
  });
};
