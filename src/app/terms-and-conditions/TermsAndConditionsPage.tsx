import Link from "next/link";
import {
  ArrowRight,
  Shield,
  FileText,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Heading from "@/components/Heading/Heading";

export default function TermsAndConditionsPage() {
  return (
    <div className="w-full min-h-screen">
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Terms & Conditions" }]}
      />
      <section className="relative overflow-hidden">
        <div className="w-full max-w-5xl relative mx-auto lg:pt-10 md:pt-11 sm:pt-12 pt-8 pb-0 md:px-0 px-4 text-center">
          <Heading
            level={1}
            text="Terms & Conditions"
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
              PLEASE READ THIS TERMS OF SERVICE AGREEMENT CAREFULLY. BY USING
              THIS WEBSITE OR ORDERING PRODUCTS FROM THIS WEBSITE YOU AGREE TO
              BE BOUND BY ALL OF THE TERMS AND CONDITIONS OF THIS AGREEMENT.
            </p>
          </div>
          <div className="mb-8">
            <p className="font-sans text-[14px] sm:text-[15px] text-gray-600 leading-relaxed">
              This Terms of Service Agreement (the "Agreement") governs your use
              of this website, kasibunkari.com (the "Website"), we offer
              products for purchase on this Website, or your purchase of
              products available on this Website. This Agreement includes, and
              incorporates by this reference, the policies and guidelines
              referenced below.
            </p>
          </div>
          <div className="mb-8">
            <p className="font-sans text-[14px] sm:text-[15px] text-gray-600 leading-relaxed">
              Kasibunkari reserves the right to change or revise the terms and
              conditions of this Agreement at any time by posting any changes or
              a revised Agreement on this Website.
            </p>
          </div>
          <div className="h-px bg-linear-to-r from-transparent via-[#E4D9C4] to-transparent my-8" />
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-[18px] sm:text-[20px] font-bold text-maroon mb-3">
                I. Products
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-sans text-[18px] font-semibold text-gray-800 mb-1">
                    Terms of Offer
                  </h3>
                  <p className="font-sans text-[14px] sm:text-[15px] text-gray-600 leading-relaxed">
                    This Website offers for sale certain products (the
                    "Products"). By placing an order for Products through this
                    Website, you agree to the terms outlined in this Agreement.
                  </p>
                </div>

                <div>
                  <h3 className="font-sans text-[18px] font-semibold text-gray-800 mb-1">
                    Customer Solicitation
                  </h3>
                  <p className="font-sans text-[14px] sm:text-[15px] text-gray-600 leading-relaxed">
                    Unless you notify our third-party call center reps or direct
                    sales reps, while they are calling you, of your desire to
                    opt-out from further direct company communications and
                    solicitations, you are agreeing to continue to receive
                    further emails and call solicitations and it's designated in
                    house or third party call team(s).
                  </p>
                </div>

                <div>
                  <h3 className="font-sans text-[18px] font-semibold text-gray-800 mb-1">
                    Opt-Out Procedure
                  </h3>
                  <p className="font-sans text-[14px] sm:text-[15px] text-gray-600 leading-relaxed">
                    We provide easy ways to opt out of future solicitations.
                  </p>
                  <ul className="mt-2 space-y-2 font-sans text-[14px] sm:text-[15px] text-gray-600 leading-relaxed">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#AD8A3B] mt-2 shrink-0" />
                      <span>
                        You may use the opt-out link found in any email
                        solicitation that you may receive.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#AD8A3B] mt-2 shrink-0" />
                      <span>
                        You may also choose to opt-out, by sending your email
                        address.
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-sans text-[18px] font-semibold text-gray-800 mb-1">
                    Proprietary Rights
                  </h3>
                  <p className="font-sans text-[14px] sm:text-[15px] text-gray-600 leading-relaxed">
                    Kasibunkari has proprietary rights and trade secrets in the
                    Products. You may not resell or any Product manufactured
                    and/or distributed by us.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-serif text-[18px] sm:text-[20px] font-bold text-maroon mb-3">
                II. Website
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-sans text-[18px] font-semibold text-gray-800 mb-1">
                    Intellectual Property; Third Party Links
                  </h3>
                  <p className="font-sans text-[14px] sm:text-[15px] text-gray-600 leading-relaxed">
                    In addition to making Products available, this Website also
                    offers information and marketing materials. We do not always
                    create the information offered on this Website; instead the
                    information is often gathered from other sources. To the
                    extent that we do create the content on this Website, such
                    content is protected by intellectual property laws of India,
                    foreign nations, and international bodies. Unauthorized use
                    of the material may violate copyright, trademark, and/or
                    other laws. You acknowledge that your use of the content on
                    this Website is for personal, noncommercial use. Any links
                    to third-party websites are provided solely as a convenience
                    to you. We do not endorse the content on any such
                    third-party websites.
                  </p>
                </div>

                <div>
                  <h3 className="font-sans text-[18px] font-semibold text-gray-800 mb-1">
                    Use of Website
                  </h3>
                  <p className="font-sans text-[14px] sm:text-[15px] text-gray-600 leading-relaxed">
                    Kasibunkari is not responsible for any damages resulting
                    from the use of this website by anyone. You will not use the
                    Website for illegal purposes. You will:
                  </p>
                  <ul className="mt-2 space-y-2 font-sans text-[14px] sm:text-[15px] text-gray-600 leading-relaxed">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#AD8A3B] mt-2 shrink-0" />
                      <span>
                        Abide by all applicable local, state, national, and
                        international laws and regulations in your use of the
                        Website (including laws regarding intellectual
                        property).
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#AD8A3B] mt-2 shrink-0" />
                      <span>
                        Not interfere with or disrupt the use and enjoyment of
                        the Website by other users.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#AD8A3B] mt-2 shrink-0" />
                      <span>Not resell material on the Website.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#AD8A3B] mt-2 shrink-0" />
                      <span>
                        Not engage, directly or indirectly, in transmission of
                        "spam", chain letters, junk mail or any other type of
                        unsolicited communication.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#AD8A3B] mt-2 shrink-0" />
                      <span>
                        Not defame, harass, abuse, or disrupt other users of the
                        Website.
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-sans text-[18px] font-semibold text-gray-800 mb-1">
                    License
                  </h3>
                  <p className="font-sans text-[14px] sm:text-[15px] text-gray-600 leading-relaxed">
                    By using this Website, you are granted a limited,
                    non-exclusive, non-transferable right to use the content and
                    materials on this Website in connection with your normal,
                    noncommercial, use of the Website. You may not copy,
                    reproduce, transmit, distribute, or create derivative works
                    of such content or information without express written
                    authorization or the applicable third party (if third-party
                    content is at issue).
                  </p>
                </div>

                <div>
                  <h3 className="font-sans text-[18px] font-semibold text-gray-800 mb-1">
                    Posting
                  </h3>
                  <p className="font-sans text-[14px] sm:text-[15px] text-gray-600 leading-relaxed">
                    By posting, storing, or transmitting any content on the
                    Website, you hereby grant us a perpetual, worldwide,
                    non-exclusive, royalty-free, assignable, right and license
                    to use, copy, display, perform, create derivative works
                    from, distribute, have distributed, transmit and assign such
                    content in any form, in all media now known or hereinafter
                    created, anywhere in the world.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-serif text-[18px] sm:text-[20px] font-bold text-maroon mb-3">
                III. Disclaimer of Warranties
              </h2>

              <div className="space-y-4">
                <p className="font-sans text-[14px] sm:text-[15px] text-gray-600 leading-relaxed">
                  Your use of this website and/or products are at your sole
                  risk. The website and products are offered on an{" "}
                  <strong className="text-maroon">"as is"</strong> and{" "}
                  <strong className="text-maroon">"as available"</strong> basis.
                </p>
                <ul className="space-y-2 font-sans text-[14px] sm:text-[15px] text-gray-600 leading-relaxed">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#AD8A3B] mt-2 shrink-0" />
                    <span>
                      The information provided on this website is accurate,
                      reliable, complete, or timely.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#AD8A3B] mt-2 shrink-0" />
                    <span>
                      The links to third-party websites are to information that
                      is accurate, reliable, complete, or timely.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#AD8A3B] mt-2 shrink-0" />
                    <span>
                      Regarding any products purchased or obtained through the
                      website.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="font-serif text-[18px] sm:text-[20px] font-bold text-maroon mb-3">
                IV. Limitation of Liability
              </h2>

              <div className="space-y-4">
                <p className="font-sans text-[14px] sm:text-[15px] text-gray-600 leading-relaxed">
                  Entire liability, and your exclusive remedy, in law, in
                  equity, or otherwise, concerning the website content and
                  products and/or for any breach of this agreement is solely
                  limited to the amount you paid, less shipping and handling,
                  for products purchased via the website.
                </p>
                <p className="font-sans text-[14px] sm:text-[15px] text-gray-600 leading-relaxed">
                  We will not be liable for any direct, indirect, incidental,
                  special or consequential damages in connection with this
                  agreement or the products in any manner, including liabilities
                  resulting from:
                </p>
                <ul className="space-y-2 font-sans text-[14px] sm:text-[15px] text-gray-600 leading-relaxed">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#AD8A3B] mt-2 shrink-0" />
                    <span>
                      The use or the inability to use the website content or
                      products.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#AD8A3B] mt-2 shrink-0" />
                    <span>
                      The cost of procuring substitute products or content.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#AD8A3B] mt-2 shrink-0" />
                    <span>
                      Any products purchased or obtained or transactions entered
                      into through the website.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#AD8A3B] mt-2 shrink-0" />
                    <span>Any lost profits you allege.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="font-serif text-[18px] sm:text-[20px] font-bold text-maroon mb-3">
                V. Indemnification
              </h2>
              <p className="font-sans text-[14px] sm:text-[15px] text-gray-600 leading-relaxed">
                You will release, indemnify, defend and hold harmless, any of
                its contractors, agents, employees, officers, directors,
                shareholders, affiliates, and assigns from all liabilities,
                claims, damages, costs, and expenses, including reasonable
                attorneys' fees and expenses, of third parties relating to or
                arising out of:
              </p>
              <ul className="mt-2 space-y-2 font-sans text-[14px] sm:text-[15px] text-gray-600 leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#AD8A3B] mt-2 shrink-0" />
                  <span>
                    This Agreement or the breach of your warranties,
                    representations, and obligations under this Agreement.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#AD8A3B] mt-2 shrink-0" />
                  <span>
                    The Website content or your use of the Website content.
                  </span>
                </li>
              </ul>
            </div>

            {/* Conclusion */}
            <div className="mt-6 p-4 bg-[#FFF8F6] rounded-xl border border-[#E4D9C4]/30">
              <p className="font-sans text-[14px] sm:text-[15px] text-gray-700 text-center">
                <strong className="text-maroon">
                  BY USING THIS WEBSITE OR ORDERING PRODUCTS FROM THIS WEBSITE
                  YOU AGREE TO BE BOUND BY ALL OF THE TERMS AND CONDITIONS OF
                  THIS AGREEMENT
                </strong>
              </p>
            </div>

            <div>
              <p className="font-sans text-[14px] sm:text-[15px] text-gray-600 leading-relaxed">
                Questions about the Terms of Service should be sent to us at{" "}
                <a
                  href="mailto:kasibunkari@gmail.com"
                  className="text-[#AD8A3B] hover:text-maroon transition-colors underline"
                >
                  kasibunkari@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
