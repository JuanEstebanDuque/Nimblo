"use client"

import Image from "next/image";
import { CgChevronDown } from "react-icons/cg";
import { FiShare2 } from "react-icons/fi";
import { FiCalendar } from "react-icons/fi";
import { FiLayout } from "react-icons/fi";
import { FiLink2 } from "react-icons/fi";
import React, { useRef, useState, useEffect } from "react";
import Lottie from 'lottie-react';

// Componente para animar la aparición al hacer scroll
const AnimateOnScroll = ({ children }) => {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    const currentElement = elementRef.current;

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
        observer.disconnect();
      }
    };
  }, [elementRef]);


  return (
    <div
      ref={elementRef}
      className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      style={{ transitionDelay: '70ms' }}
    >
      {children}
    </div>
  );
};

// Componente para la card de review
function ReviewCard({ name, role, text, stars, active }) {
  return (
    <div className={`w-[350px] sm:w-[500px] bg-white rounded-xl shadow-lg p-6 flex flex-col gap-4 h-min relative transition-all duration-500 ${active ? "scale-105" : ""}`}>
      <div className="flex items-center gap-3">
        <div className="bg-[#402e7a] rounded-full p-3">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
        </div>
        <div>
          <div className="font-bold text-xl text-black">{name}</div>
          <div className="text-gray-400 text-lg font-light">{role}</div>
        </div>
      </div>
      <div className="text-gray-700 text-lg font-light">{text}</div>
      <div className="flex gap-1 text-[#EAB810] text-2xl">
        {Array(stars).fill(0).map((_, j) => <span key={j}>★</span>)}
        {Array(5 - stars).fill(0).map((_, j) => <span key={j} className="opacity-30">★</span>)}
      </div>
    </div>
  );
}

