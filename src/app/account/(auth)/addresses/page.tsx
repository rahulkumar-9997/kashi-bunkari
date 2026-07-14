
import type { Metadata } from "next";
import AddressesPage from './AddressesPage';

export const metadata: Metadata = {
  title: "My Addresses",
  description: "View and track all your orders.",
};
export default function Page() {
  return <AddressesPage />;
}