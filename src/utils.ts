export const getVariant = async (sectionId: string) => {
  const response = await fetch(
    `https://copycalibrator.com/api/experiment?section_id=${sectionId}`,
    {
      method: 'GET',
    },
  );
  const json = await response.json();
  console.log('json', json);

  return json;
};

interface tagInGoogleAnalyticsProps {
  variantId: string;
  experimentId: string;
  hasCookie: boolean;
}
export const tagInGoogleAnalytics = ({
  variantId,
  experimentId,
  hasCookie,
}: tagInGoogleAnalyticsProps) => {
  const expVariantString = `CLBRTR-${experimentId}-${variantId}`;

  if (window?.gtag === undefined) {
    console.log(
      'Google tag manager not installed on window, install to continue.',
    );
    return;
  }
  window?.gtag('event', 'experience_impression', {
    exp_variant_string: expVariantString,
  });

  if (!hasCookie) {
    console.log('Cookie not set, setting: ', expVariantString);

    fetch('/api/experiment', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ experimentId, variantId, expVariantString }),
    }).then(() => {
      console.log('cookie logged POST');
    });
  }
};