export default function Home() {
  const solutions = [
    "Team Collaboration",
    "Remote Work",
    "Project Management",
    "Healt and Safety",
    "Productivity Insights",
  ];

  const plans = ["Free Plan", "Pro Plan", "Enterprise", "FAQs"];

  // Reviews extendidas
  const testimonials = [
    { name: "David Lee", role: "Software Engineer at PixelCloud", text: "I love how seamless the integrations are. I don't have to switch between Zoom, Slack, and Google Calendar anymore—everything just works.", stars: 5 },
    { name: "Carla Ruiz", role: "UX Designer at Flow Studio", text: "The productivity tracking and well-being features really help me stay focused and balanced. It's the smartest tool I've used for project work.", stars: 5 },
    { name: "Sarah Mitchell", role: "Product Manager at NovaTech", text: "This app transformed how our team collaborates. Having all tools in one place saved us hours every week and improved our delivery speed.", stars: 5 },
    { name: "Tomás García", role: "Team Lead at HorizonWorks", text: "Onboarding new projects has never been easier. The task and goal system is clear, flexible, and powerful for team coordination.", stars: 4 },
    { name: "Amina Khan", role: "Operations Manager at SyncWave", text: "This tool gave us clarity. We went from using five different apps to just one. Everything feels connected and easy to manage now.", stars: 5 },
    { name: "Lucas Smith", role: "Freelancer", text: "The interface is intuitive and the integrations save me a lot of time. Highly recommended for solo workers!", stars: 4 },
    { name: "Emily Chen", role: "HR Manager at PeopleFirst", text: "Our onboarding process is now much smoother. The analytics and reports are a game changer.", stars: 5 },
    { name: "Ravi Patel", role: "CTO at DevSolutions", text: "The best productivity tool we've tried. The team loves the real-time collaboration features.", stars: 5 },
    { name: "Sophie Dubois", role: "Marketing Lead at Creativa", text: "I can finally keep track of all my campaigns and meetings in one place. The mobile app is also fantastic.", stars: 4 },
    { name: "Marta López", role: "Project Manager at InnoTech", text: "Switching to this platform was the best decision for our remote team. Everything is organized and easy to find.", stars: 5 },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [lottieData, setLottieData] = useState(null);

  const lottieRef = useRef(null);

  const [lottieFilePath, setLottieFilePath] = useState('');

  const bannerRef = useRef(null);
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const sm = 640;
      const md = 768;
      const lg = 1024;
      const xl = 1280;
      const xxl = 1536;

      const width = window.innerWidth;

      if (width >= xxl) {
        setLottieFilePath('/Banner2XL.json');
      } else if (width >= xl) {
        setLottieFilePath('/BannerXL.json');
      } else if (width >= lg) {
        setLottieFilePath('/BannerLG.json');
      } else if (width >= md) {
        setLottieFilePath('/BannerMD.json');
      } else if (width >= sm) {
        setLottieFilePath('/BannerSM.json');
      } else {
        setLottieFilePath('/BannerSM.json'); // Default para tamaños más pequeños
      }
    };

    handleResize();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);


  useEffect(() => {
    if (lottieFilePath) {
      setLottieData(null);
      setHasPlayed(false);
      fetch(lottieFilePath)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => setLottieData(data))
        .catch(error => {
          console.error(`Error loading Lottie animation from ${lottieFilePath}:`, error);
          setLottieData(null);
        });
    }
  }, [lottieFilePath]);


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsBannerVisible(entry.isIntersecting);
        if (entry.isIntersecting && !hasPlayed && lottieRef.current && lottieData) {
          lottieRef.current.goToAndPlay(0, true);
          setHasPlayed(true);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    const currentBanner = bannerRef.current;

    if (currentBanner) {
      observer.observe(currentBanner);
    }

    return () => {
      if (currentBanner) {
        observer.unobserve(currentBanner);
        observer.disconnect();
      }
    };
  }, [bannerRef, hasPlayed, lottieData]);

  // Reset hasPlayed cuando la sección sale del viewport
  useEffect(() => {
    if (!isBannerVisible) {
      setHasPlayed(false);
    }
  }, [isBannerVisible]);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen w-full bg-[#f7f7f7] m-0 p-0">
      {/* SECCIÓN HEADER */}
      <header className="sticky top-0 z-50 w-full bg-[#ececec] border-b-4 shadow flex items-center justify-between px-12 py-4 font-poppins">
        <div className="flex items-center">
          <img src="/Logo.svg" alt="Logo Nimblo" className="h-8 w-auto" />
        </div>
        <nav className="flex items-center gap-16">
          <div className="relative group">
            <button className="flex items-center gap-1 text-lg font-semibold text-[#222] hover:text-[#4b70f5] transition-colors">
              Solutions
              <CgChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute left-0 mt-1 w-min bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none transition-opacity z-50">
              {solutions.map((option, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 text-base text-gray-700 hover:bg-[#ececec] text-nonwrap cursor-pointer transition-colors"
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
          <div className="relative group">
            <button className="flex items-center gap-1 text-lg font-semibold text-[#222] hover:text-[#4b70f5] transition-colors">
              Plans
              <CgChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute left-0 mt-1 w-min bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none transition-opacity z-50">
              {plans.map((option, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 text-base text-gray-700 hover:bg-[#ececec] text-nonwrap cursor-pointer transition-colors"
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
          <span className="text-lg font-semibold text-[#222] hover:text-[#4b70f5] cursor-pointer transition-colors">
            Contact
          </span>
        </nav>
        <div className="flex items-center gap-3">
          <button className="px-5 py-2 rounded-lg bg-[#898989] text-white font-medium text-lg hover:bg-[#545353] transition-colors">
            Sign-in
          </button>
          <button className="px-5 py-2 rounded-lg bg-[#4b70f5] text-white font-medium text-lg hover:bg-[#6c3ad6] transition-colors">
            Try demo
          </button>
        </div>
      </header>

      {/* SECCIÓN BANNER (Animación Lottie) */}
      <section
        ref={bannerRef}
        className={`w-full flex items-center justify-center py-0 transition-all duration-500 ease-out ${isBannerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        style={{ transitionDelay: '50ms' }}
      >
        <div className="w-full h-auto">
          {lottieData ? (
            <Lottie
              lottieRef={lottieRef}
              animationData={lottieData}
              loop={false}
              autoplay={false}
            />
          ) : (
            <div className="text-black">Cargando animación...</div>
          )}
        </div>

        <button 
          className={`absolute top-[450px] left-[200px] px-5 py-2 rounded-lg bg-[#4b70f5] text-white font-medium text-lg hover:bg-[#6c3ad6] transition-[transform,opacity] duration-700 ease-out hover:transition-colors hover:duration-200 ${
            isBannerVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          Free 15-day trial
        </button>
      </section>

      {/* SECCIÓN FEATURES */}
      <main className="flex flex-col items-center justify-start w-full px-36 gap-32 mt-12">
        <AnimateOnScroll>
          <section className="flex flex-col items-center gap-5 w-full">
            <h2 className="text-5xl font-bold text-center font-poppins text-black">
              Everything You Need,
              <span className="bg-gradient-to-r from-[#6c3ad6] via-[#402e7a] to-[#ea9432] bg-clip-text text-transparent ml-2">
                All In One Place
              </span>
            </h2>
            <p className="text-center text-[#5A5A5A] text-lg font-light max-w-4xl mx-auto font-poppins">
              Simplify your workflow with a unified platform that brings together
              communication, scheduling, project management, and powerful
              integrations — no more app switching.
            </p>
            <div className="flex flex-row justify-center items-stretch gap-y-12 gap-x-6 mt-6 w-full">
              <div className="group flex flex-col items-center text-black transition-all duration-200 cursor-pointer">
                <div className="flex items-center justify-center w-min h-min p-6 bg-[#402e7a] rounded-full mb-4">
                  <FiShare2 className="text-[72px] text-white" />
                </div>
                <div className="text-2xl font-bold text-center mb-1">
                  Chats And Calls In One Place
                </div>
                <span className="block h-4">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-base font-light text-[#5A5A5A] text-center block">
                    Stay connected without switching apps.
                  </span>
                </span>
              </div>
              <div className="group flex flex-col items-center text-black transition-all duration-200 cursor-pointer">
                <div className="flex items-center justify-center w-min h-min p-6 bg-[#402e7a] rounded-full mb-4">
                  <FiCalendar className="text-[72px] text-white" />
                </div>
                <div className="text-2xl font-bold text-center mb-1">
                  Your Schedule, Always Synced
                </div>
                <span className="block h-4">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-base font-light text-[#5A5A5A] text-center block">
                    All your events, integrated.
                  </span>
                </span>
              </div>
              <div className="group flex flex-col items-center text-black transition-all duration-200 cursor-pointer">
                <div className="flex items-center justify-center w-min h-min p-6 bg-[#402e7a] rounded-full mb-4">
                  <FiLayout className="text-[72px] text-white" />
                </div>
                <div className="text-2xl font-bold text-center mb-1">
                  Projects Organized and in Control
                </div>
                <span className="block h-4">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-base font-light text-[#5A5A5A] text-center block">
                    Tasks, timing, and progress, all in order.
                  </span>
                </span>
              </div>
              <div className="group flex flex-col items-center text-black transition-all duration-200 cursor-pointer">
                <div className="flex items-center justify-center w-min h-min p-6 bg-[#402e7a] rounded-full mb-4">
                  <FiLink2 className="text-[72px] text-white" />
                </div>
                <div className="text-2xl font-bold text-center mb-1">
                  Connect Your Favorite Tools
                </div>
                <span className="block h-4">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-base font-light text-[#5A5A5A] text-center block">
                    Everything works with what you already use.
                  </span>
                </span>
              </div>
            </div>
          </section>
        </AnimateOnScroll>

        {/* SECCIÓN NIMBLO FOR CREATORS */}
        <AnimateOnScroll>
          <section className="flex w-full justify-center items-center gap-48 mx-auto relative">
            <img
              src="/Diseno_lineas.svg"
              alt="Decoración líneas"
              className="absolute -left-[1000px] right-0 mx-auto h-[1500px] w-auto z-0 pointer-events-none select-none"
              style={{ top: "50%", transform: "translateY(-50%)" }}
            />
            <div className="flex justify-center items-center relative z-10">
              <img
                src="/Mockup_Iphone_2.png"
                alt="Nimblo App Mobile"
                className="h-[750px] object-contain"
              />
            </div>
            <div className="flex flex-col justify-center items-start gap-4 min-w-[340px] max-w-[800px] relative z-10">
              <h2 className="text-4xl sm:text-5xl font-bold font-poppins text-black leading-tight">
                Nimblo For
                <span className="bg-gradient-to-r from-[#6c3ad6] to-[#ea9432] bg-clip-text text-transparent ml-4">
                  Creators
                </span>
              </h2>
              <p className="text-[#5A5A5A] text-lg font-light font-poppins">
                Manage your projects, teams, and well-being in one smart
                workspace. From task tracking to real-time communication and
                health insights — everything you need, fully integrated and easy
                to use.
              </p>
              <div className="flex flex-col gap-6 w-full mt-4">
                <div className="group w-full">
                  <div className="flex items-center gap-4 cursor-pointer">
                    <div className="bg-[#402e7a] rounded-full p-3 flex items-center justify-center">
                      <FiShare2 className="text-2xl text-white" />
                    </div>
                    <span className="font-bold text-xl text-black font-poppins">
                      Goals And Objectives
                    </span>
                    <CgChevronDown className="ml-auto text-xl text-gray-400" />
                  </div>
                  <div className="overflow-hidden transition-all duration-300 max-h-0 group-hover:max-h-20">
                    <span className="block text-[#5A5A5A] text-lg mt-2 ml-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Define project goals, set milestones, and break them down
                      into actionable tasks and subtasks to keep your team focused
                      and motivated.
                    </span>
                  </div>
                </div>
                <div className="group w-full">
                  <div className="flex items-center gap-4 cursor-pointer">
                    <div className="bg-[#402e7a] rounded-full p-3 flex items-center justify-center">
                      <FiLayout className="text-2xl text-white" />
                    </div>
                    <span className="font-bold text-xl text-black font-poppins">
                      Productivity Tracking
                    </span>
                    <CgChevronDown className="ml-auto text-xl text-gray-400" />
                  </div>
                  <div className="overflow-hidden transition-all duration-300 max-h-0 group-hover:max-h-20">
                    <span className="block text-[#5A5A5A] text-lg mt-2 ml-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Track time spent, completed tasks, and productivity trends
                      across projects to understand your work patterns and improve
                      efficiency.
                    </span>
                  </div>
                </div>
                <div className="group w-full">
                  <div className="flex items-center gap-4 cursor-pointer">
                    <div className="bg-[#402e7a] rounded-full p-3 flex items-center justify-center">
                      <FiLink2 className="text-2xl text-white" />
                    </div>
                    <span className="font-bold text-xl text-black font-poppins">
                      External Platform Connections
                    </span>
                    <CgChevronDown className="ml-auto text-xl text-gray-400" />
                  </div>
                  <div className="overflow-hidden transition-all duration-300 max-h-0 group-hover:max-h-20">
                    <span className="block text-[#5A5A5A] text-lg mt-0 ml-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Connect with platforms like Slack, Teams, Zoom, Google
                      Calendar, and cloud storage to centralize communication and
                      file sharing in one place.
                    </span>
                  </div>
                </div>
              </div>
              <button className="mt-6 px-8 py-3 rounded-lg bg-[#4b70f5] text-white font-medium text-base hover:bg-[#6c3ad6] transition-colors font-poppins">
                Register now
              </button>
            </div>
          </section>
        </AnimateOnScroll>

        {/* SECCIÓN PLANES */}
        <AnimateOnScroll>
          <section className="w-full flex flex-col items-center justify-center mx-auto gap-14">
            <h2 className="text-4xl sm:text-5xl font-bold text-center font-poppins text-black">
              Start With
              <span className="bg-gradient-to-r from-[#6c3ad6] to-[#ea9432] bg-clip-text text-transparent ml-4">
                Affordable Plans
              </span>
            </h2>
            <div className="flex flex-col md:flex-row gap-0 w-full text-black">
              <div className="group flex-1 bg-white border border-gray-300 hover:bg-[#402E7A]/10 rounded-l-lg p-8 shadow transition-all duration-300">
                <h4 className="font-bold text-xl mb-4">Starter Plan</h4>
                <h2 className="text-4xl font-bold">
                  Free{" "}
                  <span className="text-lg font-normal text-gray-500">
                    /month
                  </span>
                </h2>
                <p className="text-gray-500 mb-4 mt-1">
                  Ideal for freelancers and small teams.
                </p>
                <hr className="my-6 border-gray-200 group-hover:border-gray-400 transition-all duration-300" />
                <ul className="flex flex-col gap-4 mb-10">
                  <li className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-[#402e7a] rounded-full">
                      <FiLayout className="text-2xl text-white" />
                    </div>
                    <span className="text-lg font-light">
                      Manage unlimited projects & tasks
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-[#402e7a] rounded-full">
                      <FiShare2 className="text-2xl text-white" />
                    </div>
                    <span className="text-lg font-light">
                      Track goals, subtasks & productivity
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-[#402e7a] rounded-full">
                      <FiCalendar className="text-2xl text-white" />
                    </div>
                    <span className="text-lg font-light">
                      Advanced analytics & productivity reports
                    </span>
                  </li>
                  <li className="flex items-center gap-3 opacity-50">
                    <div className="flex items-center justify-center w-10 h-10 bg-gray-700 rounded-full">
                      <FiLink2 className="text-2xl text-white" />
                    </div>
                    <span className="text-lg font-light">
                      Full integrations (Teams, Zoom, Notion, etc.)
                    </span>
                  </li>
                  <li className="flex items-center gap-3 opacity-50">
                    <div className="flex items-center justify-center w-10 h-10 bg-gray-700 rounded-full">
                      <FiShare2 className="text-2xl text-white" />
                    </div>
                    <span className="text-lg font-light">
                      Real-time collaboration tools
                    </span>
                  </li>
                  <li className="flex items-center gap-3 opacity-50">
                    <div className="flex items-center justify-center w-10 h-10 bg-gray-700 rounded-full">
                      <FiCalendar className="text-2xl text-white" />
                    </div>
                    <span className="text-lg font-light">
                      Team health dashboard
                    </span>
                  </li>
                  <li className="flex items-center gap-3 opacity-50">
                    <div className="flex items-center justify-center w-10 h-10 bg-gray-700 rounded-full">
                      <FiLayout className="text-2xl text-white" />
                    </div>
                    <span className="text-lg font-light">
                      Priority support + onboarding assistance
                    </span>
                  </li>
                </ul>
                <button className="w-full border-2 border-[#6c3ad6] text-[#6c3ad6] font-semibold py-2 group-hover:bg-[#4b70f5] group-hover:text-white rounded-lg transition-all duration-300 font-poppins">
                  Free 15-day trial
                </button>
              </div>
              <div className="group flex-1 bg-white border border-gray-300 hover:bg-[#402E7A]/10 rounded-r-lg p-8 shadow transition-all duration-300">
                <div className="font-bold text-xl mb-4">Pro Plan</div>
                <div className="text-4xl font-bold">
                  $19{" "}
                  <span className="text-lg font-normal text-gray-500">
                    /month
                  </span>
                </div>
                <div className="text-gray-500 mb-4 mt-1">
                  Great for remote teams, agencies, and startups.
                </div>
                <hr className="my-6 border-gray-200 group-hover:border-gray-400 transition-all duration-300" />
                <ul className="flex flex-col gap-4 mb-10">
                  <li className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-[#402e7a] rounded-full">
                      <FiLayout className="text-2xl text-white" />
                    </div>
                    <span className="text-lg font-light">
                      Manage unlimited projects & tasks
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-[#402e7a] rounded-full">
                      <FiShare2 className="text-2xl text-white" />
                    </div>
                    <span className="text-lg font-light">
                      Track goals, subtasks & productivity
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-[#402e7a] rounded-full">
                      <FiCalendar className="text-2xl text-white" />
                    </div>
                    <span className="text-lg font-light">
                      Advanced analytics & productivity reports
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-[#402e7a] rounded-full">
                      <FiLink2 className="text-2xl text-white" />
                    </div>
                    <span className="text-lg font-light">
                      Full integrations (Teams, Zoom, Notion, etc.)
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-[#402e7a] rounded-full">
                      <FiShare2 className="text-2xl text-white" />
                    </div>
                    <span className="text-lg font-light">
                      Real-time collaboration tools
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-[#402e7a] rounded-full">
                      <FiCalendar className="text-2xl text-white" />
                    </div>
                    <span className="text-lg font-light">
                      Team health dashboard
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-[#402e7a] rounded-full">
                      <FiLayout className="text-2xl text-white" />
                    </div>
                    <span className="text-lg font-light">
                      Priority support + onboarding assistance
                    </span>
                  </li>
                </ul>
                <button className="w-full border-2 border-[#6c3ad6] text-[#6c3ad6] font-semibold py-2 group-hover:bg-[#4b70f5] group-hover:text-white rounded-lg transition-all duration-300 font-poppins">
                  Free 15-day trial
                </button>
              </div>
            </div>
          </section>
        </AnimateOnScroll>

        {/* SECCIÓN TESTIMONIOS */}
        <AnimateOnScroll>
          <section className="w-full flex flex-col items-center justify-center mx-auto gap-8">
            <h2 className="text-4xl sm:text-5xl font-bold text-center font-poppins text-black mb-0">
              What <span className="bg-gradient-to-r from-[#6c3ad6] via-[#402e7a] to-[#ea9432] bg-clip-text text-transparent">People Say's</span> About Us
            </h2>
            <div className="relative flex items-center justify-center w-full min-h-[320px] py-0 overflow-visible">
              {testimonials.map((review, i) => {
                let offset = i - activeIndex;
                const total = testimonials.length;

                if (offset > total / 2) offset -= total;
                if (offset < -total / 2) offset += total;

                const maxVisible = 3;
                if (Math.abs(offset) > maxVisible) return null;

                // Card central
                if (offset === 0) {
                  return (
                    <div
                      key={i}
                      className="absolute left-1/2 top-1/2 z-30"
                      style={{
                        transform: "translate(-50%, -50%) scale(1)",
                        transition: "all 0.5s cubic-bezier(.4,2,.6,1)",
                        filter: "none",
                        opacity: 1,
                      }}
                    >
                      <ReviewCard {...review} active />
                    </div>
                  );
                }

                const spread = 120;
                const x = offset * spread;
                const scale = 0.95 - 0.07 * Math.abs(offset);
                const z = 5 - Math.abs(offset);
                const blur = 0.2 + Math.abs(offset) * 1;
                const opacity = 0.25 + 0.25 / Math.abs(offset);

                return (
                  <div
                    key={i}
                    className="absolute left-1/2 top-1/2"
                    style={{
                      transform: `translate(-50%, -50%) translateX(${x}px) scale(${scale})`,
                      zIndex: z,
                      filter: `blur(${blur}px)`,
                      opacity: opacity,
                      transition: "all 0.5s cubic-bezier(.4,2,.6,1)",
                      pointerEvents: "none",
                    }}
                  >
                    <div className="relative">
                      <ReviewCard {...review} />
                      <div className="absolute inset-0 bg-black/60 rounded-xl"></div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-center items-center gap-2 mt-0">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${activeIndex === i ? 'bg-[#6c3ad6] opacity-100 scale-125' : 'bg-[#EAB810] opacity-40'}`}
                  style={{ display: 'inline-block' }}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                ></button>
              ))}
            </div>
          </section>
        </AnimateOnScroll>
      </main>

      {/* SECCIÓN FOOTER */}
      <footer className="w-full bg-[#ececec] shadow-sm mt-32 py-12 px-12 font-poppins flex flex-col items-center">
        <div className="flex justify-between items-start w-full max-w-screen-xl border-b border-dotted border-gray-400 pb-8 mb-8">
          <div className="flex items-center">
            <img src="/Logo.svg" alt="Logo Nimblo" className="h-8 w-auto" />
          </div>
          <div className="flex gap-16">
            <div>
              <h4 className="font-bold text-lg text-black mb-4">Product</h4>
              <ul className="flex flex-col gap-2 text-gray-700 text-base font-light">
                <li>Solutions</li>
                <li>Plans</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg text-black mb-4">Resources</h4>
              <ul className="flex flex-col gap-2 text-gray-700 text-base font-light">
                <li>Blog</li>
                <li>Help Center</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg text-black mb-4">Company</h4>
              <ul className="flex flex-col gap-2 text-gray-700 text-base font-light">
                <li>About</li>
                <li>Terms and conditions</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="w-full max-w-screen-xl text-gray-700 text-sm font-light">
          © 2025 Company. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
