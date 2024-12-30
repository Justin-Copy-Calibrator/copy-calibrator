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
    // TODO if cookie then get the variant directly
    getVariant(sectionId)
      .then(({ experiment, variant, hasCookie }) => {
        tagInGoogleAnalytics({
          variant,
          experiment,
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
      .catch(() => {
        setText(defaultValue);
      })
      .finally(() => {});
  }, []);

  return <>{text}</>;
};
