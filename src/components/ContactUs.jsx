import React from "react";
import CardComponent from "../component/CardComponent";
import customerImage from "../assets/images/customer1.jpeg"; // Import image from assets folder

const ContactUs = () => {
  const cardsData = [
    {
      imageSrc: customerImage,
      heading: "Card 1 Heading",
      paragraph: "Card 1 paragraph content.",
      popupContent: "Card 1 popup content.",
    },
    {
      imageSrc: customerImage,
      heading: "Card 2 Heading",
      paragraph: "Card 2 paragraph content.",
      popupContent: "Card 2 popup content.",
    },
    {
      imageSrc: customerImage,
      heading: "Card 2 Heading",
      paragraph: "Card 2 paragraph content.",
      popupContent: "Card 2 popup content.",
    },
    {
      imageSrc: customerImage,
      heading: "Card 2 Heading",
      paragraph: "Card 2 paragraph content.",
      popupContent: "Card 2 popup content.",
    },
    {
      imageSrc: customerImage,
      heading: "Card 2 Heading",
      paragraph: "Card 2 paragraph content.",
      popupContent: "Card 2 popup content.",
    },
    {
      imageSrc: customerImage,
      heading: "Card 2 Heading",
      paragraph: "Card 2 paragraph content.",
      popupContent: "Card 2 popup content.",
    },
    {
      imageSrc: customerImage,
      heading: "Card 2 Heading",
      paragraph: "Card 2 paragraph content.",
      popupContent: "Card 2 popup content.",
    },
    // Repeat for cards 3 to 8
  ];
  return (
    <section className="mt-28 px-6">
      {/* Center the grid and add equal spacing */}
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl w-full">
          {cardsData.map((card, index) => (
            <CardComponent
              key={index}
              imageSrc={card.imageSrc}
              heading={card.heading}
              paragraph={card.paragraph}
              popupContent={card.popupContent}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
