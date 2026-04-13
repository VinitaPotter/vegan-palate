const resourceData = [
  {
    uid: "01",
    name: "Ed Winters (Earthling Ed)",
    type: "Person",
    description:
      "Ed Winters, known globally as Earthling Ed, is a preeminent vegan educator and public speaker whose work has redefined modern animal rights advocacy. Based in the United Kingdom, Winters rose to prominence through his masterful use of Socratic dialogue and non-confrontational debate, effectively dismantling the cultural and psychological justifications for animal consumption. He is the author of 'This Is Vegan Propaganda,' which provides a meticulous deep dive into the environmental, ethical, and health-related arguments for veganism. Beyond his digital presence, he is a co-founder of the organization Surge and has opened non-profit vegan restaurants to fund activist initiatives.",
    source: "https://earthlinged.org/",
    image:
      "https://images.squarespace-cdn.com/content/v1/6437eed114d5c51ee78884f5/204dad44-0b04-4e1b-866f-d7d3ccda28fa/Website+Size+1.jpg?format=2500w",
    quotes: {
      sentence:
        "Is it not strange that we call those who kill dogs animal abusers, those who kill pigs 'normal', and those who kill neither 'extremists'?",
      citation:
        "https://www.goodreads.com/work/quotes/93129027-this-is-vegan-propaganda",
      source: "This Is Vegan Propaganda (Book)",
    },
  },
  {
    uid: "02",
    name: "Nisha Vora (Rainbow Plant Life)",
    type: "Person",
    description:
      "Nisha Vora is a former corporate litigator turned New York Times best-selling cookbook author and culinary creator. Her platform, Rainbow Plant Life, focuses on proving that plant-based food is never synonymous with deprivation. Vora’s expertise lies in developing complex flavor profiles, often drawing from her Indian heritage to create vibrant, spice-forward dishes. She is a dominant voice on YouTube, where she meticulously teaches the 'why' behind cooking methods, empowering her audience to become intuitive chefs through high-production tutorials and rigorously tested recipes.",
    source: "https://rainbowplantlife.com/",
    image:
      "https://rainbowplantlife.com/wp-content/uploads/2025/12/nisha-holding-salad-4.png",
    quotes: {
      sentence:
        "The people in Big Law who were supposed to be the role models were people whose lives I didn't envy. I decided I wanted to live a life that was worth living.",
      citation:
        "https://impactpodcast.com/episode/2025/02/dishing-up-big-vegan-flavor-with-nisha-vora/",
      source: "Impact Podcast Interview",
    },
  },
  {
    uid: "03",
    name: "Dr. Michael Greger",
    type: "Person",
    description:
      "Dr. Michael Greger is a physician and the founder of NutritionFacts.org, a non-profit, science-based public service. Recognized for his exhaustive review of clinical nutrition research, his work bridges the gap between complex medical studies and practical dietary choices. Through his books 'How Not to Die' and 'How Not to Diet,' Greger argues that a whole-food, plant-based diet is the only nutritional regimen proven to prevent and reverse several leading causes of death. He famously donates all proceeds from his books and speaking engagements to charity.",
    source: "https://nutritionfacts.org/",
    image: "https://nutritionfacts.org/app/uploads/2025/11/michael.jpg",
    quotes: {
      sentence:
        "We don't get reimbursed for time spent counseling patients about the benefits of healthy eating... we need to change the model of reimbursement to change medical care.",
      citation: "https://www.goodreads.com/author/quotes/352513.Michael_Greger",
      source: "How Not to Die (Book)",
    },
  },
  {
    uid: "04",
    name: "Gaz Oakley (Avant-Garde Vegan)",
    type: "Person",
    description:
      "Gaz Oakley is a professional chef who used his classical training to revolutionize vegan food presentation. After a hiatus from the professional kitchen, Oakley returned to the industry to 'vegan-ise' nostalgic flavors and complex dishes. His YouTube channel features high-energy cooking tutorials that emphasize bold presentation. Recently, he has shifted his focus toward sustainable living and farming, documenting his journey of growing his own food while continuing to innovate in plant-based culinary arts on his farm in Wales.",
    source: "https://www.avantgardevegan.com/",
    image:
      "https://www.abouttimemagazine.co.uk/wp/wp-content/uploads/2018/09/Gaz-Oakley-Avant-Garde-Vegan-01.jpg",
    quotes: {
      sentence:
        "I remember eating my first vegan meal; it was like a weight had been lifted off my shoulders. I would no longer be part of the cruelty toward animals.",
      citation:
        "https://viva.org.uk/lifestyle/living-vegan/celebrities/chefs-cookery-writers/gaz-oakley/",
      source: "Viva! Celebrity Profile",
    },
  },
  {
    uid: "05",
    name: "The Game Changers",
    type: "Documentary",
    description:
      "The Game Changers is a landmark documentary produced by James Cameron, Arnold Schwarzenegger, and Jackie Chan that systematically deconstructs the protein myth. The film follows James Wilks, an elite Special Forces trainer, as he interviews world-class athletes who have reached the pinnacle of their sports on a plant-based diet. It focuses on the functional benefits of veganism, such as improved blood flow and faster recovery times, effectively bridging the gap between animal ethics and peak human performance through the lens of science and athleticism.",
    source: "https://gamechangersmovie.com/",
    image:
      "https://upload.wikimedia.org/wikipedia/en/4/4d/The_Game_Changers_-_poster.jpg",
    quotes: {
      sentence:
        "People ask, 'How can you get as strong as an ox without eating meat?' and my response is: 'Have you ever seen an ox eat meat?'",
      citation:
        "https://natewashington1012.medium.com/documentary-film-review-the-game-changers-by-nate-washington-a8084fecaad2",
      source: "Patrik Baboumian (Bodybuilder in the film)",
    },
  },
  {
    uid: "06",
    name: "Sadia Badiei (Pick Up Limes)",
    type: "Person",
    description:
      "Sadia Badiei is a registered dietitian and the creative force behind Pick Up Limes, a platform dedicated to the philosophy of 'nourishing the soul' through plant-based living and minimalism. Based in the Netherlands, Sadia utilizes her professional background in nutrition to provide evidence-based advice that is both practical and deeply aesthetic. Her content emphasizes a 'gentle' approach to veganism, advocating for self-compassion and gradual lifestyle shifts rather than perfection, reaching millions through her calming and educational YouTube presence.",
    source: "https://www.pickuplimes.com/",
    image:
      "https://www.pickuplimes.com/static/images/about/about_page_cooking_kitchen_001.d44c304d3e81.jpg",
    quotes: {
      sentence:
        "If we don't take care of ourselves, we can't take care of anyone or anything else. Self-care is a prerequisite for compassion.",
      citation: "https://www.youtube.com/watch?v=GnGKtoFAfhA",
      source: "The Leap Documentary Interview",
    },
  },
  {
    uid: "07",
    name: "Joaquin Phoenix",
    type: "Person",
    description:
      "Joaquin Phoenix is an Academy Award-winning actor and a fierce advocate for animal liberation. A vegan since childhood, Phoenix uses his global platform to expose the systemic cruelty of the animal agriculture industry. His activism includes narrating seminal documentaries like 'Earthlings' and 'Dominion' and delivering a powerful plea for animal rights during his 2020 Oscars acceptance speech, which remains one of the most culturally significant moments for the movement in the modern era.",
    source: "https://www.peta.org/",
    image:
      "https://plantbasednews.org/app/uploads/2023/07/plant-based-news-joaquin-phoenix-vegan.jpg",
    quotes: {
      sentence:
        "We feel entitled to artificially inseminate a cow and when she gives birth, we steal her baby, even though her cries of anguish are unmistakable.",
      citation:
        "https://www.hollywoodreporter.com/news/general-news/joaquin-phoenixs-oscars-speech-full-read-moving-animal-rights-plea-1277670/",
      source: "92nd Academy Awards (Oscars) Speech",
    },
  },

  {
    uid: "9",
    name: "The Biggest Lie About Veganism",
    type: "Video",
    description:
      "Exposing the biggest lies ever told about animals, food and veganism. My full talk from Vegan Camp Out 2025.",
    source: "https://www.youtube.com/embed/eAB5w_i8orw?si=_EBD3KPGN1P3-s-O",
    quotes: {},
  },
  {
    uid: "10",
    name: "Cowspiracy",
    type: "Documentary",
    description:
      "Cowspiracy: The Sustainability Secret is a groundbreaking documentary directed by Kip Andersen and Keegan Kuhn that fundamentally changed the environmental conversation surrounding veganism. The film follows Andersen as he investigates the environmental impact of animal agriculture, revealing it to be a leading cause of deforestation and greenhouse gas emissions. It frames plant-based eating as the single most effective action an individual can take to mitigate climate change and ecological destruction.",
    source: "https://www.cowspiracy.com/",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.jadPRVeg45PS1UKdddiiogHaEK%3Fpid%3DApi&f=1&ipt=dc4cdadadb97191821e7cccfab45c65a5a1d50eb500cc672016404a311a17c95&ipo=images",
    quotes: {
      sentence:
        "This documentary will play a major role in the movement to preserve our planet and its inhabitants. It is the film that environmental organizations don't want you to see.",
      citation: "https://www.cowspiracy.com/about",
      source: "Leonardo DiCaprio (Executive Producer)",
    },
  },
  {
    uid: "11",
    name: "Tracye McQuirter",
    type: "Person",
    description:
      "Tracye McQuirter is a public health nutritionist and a pioneer in the Black vegan movement who has been vegan for over 35 years. She is the author of 'By Any Greens Necessary,' the first vegan transition book specifically for Black women. She founded the '10 Million Black Vegan Women' movement, a social impact initiative aimed at helping one million Black women go vegan every year, viewing healthy eating as an act of heritage and health empowerment.",
    source: "https://byanygreensnecessary.com/",
    image: "",
    quotes: {
      sentence:
        "I saw a cow on a factory farm, through the slaughter process, to a fast food restaurant, to a clogged artery, to a heart attack. It made me question every 'ism' I knew.",
      citation:
        "https://responsibleeatingandliving.com/favorites/part-i-tracye-mcquirter-interview/",
      source: "Interview on REAL Radio",
    },
  },
  {
    uid: "12",
    name: "Richa Hingle (Vegan Richa)",
    type: "Person",
    description:
      "Richa Hingle is the award-winning creator of Vegan Richa, specializing in Indian-inspired plant-based cuisine. Her work is essential for those looking to master complex spices and traditional techniques without animal products. Richa’s recipes are known for their reliability and depth of flavor. Beyond her culinary contributions, she is a dedicated animal rights advocate, frequently using her platform to promote animal adoption and prove that food choice is not about giving up flavor, but finding something better.",
    source: "https://www.veganricha.com/",
    image: "https://www.veganricha.com/wp-content/uploads/2021/09/me.jpeg",
    quotes: {
      sentence:
        "I realized I couldn't directly or indirectly cause extreme suffering and death of any other animal or human when there are alternatives.",
      citation: "https://www.veganricha.com/about-contact/",
      source: "Vegan Richa: Why Vegan (Personal Story)",
    },
  },
  {
    uid: "13",
    name: "Joey Carbstrong",
    type: "Person",
    description:
      "Joey Carbstrong is an Australian animal rights activist known for his direct and uncompromising style of advocacy. His transformation from a former gang member to a dedicated advocate for animal liberation has inspired a global following. Carbstrong’s work focuses on the ethical inconsistencies of animal consumption, using logical consistency to challenge the public. He has recently shifted toward long-form documentary filmmaking to expose industrial farming practices globally.",
    source: "https://www.joeycarbstrong.com/",
    image:
      "https://i0.wp.com/letsgovegan.com.au/wp-content/uploads/2019/07/194781358_357319005754049_7194086322388180538_n.jpeg?w=768&ssl=1",
    quotes: {
      sentence:
        "Anyone who says that life matters less to animals than it does to us has not held in his hands an animal fighting for its life.",
      citation: "https://www.animalmatters.org/quotes/general/",
      source: "Street Outreach Testimony",
    },
  },
  {
    uid: "15",
    name: "Earthlings",
    type: "Documentary",
    description:
      "Earthlings is a 2005 documentary film, narrated by Joaquin Phoenix, that provides a comprehensive look at humanity's use of animals as economic resources across five sectors: pets, food, clothing, entertainment, and scientific research. Using hidden cameras and archival footage, it exposes the systematic cruelty of these industries. Often referred to as the 'vegan-maker' due to its profound emotional impact, the film remains a vital foundational resource for the animal rights movement.",
    source: "http://www.nationearth.com/",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%2Fid%2FOIP.0_gXPFbAABTC4EW1sN_c9QHaEK%3Fpid%3DApi&f=1&ipt=518dd341aa01c954da357824ba2b85a117d8c7e242660d084626ae7e3c39aabb&ipo=images",
    quotes: {
      sentence:
        "For those who watch Earthlings, the world will never be the same.",
      citation: "https://en.wikipedia.org/wiki/Earthlings_(film)",
      source: "Tom Regan (Philosopher)",
    },
  },
  {
    uid: "14",
    name: "Easy Guide To Veganism",
    type: "Video",
    description:
      " If you are new to veganism then you are in the right place!  Get all our tips that made it easy for us to not only go vegan but stay vegan. In this video we walk you through our easy guide to veganism with 10 tips to go vegan long term!",
    source: "https://www.youtube.com/embed/fR6Ftk0wVgY?si=294g-a2Wi1tYbo11",
    image: "",
    quotes: {
      sentence:
        "Where do you get your protein from?! “Looks right at the camera” 🤣 My answer to that question is “where your protein gets its protein” LOL! Works every time!",
      citation: "",
      source: "@Michellebbarton",
    },
  },

  {
    uid: "16",
    name: "Physicians Committee for Responsible Medicine (PCRM)",
    type: "Organization",
    description:
      "The Physicians Committee for Responsible Medicine is a non-profit organization that promotes preventive medicine, conducts clinical research, and advocates for higher standards in ethics and effectiveness in research. PCRM is most notably recognized for its work in promoting the plant-based diet for disease prevention and for its efforts to reform the American dietary landscape through science-driven policy and public education.",
    source: "https://www.pcrm.org/",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pcrm.org%2Fthemes%2Fcustom%2Fpcrm%2Fimages%2Fmeta%2Fog-image.jpg&f=1&nofb=1&ipt=55e76f407afdcc21d3e45a96976d6746a753119ac20db690aaa9ce26c8f67a60",
    quotes: {
      sentence:
        "The scientific evidence is clear: the most effective way to prevent and reverse many chronic diseases is through a whole-food, plant-based diet.",
      citation: "https://www.pcrm.org/about-us",
      source: "Organization Mission Statement",
    },
  },
  {
    uid: "17",
    name: "Tabitha Brown",
    type: "Person",
    description:
      "Tabitha Brown is an actress, author, and social media sensation who has been dubbed 'America’s Mom' for her warm and encouraging approach to veganism. Her rise to fame began with a viral video of a vegan sandwich, but it was her infectious joy that cemented her status as a cultural icon. Brown’s influence is particularly significant for the Black community, where she has been a vocal advocate for the health benefits of a plant-based diet, sharing how it helped her overcome chronic illness and fatigue.",
    source: "https://www.iamtabithabrown.com/",
    image:
      "https://images.squarespace-cdn.com/content/v1/5e3b2f0d73fa6516dafc2f8c/d34ffc09-7720-4ab2-bcbb-72d6477fe125/MicrosoftTeams-image.png?format=2500w",
    quotes: {
      sentence:
        "If you don't trust yourself to cook without measurements, that means you don't trust yourself to make decisions. You've got to trust your spirit.",
      citation:
        "https://www.forksoverknives.com/people/tabitha-brown-on-healing-cooking-from-the-heart-and-tiktok/",
      source: "Forks Over Knives Interview",
    },
  },
  {
    uid: "18",
    name: "Dr. Neal Barnard",
    type: "Person",
    description:
      "Dr. Neal Barnard is a physician and the founding president of the Physicians Committee for Responsible Medicine (PCRM). He is a leading authority on the role of nutrition in preventing and treating chronic diseases. Dr. Barnard has led numerous clinical trials and published over 20 books, providing the medical community with evidence-based strategies for plant-based nutrition. He also campaigns to replace animal testing with more effective, human-based research methods.",
    source: "https://www.pcrm.org/",
    image:
      "https://www.pcrm.org/sites/default/files/styles/medium/public/2023-05/Neal%20Barnard%2C%20MD%2C%20FACC%20%281%29.jpg?itok=vDUaO1H4",
    quotes: {
      sentence:
        "The beef industry has contributed to more American deaths than all the wars of this century combined. If beef is your idea of 'real food,' you’d better live near a good hospital.",
      citation: "https://www.pcrm.org/about-us/staff/neal-barnard-md-facc",
      source: "Official Professional Profile",
    },
  },
];
export default function Resources() {
  return (
    <div className="columns-4 p-5 relative bg-linear-to-t from-accent from-70 via-tertiary  via-30 to-white to-0">
      {resourceData.map((rd) => {
        return (
          <div
            className="bg-white border border-gray-200 rounded-2xl p-6 mb-5 break-inside-avoid  cursor-pointer "
            onClick={() => window.open(rd.source)}
          >
            <div className="heading-font text-2xl mb-10 text-primary">
              {rd.name}
            </div>
            {rd.image ? (
              <div
                className={` mb-4
                  ${rd.type === "Person" ? "profile rounded-full" : ""}`}
              >
                <img
                  src={rd.image}
                  className={` w-full
                  ${rd.type === "Person" ? "rounded-full" : "drop-shadow-lg drop-shadow-accent"}`}
                />
              </div>
            ) : (
              <></>
            )}
            {rd.type === "Video" ? (
              <div className="mb-4">
                <iframe
                  src={rd.source}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                ></iframe>
              </div>
            ) : (
              <></>
            )}
            <div className="line-clamp-7 ">{rd.description}</div>

            {rd.quotes?.sentence ? (
              <div className="bg-accent p-6 rounded-2xl mt-4 ">
                <blockquote cite={rd.quotes.citation}>
                  {rd.quotes.sentence}
                </blockquote>
                - {rd.quotes.source}
              </div>
            ) : (
              <></>
            )}
          </div>
        );
      })}
    </div>
  );
}
