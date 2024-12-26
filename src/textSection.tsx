import React from 'react';
import { useEffect, useState } from 'react';
import { getVariant, tagInGoogleAnalytics } from './utils';

interface TextSectionProps {
  sectionId: string;
  defaultValue: string;
}

export const TextSection: React.FC<TextSectionProps> = ({
  sectionId,
  defaultValue,
}: TextSectionProps) => {
  const [text, setText] = useState('');

  useEffect(() => {
    getVariant(sectionId)
      .then(({ experiment, variant, hasCookie }) => {
        tagInGoogleAnalytics({
          variantId: variant.id,
          experimentId: experiment.id,
          hasCookie,
        });

        if (!experiment || !variant) {
          console.log(
            'No experiment active, returning section default: ',
            defaultValue,
          );
          setText(defaultValue);
        }
        setText(variant.text);
      })
      .catch(() => {})
      .finally(() => {});
  }, []);

  return <>{text}</>;
};
