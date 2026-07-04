import ShippingPolicy from "./ShippingPolicy";

export const metadata = {
  title: "Shipping Policy | Kasibunkari - Premium Ethnic Wear",
  description:
    "Learn about Kasibunkari's shipping policy, delivery timelines, order tracking, and damaged package policies. We deliver premium ethnic wear across India.",  
  openGraph: {
    title: "Shipping Policy | Kasibunkari",
    description:
      "Learn about our shipping policy, delivery timelines, and order tracking.",
    url: "https://kasibunkari.com/shipping-policy",
    siteName: "Kasibunkari",
    locale: "en_IN",
    type: "website",
  },
};

export default function ShippingPolicyPage() {
  return <ShippingPolicy />;
}
