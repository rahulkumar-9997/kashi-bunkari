import TermsAndConditionsPage from "./TermsAndConditionsPage";

export const metadata = {
  title: "Terms & Conditions | Kasibunkari - Premium Ethnic Wear",
  description:
    "Read Kasibunkari's terms and conditions, including product terms, website usage, disclaimers, and liability limitations.",
   openGraph: {
    title: "Terms & Conditions | Kasibunkari",
    description:
      "Read our terms and conditions for using the Kasibunkari website and purchasing products.",
    url: "https://kasibunkari.com/terms-and-conditions",
    siteName: "Kasibunkari",
    locale: "en_IN",
    type: "website",
  },
};

export default function TermsAndConditions() {
  return <TermsAndConditionsPage />;
}
