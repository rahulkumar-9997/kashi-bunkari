import Link from "next/link";
import {
  ArrowRight,
} from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Heading from "@/components/Heading/Heading";

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full min-h-screen">
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
      />
      <section className="relative overflow-hidden">        
          <div className="w-full max-w-5xl relative mx-auto lg:pt-10 md:pt-11 sm:pt-12 pt-8 pb-0 md:px-0 px-4 text-center">          
              <Heading
                level={1}
                text='Privacy Policy'
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
              Kasibunkari recognizes the importance of maintaining your privacy.
              We value your privacy and appreciate your trust in us. This Policy
              describes how we treat user information we collect on{" "}
              <a
                href="mailto:kasibunkari@gmail.com"
                className="text-[#AD8A3B] hover:text-maroon transition-colors underline"
              >
                kasibunkari@gmail.com
              </a>{" "}
              and other offline sources. This Privacy Policy applies to current
              and former visitors to our website and our online customers. By
              visiting and/or using our website, you agree to this Privacy
              Policy.
            </p>
          </div>

          <div className="mb-8">
            <p className="font-sans text-[14px] sm:text-[15px] text-gray-600 leading-relaxed">
              Kasibunkari, a brand of Varchasv, an Indian firm registered under
              the Companies Act, 2013 having its registered office at AB2, Virat
              complex, Ramkatora, Piplanikatra, Varanasi-221010, India.
            </p>
          </div>
          <div className="h-px bg-linear-to-r from-transparent via-[#E4D9C4] to-transparent my-8" />
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-[18px] sm:text-[20px] font-bold text-maroon mb-2">
                Contact Information
              </h2>
              <p className="font-sans text-[14px] sm:text-[15px] text-gray-600 leading-relaxed">
                We might collect your name, email, mobile number, phone number,
                street, city, state, pincode, country, and IP address.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-[18px] sm:text-[20px] font-bold text-maroon mb-2">
                Payment and Billing Information
              </h2>
              <p className="font-sans text-[14px] sm:text-[15px] text-gray-600 leading-relaxed">
                We might collect your billing name, billing address and payment
                method. We <strong className="text-maroon">NEVER</strong>{" "}
                collect your credit card number, credit card expiry date, or
                other details about your credit card on our website. Credit card
                information will be obtained and processed by our online payment
                partner Razorpay.
              </p>
            </div>
            <div>
              <h2 className="font-serif text-[18px] sm:text-[20px] font-bold text-maroon mb-2">
                Information You Post
              </h2>
              <p className="font-sans text-[14px] sm:text-[15px] text-gray-600 leading-relaxed">
                We collect information you post in a public space on our website
                or on a third-party social media site belonging to Kasibunkari.
              </p>
            </div>
            
            <div>
              <h2 className="font-serif text-[18px] sm:text-[20px] font-bold text-maroon mb-2">
                Demographic Information
              </h2>
              <p className="font-sans text-[14px] sm:text-[15px] text-gray-600 leading-relaxed">
                We may collect demographic information about you, events you
                like, events you intend to participate in, tickets you buy, or
                any other information provided by you during the use of our
                website. We might collect this as a part of a survey also.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-[18px] sm:text-[20px] font-bold text-maroon mb-2">
                Other Information
              </h2>
              <p className="font-sans text-[14px] sm:text-[15px] text-gray-600 leading-relaxed">
                If you use our website, we may collect information about your IP
                address and the browser you're using. We might look at what site
                you came from, the duration of time spent on our website, pages
                accessed, or what site you visit when you leave us. We might
                also collect the type of mobile device you are using or the
                version of the operating system your computer or device is
                running.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-[18px] sm:text-[20px] font-bold text-maroon mb-3">
                We Collect Information In Different Ways
              </h2>
              <ul className="space-y-3 font-sans text-[14px] sm:text-[15px] text-gray-600 leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#AD8A3B] mt-2 flex-shrink-0" />
                  <span>
                    <strong className="text-gray-800">
                      Directly from you:
                    </strong>{" "}
                    We collect information directly from you when you register
                    for an event or buy tickets. We also collect information if
                    you post a comment on our websites or ask us a question
                    through phone or email.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#AD8A3B] mt-2 flex-shrink-0" />
                  <span>
                    <strong className="text-gray-800">Passively:</strong> We use
                    tracking tools like Google Analytics, Google Webmaster,
                    browser cookies, and web beacons to collect information
                    about your usage of our website.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#AD8A3B] mt-2 flex-shrink-0" />
                  <span>
                    <strong className="text-gray-800">
                      From third parties:
                    </strong>{" "}
                    For example, if you use an integrated social media feature
                    on our websites. The third-party social media site will give
                    us certain information about you. This could include your
                    name and email address.
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-[18px] sm:text-[20px] font-bold text-maroon mb-3">
                Use of Your Personal Information
              </h2>
              <ul className="space-y-3 font-sans text-[14px] sm:text-[15px] text-gray-600 leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#AD8A3B] mt-2 flex-shrink-0" />
                  <span>
                    <strong className="text-gray-800">To contact you:</strong>{" "}
                    We might use the information you provide to contact you for
                    confirmation of a purchase on our website or for other
                    promotional purposes.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#AD8A3B] mt-2 flex-shrink-0" />
                  <span>
                    <strong className="text-gray-800">
                      To respond to your requests or questions:
                    </strong>{" "}
                    We might use your information to confirm your registration
                    for an event or contest.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#AD8A3B] mt-2 flex-shrink-0" />
                  <span>
                    <strong className="text-gray-800">
                      To improve our products and services:
                    </strong>{" "}
                    We might use your information to customize your experience
                    with us. This could include displaying content based on your
                    preferences.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#AD8A3B] mt-2 flex-shrink-0" />
                  <span>
                    <strong className="text-gray-800">
                      To look at site trends and customer interests:
                    </strong>{" "}
                    We may use your information to make our website and products
                    better. We may combine information we get from you with
                    information about you we get from third parties.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#AD8A3B] mt-2 flex-shrink-0" />
                  <span>
                    <strong className="text-gray-800">
                      For security purposes:
                    </strong>{" "}
                    We may use the information to protect our company, our
                    customers, or our websites.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#AD8A3B] mt-2 flex-shrink-0" />
                  <span>
                    <strong className="text-gray-800">
                      For marketing purposes:
                    </strong>{" "}
                    We might send you information about special promotions or
                    offers. We might also tell you about new features or
                    products. These might be our own offers or products, or
                    third-party offers or products we think you might find
                    interesting. Or, for example, if you buy we'll enroll you in
                    our newsletter.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#AD8A3B] mt-2 flex-shrink-0" />
                  <span>
                    <strong className="text-gray-800">
                      To send you transactional communications:
                    </strong>{" "}
                    We might send you emails or SMS about your account.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#AD8A3B] mt-2 flex-shrink-0" />
                  <span>
                    <strong className="text-gray-800">
                      As otherwise permitted by law.
                    </strong>
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-[18px] sm:text-[20px] font-bold text-maroon mb-3">
                We Will Share Information
              </h2>
              <ul className="space-y-3 font-sans text-[14px] sm:text-[15px] text-gray-600 leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#AD8A3B] mt-2 flex-shrink-0" />
                  <span>
                    <strong className="text-gray-800">
                      With third parties who perform services on our behalf:
                    </strong>{" "}
                    We share information with vendors who help us manage our
                    online registration process or payment processors or
                    transactional message processors. Some vendors may be
                    located outside of India.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#AD8A3B] mt-2 flex-shrink-0" />
                  <span>
                    <strong className="text-gray-800">
                      With our business partners:
                    </strong>{" "}
                    This includes a third party who provides or sponsors an
                    event, or who operates a venue where we hold events. Our
                    partners use the information we give them as described in
                    their privacy policies.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#AD8A3B] mt-2 flex-shrink-0" />
                  <span>
                    <strong className="text-gray-800">
                      To comply with the law or to protect ourselves:
                    </strong>{" "}
                    We will share information to respond to a court order or
                    subpoena. We may also share it if a government agency or
                    investigatory body requests. Or, we might also share
                    information when we are investigating potential fraud.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#AD8A3B] mt-2 flex-shrink-0" />
                  <span>
                    <strong className="text-gray-800">
                      With any successor to all or part of our business:
                    </strong>{" "}
                    For example, if part of our business is sold we may give our
                    customer list as part of that transaction.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#AD8A3B] mt-2 flex-shrink-0" />
                  <span>
                    <strong className="text-gray-800">
                      For reasons not described in this policy:
                    </strong>{" "}
                    We will tell you before we do this.
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-[18px] sm:text-[20px] font-bold text-maroon mb-2">
                Email Opt-Out
              </h2>
              <p className="font-sans text-[14px] sm:text-[15px] text-gray-600 leading-relaxed">
                You can opt out of receiving our marketing emails. To stop
                receiving our promotional emails, please email{" "}
                <a
                  href="mailto:kasibunkari@gmail.com"
                  className="text-[#AD8A3B] hover:text-maroon transition-colors underline"
                >
                  kasibunkari@gmail.com
                </a>
                . It may take about ten days to process your request. Even if
                you opt out of getting marketing messages, we will still be
                sending you transactional messages through email and SMS about
                your purchases.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-[18px] sm:text-[20px] font-bold text-maroon mb-2">
                Third-Party Sites
              </h2>
              <p className="font-sans text-[14px] sm:text-[15px] text-gray-600 leading-relaxed">
                If you click on one of the links to third-party websites, you
                may be taken to websites we do not control. This policy does not
                apply to the privacy practices of those websites. Read the
                privacy policy of other websites carefully. We are not
                responsible for these third-party sites.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-[18px] sm:text-[20px] font-bold text-maroon mb-2">
                Updates to This Policy
              </h2>
              <p className="font-sans text-[14px] sm:text-[15px] text-gray-600 leading-relaxed">
                This Privacy Policy was last updated on{" "}
                <strong>01.01.2024</strong>. From time to time we may change our
                privacy practices. We will notify you of any material changes to
                this policy as required by law. We will also post an updated
                copy on our website. Please check our site periodically for
                updates.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-[18px] sm:text-[20px] font-bold text-maroon mb-2">
                Jurisdiction
              </h2>
              <p className="font-sans text-[14px] sm:text-[15px] text-gray-600 leading-relaxed">
                If you choose to visit the website, your visit and any dispute
                over privacy is subject to this Policy and the website's terms
                of use. In addition to the foregoing, any disputes arising under
                this Policy shall be governed by the laws of India.
              </p>
            </div>
          </div>
        </div>        
      </section>
    </div>
  );
}
