import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useRecipeStore } from "../store/recipesStore";

import L from "leaflet";

const treeIcon = L.divIcon({
  html: `<div style="font-size: 3rem; line-height: 1;">🌳</div>`,
  className: "dummy-none",
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -24],
});

const lemonIcon = L.divIcon({
  html: `<div style="font-size: 2rem; line-height: 1;">🍋</div>`,
  className: "dummy-none",
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -24],
});

export default function Events() {
  const getCityCoords = useRecipeStore((state) => state.getCityCoords);
  const db = useRecipeStore((state) => state.db);
  const [eventsData, setEventsData] = useState<eventIF[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  interface eventIF {
    id: string;
    title: string;
    subtitle?: string | null;
    description?: string;
    start: string;
    end: string;
    category?: string | null;
    country?: string;
    state?: string;
    city?: string;
    venueName?: string;
    isVirtual: boolean;
    image?: string | null;
    website?: string;
    coords?: { lat: number; lng: number };
    [key: string]: any;
  }

  const dummy = [
    {
      id: "evt_5498dc5abd2e4b1fa3c6da4c79d38532",
      title: "VEGAN T-SHIRTS , HOODIES AND MORE",
      subtitle: null,
      description:
        "Score cool vegan tees, hoodies, and accessories online—style up and support cruelty-free vibes!",
      start: "2026-12-31T18:00:00",
      end: "2026-12-31T20:00:00",
      timezone: "UTC",
      category: "Other",
      attendance: null,
      labels: null,
      country: "United States",
      state: null,
      city: null,
      venueName: "Online",
      address: "Online",
      lat: 0,
      lon: 0,
      isVirtual: true,
      eventUrl:
        "https://www.eventbrite.com/e/vegan-t-shirts-hoodies-and-more-tickets-1981463591943",
      registrationUrl:
        "https://www.eventbrite.com/e/vegan-t-shirts-hoodies-and-more-tickets-1981463591943",
      facebookLink: null,
      instagramLink: null,
      image:
        "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F1175697834%2F99238793657%2F1%2Foriginal.20260124-005039?crop=focalpoint&fit=crop&w=480&auto=format%2Ccompress&q=75&sharp=10&fp-x=0.5&fp-y=0.5&s=bbe33a8d4ebdb29319f123f6a2fa1828",
      bannerImage: null,
      isFreeEvent: true,
      ticketPrice: null,
      ticketCurrency: "USD",
      maxCapacity: null,
      organizerName: "Anti Dairy Social Club",
      organizerContact: null,
      organizerWebsite:
        "https://www.eventbrite.com/o/anti-dairy-social-club-14834439240",
      publishStatus: "approved",
      moderationNotes: "",
      providerSource: "VexVegan",
      externalEventId: null,
      externalProviderId: null,
      isImported: false,
      importedAt: null,
      createdByUserId: "7e931794-e725-4af2-8494-356f7260a548",
      createdAt: "2026-03-11T05:23:38.1423742",
      updatedAt: "2026-03-11T05:23:52.3086297",
      isExpired: false,
    },
    {
      id: "evt_80729edd21704b50ae5a76863ce638ab",
      title: "RAW TILL 4 GHANA RETREAT",
      subtitle: null,
      description:
        "If you’ve been feeling called to Africa, this might be your moment. This year I am hosting only three retreats worldwide. Ghana. Jamaica. Panama. And anyone who joins a retreat with me in 2026 will receive lifetime access to my private Inner Circle where I share deeper teachings on fasting, detox and health that are not available publicly. The first experience opens today. RAW TILL 4 GHANA RETREAT 7 nights in the Motherland to reset your body and reconnect with yourself: Sunrise workouts on Labadi Beach, Fresh tropical fruit flowing all day, Unlimited coconut water & healing juices, Herbal medicine walk in Aburi Botanical Gardens, Traditional African drumming ceremony, Raw food & juice masterclasses with Victoria Everest, Makola Market fruit and spice experience, Coconut farm visit near Kokrobite Beach, Shea Butter Museum cultural tour, Spa treatments & sunset breathwork, Luxury retreat villa with pool and relaxation spaces. Guests follow the Raw Till 4 detox protocol, supported by tropical fruits, fresh juices, daily movement and wellness workshops. In just one week many people experience: Increased hydration, Higher energy levels, Reduced body fat markers, Improved digestion. This retreat is intentionally very small. Only 8 spaces exist so the experience stays intimate and transformational.",
      start: "2026-12-07T00:00:00",
      end: "2026-12-14T00:00:00",
      timezone: "UTC",
      category: "Retreat",
      attendance: null,
      labels: ["Wellness", "Detox", "Health", "African Experience"],
      country: "Ghana",
      state: null,
      city: "Accra",
      venueName: "Luxury Retreat Villa",
      address: "Accra, Ghana",
      lat: 0,
      lon: 0,
      isVirtual: false,
      eventUrl:
        "https://www.instagram.com/reel/DV1B2z2jKXB/?igsh=MTB3cnA4dHF3dWFzcA==",
      registrationUrl: null,
      facebookLink: null,
      instagramLink: "https://www.instagram.com/reel/DV1B2z2jKXB/",
      image:
        "https://scontent-lhr8-1.cdninstagram.com/v/t51.71878-15/651486675_906796425534909_4880996038268306068_n.jpg?stp=cmp1_dst-jpg_e35_s640x640_tt6&_nc_cat=108&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0xJUFMuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ==&_nc_ohc=PnxrBXVbNjsQ7kNvwGsHDm3&_nc_oc=AdkRNT6ert_YH-aW828x95IvQaJG4JrikqtW_QiocE1siAj-w3GoyKMOhH9opB7g4nE&_nc_zt=23&_nc_ht=scontent-lhr8-1.cdninstagram.com&_nc_gid=4e9sxJiGuywQt5PSgzdKGQ&_nc_ss=8&oh=00_AfzMRL29S7N01E6AjKemiiI7nMOiOVyJYxB_aMTCjzV4MA&oe=69BABA9C",
      bannerImage: null,
      isFreeEvent: false,
      ticketPrice: null,
      ticketCurrency: null,
      maxCapacity: 8,
      organizerName: "Victoria Everest",
      organizerContact: null,
      organizerWebsite: null,
      publishStatus: "approved",
      moderationNotes: "",
      providerSource: "VexVegan",
      externalEventId: null,
      externalProviderId: null,
      isImported: false,
      importedAt: null,
      createdByUserId: "32c2a043-dd8c-40de-bf8d-b97b8ba5ad4e",
      createdAt: "2026-03-14T02:57:39.9594357",
      updatedAt: "2026-03-14T02:57:51.2740807",
      isExpired: false,
    },
    {
      id: "evt_e8cf7111d88544d1ab73aecbc33f864f",
      title: "Festival Ladera Sur",
      subtitle: null,
      description:
        "Con alegría les contamos el @laderasurfest confirma su 5ta edición este 2026 ‼️‼️‼️ GUARDA LA FECHA ‼️ SAVE THE DATE ‼️ 13 14 15 de noviembre ‼️ Parque Santa Rosa de Apoquindo, Santiago de Chile. Este año cumplimos 5 años y celebraremos como se debe 🤘😍😎 Pronto más información🤩 #laderasur #laderausfest",
      start: "2026-11-13T00:00:00",
      end: "2026-11-15T23:59:59",
      timezone: "UTC",
      category: "Festival",
      attendance: 2321,
      labels: ["laderasur", "laderausfest"],
      country: "Chile",
      state: null,
      city: "Santiago",
      venueName: "Parque Santa Rosa de Apoquindo",
      address: "Parque Santa Rosa de Apoquindo, Santiago, Chile",
      lat: 0,
      lon: 0,
      isVirtual: false,
      eventUrl: "https://www.instagram.com/p/DWxH9PVjxWN/",
      registrationUrl: null,
      facebookLink: null,
      instagramLink: "https://www.instagram.com/laderasurfest",
      image:
        "https://scontent-ord5-2.cdninstagram.com/v/t51.82787-15/659169520_18027312926807125_5828651063716631719_n.jpg",
      bannerImage:
        "https://scontent-ord5-2.cdninstagram.com/v/t51.82787-15/659169520_18027312926807125_5828651063716631719_n.jpg",
      isFreeEvent: false,
      ticketPrice: null,
      ticketCurrency: null,
      maxCapacity: null,
      organizerName: "laderasurfest",
      organizerContact: null,
      organizerWebsite: null,
      publishStatus: "approved",
      moderationNotes: "",
      providerSource: "VexVegan",
      externalEventId: null,
      externalProviderId: null,
      isImported: false,
      importedAt: null,
      createdByUserId: "32c2a043-dd8c-40de-bf8d-b97b8ba5ad4e",
      createdAt: "2026-04-10T01:24:57.6881636",
      updatedAt: "2026-04-10T01:25:05.1306408",
      isExpired: false,
    },
    {
      id: "evt_436a6cfbe2b54102a6c704bba09c0a52",
      title: "Green Market Festival",
      subtitle: null,
      description:
        "Sì, è vero 🥰 stiamo organizzando un favoloso festival vegan, e sarà a novembre a Roma. No, non a testaccio... in un posto fighissimo 😍",
      start: "2026-11-01T00:00:00",
      end: "2026-11-01T23:59:59",
      timezone: "UTC",
      category: "Festival",
      attendance: null,
      labels: null,
      country: "Italy",
      state: null,
      city: "Rome",
      venueName: "Unknown Venue",
      address: "Rome, Italy",
      lat: 0,
      lon: 0,
      isVirtual: false,
      eventUrl: "https://www.instagram.com/p/DWWh2c7jMyq/",
      registrationUrl: "https://www.instagram.com/_vegan_village",
      facebookLink: null,
      instagramLink: "https://www.instagram.com/_vegan_village",
      image:
        "https://scontent-lhr6-1.cdninstagram.com/v/t51.82787-15/656295223_18099401854985115_7071883327656258976_n.heic",
      bannerImage:
        "https://scontent-lhr6-1.cdninstagram.com/v/t51.82787-15/656295223_18099401854985115_7071883327656258976_n.heic",
      isFreeEvent: true,
      ticketPrice: null,
      ticketCurrency: null,
      maxCapacity: null,
      organizerName: "greenmarketfestival",
      organizerContact: null,
      organizerWebsite: null,
      publishStatus: "approved",
      moderationNotes: "",
      providerSource: "VexVegan",
      externalEventId: null,
      externalProviderId: null,
      isImported: false,
      importedAt: null,
      createdByUserId: "32c2a043-dd8c-40de-bf8d-b97b8ba5ad4e",
      createdAt: "2026-04-02T16:04:49.4476937",
      updatedAt: "2026-04-02T16:04:56.8897811",
      isExpired: false,
    },
    {
      id: "evt_cec8880995cd4245b8dd5670e592ec2c",
      title: "VeganCheck - Vegan Food Fair",
      subtitle: "Experience Melting Vegan Cheese",
      description:
        "Veganer Käse, der schmilzt?! Join the Vegan Food Fair in Düsseldorf, Hamburg, and München. Discover various vegan products and more.",
      start: "2026-10-17T00:00:00",
      end: "2026-10-18T23:59:59",
      timezone: "UTC",
      category: "Exhibition",
      attendance: null,
      labels: ["vegan", "food fair", "exhibition"],
      country: "Germany",
      state: null,
      city: "Hamburg",
      venueName: "Vegan Food Fair Hamburg",
      address: "Hamburg, Germany",
      lat: 0,
      lon: 0,
      isVirtual: false,
      eventUrl: "https://www.instagram.com/reel/DWcGGSIiCPG/",
      registrationUrl: null,
      facebookLink: null,
      instagramLink: "https://www.instagram.com/vegan_check/",
      image:
        "https://scontent-lhr8-2.cdninstagram.com/v/t51.82787-15/657393346_18095201450329652_6687724471733086155_n.jpg",
      bannerImage:
        "https://scontent-lhr8-2.cdninstagram.com/v/t51.82787-15/657393346_18095201450329652_6687724471733086155_n.jpg",
      isFreeEvent: true,
      ticketPrice: null,
      ticketCurrency: null,
      maxCapacity: null,
      organizerName: "Vegan Check",
      organizerContact: null,
      organizerWebsite: null,
      publishStatus: "approved",
      moderationNotes: "",
      providerSource: "VexVegan",
      externalEventId: null,
      externalProviderId: null,
      isImported: false,
      importedAt: null,
      createdByUserId: "32c2a043-dd8c-40de-bf8d-b97b8ba5ad4e",
      createdAt: "2026-03-29T18:27:19.5420944",
      updatedAt: "2026-03-29T18:27:28.1194863",
      isExpired: false,
    },
    {
      id: "evt_246605e8184f4a1dafaf19034ffa0f7f",
      title: "SALT Queer Pride Weekend",
      subtitle: null,
      description:
        "We’re taking over the beach. SALT Queer Pride Weekend Montego Bay | Oct 16–19 (Heroes Weekend) Artwork by @plaidpuma #SALT #QueerHeroesWeekend #Queertego #Sapphic #SapphicxQueertego #jamaica",
      start: "2026-10-16T00:00:00",
      end: "2026-10-19T23:59:59",
      timezone: "UTC",
      category: "Festival",
      attendance: null,
      labels: [
        "SALT",
        "QueerHeroesWeekend",
        "Queertego",
        "Sapphic",
        "SapphicxQueertego",
        "jamaica",
      ],
      country: "Jamaica",
      state: null,
      city: "Montego Bay",
      venueName: "Montego Bay Beach",
      address: "Montego Bay, Jamaica",
      lat: 0,
      lon: 0,
      isVirtual: false,
      eventUrl: "https://www.instagram.com/sapphicja/p/DWryiFDEYby/",
      registrationUrl: null,
      facebookLink: null,
      instagramLink: "https://www.instagram.com/sapphicja/",
      image:
        "https://scontent-sin6-2.cdninstagram.com/v/t51.82787-15/658521462_18040508264768932_6317120241912646927_n.jpg?stp=c270.0.810.810a_dst-jpg_e35_s640x640_tt6&_nc_cat=109&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=_bt3TN5pw9MQ7kNvwGPH24J&_nc_oc=AdqYkRwKlexeyGUdI2sc3d3Lo8Q4nbiHDbmeI6ZjeOwZOcAJAkVC5hC48GcszS7eF40&_nc_zt=23&_nc_ht=scontent-sin6-2.cdninstagram.com&_nc_gid=XlipMchh1sspr9txDA5Jvg&_nc_ss=7a30f&oh=00_Af0N80v6-1ngxB_6ORhOA1ANogUSXksO9SBQ0FrAHBXukQ&oe=69D7906E",
      bannerImage: null,
      isFreeEvent: true,
      ticketPrice: null,
      ticketCurrency: null,
      maxCapacity: null,
      organizerName: "Sapphic Ja",
      organizerContact: null,
      organizerWebsite: "https://www.instagram.com/sapphicja/",
      publishStatus: "approved",
      moderationNotes: "",
      providerSource: "VexVegan",
      externalEventId: null,
      externalProviderId: null,
      isImported: false,
      importedAt: null,
      createdByUserId: "32c2a043-dd8c-40de-bf8d-b97b8ba5ad4e",
      createdAt: "2026-04-05T02:43:59.956967",
      updatedAt: "2026-04-05T02:44:12.6045237",
      isExpired: false,
    },
    {
      id: "evt_daecb9cddff7411ca15812680fc6391d",
      title: "N.C. State Fair",
      subtitle: null,
      description:
        'Exciting news! This year at the 2026 N.C. State Fair, taking place Oct. 15-25th, a new class will be added in the Vegetables, Fruits and Nuts competition department called "Most Unusual African Vegetable." Any African Vegetable can be grown to enter into the competition, so start planning what you will enter today! More information will be released this summer regarding this competition and all others for the 2026 N.C. State Fair.',
      start: "2026-10-15T00:00:00",
      end: "2026-10-25T00:00:00",
      timezone: "UTC",
      category: "Festival",
      attendance: null,
      labels: ["#NCStateFair"],
      country: "United States",
      state: "North Carolina",
      city: null,
      venueName: "N.C. State Fair",
      address: "1025 Blue Ridge Rd, Raleigh, NC 27607, USA",
      lat: 0,
      lon: 0,
      isVirtual: false,
      eventUrl: "https://www.instagram.com/p/DWEZDPtDL8F/",
      registrationUrl: null,
      facebookLink: null,
      instagramLink: "https://www.instagram.com/ncstatefair",
      image:
        "https://scontent-lhr6-2.cdninstagram.com/v/t39.30808-6/653700195_1473180577505697_985419976374056030_n.jpg?stp=c179.0.537.537a_dst-jpg_e35_s640x640_tt6&_nc_cat=100&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=qe2sHCZ6_m8Q7kNvwG3-Pkf&_nc_oc=Adq16Lxzsl8SvdElo77nXePL1oGfL4V8MMn-biOfvJi24nO9pDzuS-P81J8k-XnNRvM&_nc_zt=23&_nc_ht=scontent-lhr6-2.cdninstagram.com&_nc_gid=B6f1AajYnPsIG-QlEuZGaA&_nc_ss=7a30f&oh=00_AfyBmJQ9CRZPylrb0ESbArip_m_lGJRoCqfwd72_CHjt1Q&oe=69C7BA70",
      bannerImage: null,
      isFreeEvent: false,
      ticketPrice: null,
      ticketCurrency: null,
      maxCapacity: null,
      organizerName: "N.C. State Fair",
      organizerContact: null,
      organizerWebsite: null,
      publishStatus: "approved",
      moderationNotes: "",
      providerSource: "VexVegan",
      externalEventId: null,
      externalProviderId: null,
      isImported: false,
      importedAt: null,
      createdByUserId: "32c2a043-dd8c-40de-bf8d-b97b8ba5ad4e",
      createdAt: "2026-03-24T02:12:58.5744432",
      updatedAt: "2026-03-24T02:13:16.6392965",
      isExpired: false,
    },
    {
      id: "evt_eb4687653acc47d093b4ad4b46ccc78b",
      title: "Compassionfest 2026",
      subtitle: null,
      description:
        "Save the Date! The 9th Annual Compassionfest will be Sunday, October 4 from 10 am to 5 pm at a new, larger venue!",
      start: "2026-10-04T14:00:00",
      end: "2026-10-04T21:00:00",
      timezone: "America/New_York",
      category: "Festival",
      attendance: null,
      labels: ["Vegan", "Community", "Sustainability"],
      country: "US",
      state: "CT",
      city: "New Haven",
      venueName: "Moore Field House",
      address: "Wintergreen Avenue, New Haven, CT 06515",
      lat: 41.3353735,
      lon: -72.9513163,
      isVirtual: false,
      eventUrl:
        "https://www.eventbrite.com/e/compassionfest-2026-tickets-1983494521508",
      registrationUrl:
        "https://www.eventbrite.com/e/compassionfest-2026-tickets-1983494521508",
      facebookLink: null,
      instagramLink: null,
      image:
        "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F1178750032%2F373194279553%2F1%2Foriginal.20260302-002544?crop=focalpoint&fit=crop&w=480&auto=format%2Ccompress&q=75&sharp=10&fp-x=0.037&fp-y=0.521&s=f579f94877158fdd78d6c20564e85deb",
      bannerImage: null,
      isFreeEvent: true,
      ticketPrice: 0,
      ticketCurrency: "USD",
      maxCapacity: null,
      organizerName: "Connecticut Vegan Center",
      organizerContact: null,
      organizerWebsite:
        "https://www.eventbrite.com/o/connecticut-vegan-center-113085821061",
      publishStatus: "approved",
      moderationNotes: "",
      providerSource: "VexVegan",
      externalEventId: null,
      externalProviderId: null,
      isImported: false,
      importedAt: null,
      createdByUserId: "7e931794-e725-4af2-8494-356f7260a548",
      createdAt: "2026-03-12T09:06:59.0689534",
      updatedAt: "2026-03-12T09:07:06.3832017",
      isExpired: false,
    },
    {
      id: "evt_4b0e2e4fa8a045929ad92ba07147719a",
      title: "Vegan on the Aegean Greece",
      subtitle: null,
      description:
        "REMINDER TO BOOK YOUR 2026 GETAWAY NOW! ✈️ ALL LINKS IN OUR BIO 🔗 While some Getaways are completely sold out, we still have remaining spots on our spring European Getaways as well as Bali 🌎 You'll experience a curated #plantbased holiday with our AMAZING host partners and local tour leaders! All YOU have to do is book your flight, pack your bags, and we take care of the rest! All accommodation, activities, vegan food, cooking demonstrations, excursions and more are organized for you, so you can sit back, relax and hang out with all of your new friends in a stunning destination! MUST BE 21 AND OLDER TO ATTEND FLIGHTS NOT INCLUDED. If you have any questions don’t hesitate to send us a DM! We can’t wait to meet you on a magical #vegan adventure very soon ✨ #thegetawayco #grouptravel #vegantravel.",
      start: "2026-10-03T00:00:00",
      end: "2026-10-10T00:00:00",
      timezone: "UTC",
      category: "Travel",
      attendance: null,
      labels: ["plantbased", "holiday", "vegan", "grouptravel", "vegantravel"],
      country: "Greece",
      state: null,
      city: null,
      venueName: "The Aegean",
      address: "The Aegean, Greece",
      lat: 0,
      lon: 0,
      isVirtual: false,
      eventUrl:
        "https://www.instagram.com/p/DW37BapFhtm/?igsh=N2ttNW1nNm0yY2Q1",
      registrationUrl: null,
      facebookLink: null,
      instagramLink: "https://www.instagram.com/thegetawayco",
      image:
        "https://scontent-ord5-3.cdninstagram.com/v/t51.82787-15/658378073_18263205208288541_4552561220837999155_n.jpg?stp=c216.0.648.648a_dst-jpg_e35_s640x640_tt6&_nc_cat=106&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=jCh1QyPVz6wQ7kNvwEef83h&_nc_oc=AdqyUOgWcYYdJMQ0WQ5YZTJ-vYerZ4eAc_LOm0Ay5yYRmp19ngiTF-4wMiN5eHegfWg&_nc_zt=23&_nc_ht=scontent-ord5-3.cdninstagram.com&_nc_gid=UlFEHTy4cLEyC2gY-Ut6Zg&_nc_ss=7a30f&oh=00_Af1pSl9DUNQmTa2MWJZ1__Y7KFZFYvb7W1GChJSbkL8O5g&oe=69DDBA82",
      bannerImage: null,
      isFreeEvent: false,
      ticketPrice: null,
      ticketCurrency: null,
      maxCapacity: null,
      organizerName: "The Getaway Co.",
      organizerContact: null,
      organizerWebsite: null,
      publishStatus: "approved",
      moderationNotes: "",
      providerSource: "VexVegan",
      externalEventId: null,
      externalProviderId: null,
      isImported: false,
      importedAt: null,
      createdByUserId: "32c2a043-dd8c-40de-bf8d-b97b8ba5ad4e",
      createdAt: "2026-04-09T16:03:24.1250324",
      updatedAt: "2026-04-09T16:03:30.0577146",
      isExpired: false,
    },
    {
      id: "evt_1d2ebaebfb684f17ba536cae7c01b036",
      title: "Vegan on the Aegean Greece",
      subtitle: null,
      description:
        "REMINDER TO BOOK YOUR 2026 GETAWAY NOW! ✈️ ALL LINKS IN OUR BIO 🔗\n\nWhile some Getaways are completely sold out, we still have remaining spots on our spring European Getaways as well as Bali 🌎 You’ll experience a curated #plantbased holiday with our AMAZING host partners and local tour leaders! All YOU have to do is book your flight, pack your bags, and we take care of the rest! All accommodation, activities, vegan food, cooking demonstrations, excursions and more are organized for you, so you can sit back, relax and hang out with all of your new friends in a stunning destination! 🇳🇴🇯🇵🇭🇷🇨🇭🇮🇹🇵🇹🇬🇷\n\nMUST BE 21 AND OLDER TO ATTEND\nFLIGHTS NOT INCLUDED\n\nIf you have any questions don’t hesitate to send us a DM! We can’t wait to meet you on a magical #vegan adventure very soon ✨",
      start: "2026-10-03T00:00:00",
      end: "2026-10-10T23:59:59",
      timezone: "UTC",
      category: "Festival",
      attendance: null,
      labels: [
        "vegan",
        "plantbased",
        "travel",
        "adventure",
        "cooking",
        "holiday",
      ],
      country: "Greece",
      state: null,
      city: null,
      venueName: "The Getaway Co.",
      address: "Greece",
      lat: 0,
      lon: 0,
      isVirtual: false,
      eventUrl:
        "https://www.instagram.com/p/DW37BapFhtm/?igsh=MWYzbWh6MHhsazA3bg==",
      registrationUrl: null,
      facebookLink: null,
      instagramLink: "https://www.instagram.com/thegetawayco/",
      image:
        "https://scontent-dfw6-1.cdninstagram.com/v/t51.82787-15/658378073_18263205208288541_4552561220837999155_n.jpg?stp=c216.0.648.648a_dst-jpg_e35_s640x640_tt6&_nc_cat=106&ccb=7-5&_nc_sid=18de74",
      bannerImage: null,
      isFreeEvent: false,
      ticketPrice: null,
      ticketCurrency: null,
      maxCapacity: null,
      organizerName: "The Getaway Co.",
      organizerContact: null,
      organizerWebsite: "https://www.instagram.com/thegetawayco/",
      publishStatus: "approved",
      moderationNotes: "",
      providerSource: "VexVegan",
      externalEventId: null,
      externalProviderId: null,
      isImported: false,
      importedAt: null,
      createdByUserId: "32c2a043-dd8c-40de-bf8d-b97b8ba5ad4e",
      createdAt: "2026-04-11T23:54:27.5406745",
      updatedAt: "2026-04-11T23:54:39.1395811",
      isExpired: false,
    },
  ];
  function LocationMarker() {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
      locationfound(e) {
        if (!position) {
          setPosition(e.latlng);
          map.flyTo(e.latlng, map.getZoom());
        }
      },
      locationerror(e) {
        console.error("Location access denied or failed", e.message);
      },
    });

    useEffect(() => {
      map.locate();
    }, [map]);
    return position === null ? null : (
      <Marker position={position} icon={lemonIcon}>
        <Popup closeButton={false}>You are here</Popup>
      </Marker>
    );
  }

  useEffect(() => {
    async function getData() {
      const initialEvents = [...dummy];
      setEventsData(initialEvents);
      for (const event of initialEvents) {
        const coords = await getCityCoords(
          (event.city || event.state || event.country || "")
            .trim()
            .toLowerCase(),
        );

        if (coords) {
          event["coords"] = coords;
          setEventsData((prevEvents) =>
            prevEvents.map((item) =>
              item.id === event.id
                ? { ...item, coords: { lat: coords.lat, lng: coords.lng } }
                : item,
            ),
          );
        }
      }
    }

    getData();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [getCityCoords, db]);

  function ChangeView({ center }: { center: [number, number] }) {
    const map = useMap();
    useEffect(() => {
      map.invalidateSize();
    }, [center, map]);

    return null;
  }

  function getDateString(start: string, end: string): string {
    if (new Date(start).getDate() === new Date(end).getDate()) {
      return `${new Date(start).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })} from ${new Date(start).toLocaleTimeString([], { hour12: true, hour: "2-digit", minute: "2-digit" })} to ${new Date(end).toLocaleTimeString([], { hour12: true, hour: "2-digit", minute: "2-digit" })}`;
    } else {
      return `${new Date(start).toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })} to ${new Date(end).toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })}`;
    }
  }

  return (
    <div className="m-20 bg-linear-to-t from-accent from-70 via-tertiary  via-30 to-white to-0">
      {loading ? (
        <div className="absolute z-100000 left-[50%] top-[50%]">
          <p className="animate-spin text-3xl">🌱</p>
          <p className="font-bold text-xl">Please wait, loading data...</p>
        </div>
      ) : (
        <></>
      )}
      <MapContainer
        center={[51.505, -0.09]}
        zoom={6}
        scrollWheelZoom={true}
        style={{ height: "70vh", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
        />
        {eventsData.map((event) => {
          if (!event.coords || !event.coords.lat || !event.coords.lng) {
            return null;
          }
          return (
            <Marker
              key={`${event.id}-located`}
              position={[event.coords.lat, event.coords.lng]}
              icon={treeIcon}
            >
              <Popup closeButton={false}>
                <div className="text-sm font-sans">
                  <img
                    src={event.image}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src =
                        "https://vexvegan.live/resources/hero-festival.jpg";
                    }}
                    alt=""
                    className="w-full h-20 object-cover rounded mb-2"
                  />

                  <a href={event.organizerWebsite} target="_blank">
                    <strong className="heading-font text-2xl block text-primary">
                      {event.title}
                    </strong>
                  </a>
                  <span>📍 {event.city || event.state || event.country}</span>
                  <p className="text-sm">
                    🗓️ {getDateString(event.start, event.end)}
                  </p>
                  <p className="line-clamp-6"> {event.description}</p>
                </div>
              </Popup>
            </Marker>
          );
        })}

        <LocationMarker />
        <ChangeView center={[51.505, -0.09]} />
      </MapContainer>
    </div>
  );
}
