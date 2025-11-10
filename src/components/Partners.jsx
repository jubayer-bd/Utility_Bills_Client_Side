import React from "react";

const Partners = () => {
  const partners = [
    {
      name: "DESCO",
      img: "https://play-lh.googleusercontent.com/6SONPi2ntkdffBNkxTLlmW8cw4XBcqUYbuNUJKSS4oLE3Au44FtfGK9ijDHjAh53lg=w480-h960-rw",
    },
    {
      name: "Titas Gas",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzs9yQ-5f1xXJuCSW4Ql8egzK-18uzfQlyGA&s",
    },
    {
      name: "DWASA",
      img: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Seal_of_Dhaka_Water_Supply_and_Sewerage_Authority.svg",
    },
    {
      name: "Banglalion",
      img: "https://upload.wikimedia.org/wikipedia/en/6/6f/Banglalion.png",
    },
  ];

  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-center mb-10 text-[#00BFA6]">
        Our Trusted Utility Partners
      </h2>
      <div className="flex flex-wrap justify-center items-center gap-10">
        {partners.map((p, i) => (
          <div key={i} className="w-32 h-32 flex flex-col items-center">
            <img
              src={p.img}
              alt={p.name}
              className="w-20 h-20 object-contain grayscale hover:grayscale-0 transition duration-300"
            />
            <p className="mt-2 font-medium text-gray-700">{p.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Partners;
