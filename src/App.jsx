import "./index.css";
import {
  CustomerReviews,
  Footer,
  Hero,
  PopularProducts,
  Services,
  SpecialOffer,
  Subscribe,
  SuperQuality,
} from "./sections";
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import Products from "./components/Products";
import SignIn from "./components/SignIn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./component/Nav";
const App = () => {
  return (
    <Router>
      <main className="relative ">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/products" element={<Products />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
        {/* <section className="xl:padding-l wide:padding-r padding-b">
        <Hero />
      </section>
      <section className="padding">
        <PopularProducts />
      </section>
      <section className="padding">
        <SuperQuality />
      </section>
      <section className="padding-x py-10">
        <Services />
      </section>
      <section className="padding">
        <SpecialOffer />
      </section>
      <section className="bg-pale-blue padding">
        <CustomerReviews />
      </section>
      <section className="padding-x sm:py-32 py-16 w-full">
        <Subscribe />
      </section>
      <section className=" bg-black padding-x padding-t pb-8">
        <Footer />
      </section> */}
      </main>
    </Router>
  );
};

export default App;
