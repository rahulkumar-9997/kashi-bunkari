import Link from "next/link";
import {
  ArrowRight,
  Truck,
  Clock,
  MapPin,
  Package,
  Shield,
  CheckCircle,
  RefreshCw,
  Headphones,
} from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Heading from "@/components/Heading/Heading";
export default function ShippingPolicyPage() {
  return (
    <div className="w-full min-h-screen">
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Shipping Policy" }]}
      />
      <section className="relative overflow-hidden">
        <div className="w-full max-w-5xl relative mx-auto lg:pt-10 md:pt-11 sm:pt-12 pt-8 pb-0 md:px-0 px-4 text-center">
          <Heading
            level={1}
            text="Shipping Policy"
            allowHTML
            className="font-serif text-3xl md:text-4xl font-bold leading-[1.1] text-maroon"
            decorator="none"
          />
          <p className="mt-5 font-sans text-[13px] sm:text-[13.5px] text-gray-500">
            Last updated: 1 January 2024
          </p>
        </div>
      </section>
      <section className="relative overflow-hidden">
        <div className="w-full max-w-5xl relative mx-auto lg:py-10 md:py-11 sm:py-12 py-8 md:px-0 px-4">
          <div className="mb-8">
            <p className="font-sans text-[14px] sm:text-[15px] text-gray-600 leading-relaxed">
              We strive to deliver your order accurately, in good condition and
              always on time. We partner only with reputed national courier
              companies to ship your orders, ensuring a seamless delivery
              experience right to your doorstep.
            </p>
          </div>
          <div className="h-px bg-linear-to-r from-transparent via-[#E4D9C4] to-transparent my-8" />
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-[18px] sm:text-[20px] font-bold text-maroon mb-2">
                Shipping Timeline
              </h2>
              <ul className="space-y-3 font-sans text-[14px] sm:text-[15px] text-gray-600 leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#AD8A3B] mt-2 shrink-0" />
                  <span>
                    We ship your order within{" "}
                    <strong className="text-maroon">24-48 hours</strong> of
                    receiving your order confirmation.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#AD8A3B] mt-2 shrink-0" />
                  <span>
                    You can expect your order to be delivered to you in{" "}
                    <strong className="text-maroon">2-3 working days</strong> in
                    metropolitan cities and{" "}
                    <strong className="text-maroon">5-6 days</strong> for other
                    locations as per your pin code.
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="font-serif text-[18px] sm:text-[20px] font-bold text-maroon mb-2">
                Order Tracking
              </h2>
              <p className="font-sans text-[14px] sm:text-[15px] text-gray-600 leading-relaxed">
                Your order can be tracked online once it has been dispatched. We
                attempt to ship all items in your order together, however, this
                may not always be possible due to the availability of products.
                We will intimate you in such cases through email or SMS.
              </p>
            </div>
            <div>
              <h2 className="font-serif text-[18px] sm:text-[20px] font-bold text-maroon mb-2">
                Damaged Package Policy
              </h2>
              <p className="font-sans text-[14px] sm:text-[15px] text-gray-600 leading-relaxed">
                If you feel that your packaging is tampered with or damaged, you
                can refuse to accept the delivery. Call us at{" "}
                <a
                  href="tel:+919696588343"
                  className="text-[#AD8A3B] hover:text-maroon transition-colors underline"
                >
                  +91 9696588343
                </a>{" "}
                or email us at{" "}
                <a
                  href="mailto:kasibunkari@gmail.com"
                  className="text-[#AD8A3B] hover:text-maroon transition-colors underline"
                >
                  kasibunkari@gmail.com
                </a>{" "}
                with your order number. We will ensure that a replacement
                delivery is made to you at the earliest.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
