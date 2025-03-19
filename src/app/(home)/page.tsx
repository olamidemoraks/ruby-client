import Header from "@/component/Header";
import Hero from "@/component/Hero";
import Products from "@/component/Products";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Products />
    </div>
  );
}
