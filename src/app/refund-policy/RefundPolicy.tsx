import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Heading from "@/components/Heading/Heading";

export default function RefundPolicyPage() {
  return (
    <div className="w-full min-h-screen">
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Refund Policy" }]}
      />
      <section className="relative overflow-hidden">
        <div className="w-full max-w-5xl relative mx-auto lg:pt-10 md:pt-11 sm:pt-12 pt-8 pb-0 md:px-0 px-4 text-center">
          <Heading
            level={1}
            text="Refund Policy"
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
              Our team of artisans invest great efforts and love in the making
              of each Kasibunkari product hence, we strongly discourage our
              customers from buying any item where there is doubt.
            </p>
            <p className="font-sans text-[14px] sm:text-[15px] text-gray-600 leading-relaxed mt-3">
              You can always contact us on WhatsApp{" "}
              <a
                href="https://wa.me/919696588343"
                className="text-black hover:text-maroon transition-colors underline"
              >
                +91 9696588343
              </a>{" "}
              or email us on{" "}
              <a
                href="mailto:kasibunkari@gmail.com"
                className="text-black hover:text-maroon transition-colors underline"
              >
                kasibunkari@gmail.com
              </a>{" "}
              if you're unsure about the size or design.
            </p>
          </div>
          <div className="h-px bg-linear-to-r from-transparent via-[#E4D9C4] to-transparent my-4" />
          <div className="mb-4">
            <h2 className="font-serif text-[18px] sm:text-[20px] font-bold text-maroon mb-3">
              Refund Policy
            </h2>
            <div className="space-y-3 font-sans text-[14px] sm:text-[15px] text-gray-600 leading-relaxed">
              <p>
                We do not accept any returns unless the product received is
                damaged.
              </p>

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#AD8A3B] mt-2 shrink-0" />
                  <span>
                    Eligible products (If found Damaged) can only be returned
                    within 7 days after recieving your order.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#AD8A3B] mt-2 shrink-0" />
                  <span>
                    In the unlikely event that your merchandise arrives damaged,
                    you should email us at{" "}
                    <a
                      href="mailto:kasibunkari@gmail.com"
                      className="text-black hover:text-maroon transition-colors underline"
                    >
                      kasibunkari@gmail.com
                    </a>{" "}
                    a photo/video and description of the issue of the damaged
                    product within 7 days of receiving your order and we will
                    take the necessary action.
                  </span>
                </li>
              </ul>

              <p className="text-red-500">
                Any issues reported after 7 days will not be considered for
                replacement.
              </p>

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#AD8A3B] mt-2 shrink-0" />
                  <span>
                    Our team must receive and approve your request. We will let
                    you know if the return was approved or not. Once your
                    request is received and approved, we will arrange for a
                    return pick-up.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#AD8A3B] mt-2 shrink-0" />
                  <span>
                    We'll send you a return shipping label, as well as
                    instructions on how and where to send your package.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#AD8A3B] mt-2 shrink-0" />
                  <span>
                    Items sent back to us without first requesting a return will
                    not be accepted.Please make sure the product is unwashed or
                    unused.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#AD8A3B] mt-2 shrink-0" />
                  <span>
                    We aim to process all returns within 10 days. If you have
                    any questions about your return, feel free to reach out to
                    us at{" "}
                    <a
                      href="mailto:kasibunkari@gmail.com"
                      className="text-black hover:text-maroon transition-colors underline"
                    >
                      kasibunkari@gmail.com
                    </a>
                    .
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#AD8A3B] mt-2 shrink-0" />
                  <span>
                    After confirmation you will receive your amount within 10
                    working days in your bank account.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#AD8A3B] mt-2 shrink-0" />
                  <span>
                    All returns are subject to the discretion of Kasibunkari.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="h-px bg-linear-to-r from-transparent via-[#E4D9C4] to-transparent my-8" />

          {/* Cancellation Policy */}
          <div className="mb-8">
            <h2 className="font-serif text-[18px] sm:text-[20px] font-bold text-maroon mb-3">
              Cancellation Policy
            </h2>
            <div className="space-y-3 font-sans text-[14px] sm:text-[15px] text-gray-600 leading-relaxed">
              <p>
                We do not allow for the cancellation of orders placed. We
                request you to shop with indulgence and patience so that the
                item you purchase is something you love.
              </p>
              <p>
                But still in odd cases, if you wish to cancel your order, you
                must contact us within 24 hours of placing the order. Please
                WhatsApp us on{" "}
                <a
                  href="https://wa.me/919696588343"
                  className="text-black hover:text-maroon transition-colors underline"
                >
                  +91 9696588343
                </a>{" "}
                or email us on{" "}
                <a
                  href="mailto:kasibunkari@gmail.com"
                  className="text-black hover:text-maroon transition-colors underline"
                >
                  kasibunkari@gmail.com
                </a>
              </p>
            </div>
          </div>

          <div className="h-px bg-linear-to-r from-transparent via-[#E4D9C4] to-transparent my-8" />

          {/* Exchange Policy */}
          <div>
            <h2 className="font-serif text-[18px] sm:text-[20px] font-bold text-maroon mb-3">
              Exchange Policy
            </h2>
            <div className="space-y-3 font-sans text-[14px] sm:text-[15px] text-gray-600 leading-relaxed">
              <p>
                We will only be able to offer you an exchange for a different
                size or style. In case the style is not available, you can
                choose other styles from the store.
              </p>

              <p>
                We do not accept the exchange of a product for reasons like:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#AD8A3B] mt-2 shrink-0" />
                  <span>Not like the Color</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#AD8A3B] mt-2 shrink-0" />
                  <span>Or simply a change of mind</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#AD8A3B] mt-2 shrink-0" />
                  <span>
                    Items bought on sale/discount cannot be exchanged.
                  </span>
                </li>
              </ul>

              <p>
                Products that are Customized, as per the instructions of the
                customer will not be eligible for exchange.
              </p>
              <p>
                If a piece is exchanged once, it cannot be exchanged the second
                time.
              </p>
              <p>
                We will only be able to process exchange once we recieve our
                products back to our warehouse. Upon inspection, if product is
                unwashed and have tags intact, we will send you a confirmation
                of exchange.
              </p>

              <div className="p-4 rounded-lg bg-[#FBF6ED] border border-[#AD8A3B]/20">
                <p className="font-medium text-gray-800">
                  If your purchase meets our exchange criteria stated above,
                  please email us at{" "}
                  <a
                    href="mailto:kasibunkari@gmail.com"
                    className="text-black hover:text-maroon transition-colors underline"
                  >
                    kasibunkari@gmail.com
                  </a>{" "}
                  within 7 days of delivery with the following information:
                </p>
                <ul className="mt-3 space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#AD8A3B] mt-2 shrink-0" />
                    <span>Order number</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#AD8A3B] mt-2 shrink-0" />
                    <span>Delivery address</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#AD8A3B] mt-2 shrink-0" />
                    <span>
                      Specify the reason for exchange and in case of a defective
                      or incorrect product, please send us an image of the item
                      as soon as the packaging has been opened.
                    </span>
                  </li>
                </ul>
              </div>

              <p className="text-red-500">
                We unfortunately will not be able to entertain emails or images
                sent over after 7 days of delivery. Our policy lasts 7 days of
                delivery. If 7 days have gone by since the product has been
                delivered, we won't be able to offer you an exchange.
              </p>

              <p>
                We'd request you ensure that the product is sent back to us in
                its original condition and packaging with its original documents
                including tags, order invoice etc.
              </p>

              <div className="p-4 rounded-lg bg-linear-to-r from-[#FBF6ED] to-white border border-[#AD8A3B]/30">
                <p>
                  If there is a genuine defect in the product, we're happy to
                  exchange your product for a replacement, the same product, or
                  a different product of the same value within 7 working days
                  after we receive the product at our warehouse, following an
                  inspection quality check.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
