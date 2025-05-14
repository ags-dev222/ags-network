import React from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../../components/ui/card";

// Data for feature cards
const featureCards = [
  {
    title: "Add Your Startup",
    image: "/add y startups.jpeg",
    buttonText: "Join us",
  },
  {
    title: "Become a Partner",
    image: "/become a partner.jpeg",
    buttonText: "Contact us",
  },
  {
    title: "Become an Investor",
    image: "/investor.jpeg",
    buttonText: "Join us",
  },
  {
    title: "Become an Entrepreneur",
    image: "/enteep.jpeg",
    buttonText: "Join us",
  },
];

export const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="px-[45px] pt-[38px]">
        <div
          className="w-full h-[422px] rounded-[32px] flex flex-col justify-end relative overflow-hidden"
          style={{
            background:
              "linear-gradient(140deg, rgba(0,0,0,0) 0%, rgba(41,45,50,1) 75%), url(/main.jpeg) 50% 30% / cover",
          }}
        >
          <div className="flex flex-col items-end w-[452px] gap-[29px] p-[60px] ml-auto">
            <div className="flex flex-col gap-[30px] w-full">
              <h1 className="font-['Sora'] font-bold text-3xl text-white text-right leading-[31px]">
                Explore the Ghanaian Startup
                <br />
                Ecosystem!
              </h1>
              <p className="font-['Montserrat'] text-sm text-white text-right leading-[18.2px]">
                A supportive and open startup ecosystem committed to
                amplifying ambitious individuals and startups. Crafted by and
                for founders, investors, executives, and
                tech&nbsp;&nbsp;enthusiasts. We include in startups also
                scale-ups.
              </p>
            </div>
            <Button className="bg-[#d4a517] text-[#292d32] font-['Montserrat'] text-sm rounded-[3px] h-auto py-2 px-[22.67px]">
              Sign up Now!
            </Button>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="px-[5px] pt-[50px] pb-[50px] flex gap-[15px] flex-wrap justify-center">
        {featureCards.map((card, index) => (
          <Card
            key={index}
            className="w-[237px] h-[355px] rounded-[20px] border border-border bg-white dark:bg-[#1a1a1a] overflow-hidden"
          >
            <CardHeader className="p-0">
              <img
                className="w-[205px] h-[125px] rounded-[10px] mx-auto mt-4"
                alt={card.title}
                src={card.image}
              />
            </CardHeader>
            <CardContent className="flex flex-col items-center px-3.5 pt-0">
              <h3 className="font-['Montserrat'] font-semibold text-[#066320] text-sm text-center p-1.5">
                {card.title}
              </h3>
              <p className="font-['Montserrat'] text-xs text-[#292d32] dark:text-[#e0e0e0] text-center p-1.5">
                Are you a founder, or otherwise active in the ecosystem? Gain
                visibility, unlock more features, and help the database become more
                complete by adding your organization for free.
              </p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button className="w-[126px] h-[35px] bg-[#066320] text-white rounded-[10px] font-['Montserrat'] font-medium text-sm">
                {card.buttonText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </section>
    </div>
  );
}