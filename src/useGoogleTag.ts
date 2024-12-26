"use client";

import { Fragment, useEffect } from "react";

export default function useGoogleTag({ variant, experiment, hasCookie }) {
  const expVariantString = `CLBRTR-${experiment.id}-${variant.id}`;
  useEffect(() => {
    window?.gtag("event", "experience_impression", {
      exp_variant_string: expVariantString,
    });

    if (!hasCookie) {
      console.log("Cookie not set, setting: ", expVariantString);

      fetch("/api/calibrator", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ experiment, variant, expVariantString }),
      }).then(() => {
        console.log("cookie logged POST");
      });
    }
  }, []);
}
