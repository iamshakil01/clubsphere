import React from "react";
import { motion } from "framer-motion";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from "react-router";

// Using online placeholder images related to clubs and communities
const img1 = 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop'; // Group of people/image related to clubs
const img2 = 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1922&auto=format&fit=crop'; // Collaboration image
const img3 = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2070&auto=format&fit=crop'; // Team work image

const Banner = () => {
    const navigate = useNavigate();
    console.log(motion)

    return (
        <div className="relative">
            {/* Carousel */}
            <Carousel
                className="brightness-75"
                autoPlay
                infiniteLoop
                interval={5000}
                showStatus={false}
                showThumbs={false}
                showArrows={true}
                showIndicators={true}
                swipeable={true}
                emulateTouch={true}
            >
                <div className="h-[60vh] md:h-[65vh] lg:h-[70vh] min-h-[400px] max-h-[700px]">
                    <img src={img1} alt="Hero 1" className="w-full h-full object-cover" />
                </div>
                <div className="h-[60vh] md:h-[65vh] lg:h-[70vh] min-h-[400px] max-h-[700px]">
                    <img src={img2} alt="Hero 2" className="w-full h-full object-cover" />
                </div>
                <div className="h-[60vh] md:h-[65vh] lg:h-[70vh] min-h-[400px] max-h-[700px]">
                    <img src={img3} alt="Hero 3" className="w-full h-full object-cover" />
                </div>
            </Carousel>

            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
                {/* Semi-transparent overlay to ensure text visibility in both light and dark modes */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/30 dark:from-black/60 dark:via-black/40 dark:to-black/50"></div>
                
                <motion.div
                    className="max-w-4xl mx-auto px-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.h1
                        className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 text-white dark:text-white !text-white drop-shadow-lg"
                        animate={{ y: [0, -10, 0] }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            repeatType: "mirror",
                            ease: "easeInOut"
                        }}
                    >
                        Connect, Share, and Grow Together
                    </motion.h1>

                    <motion.p
                        className="text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto mb-10 text-white dark:text-white !text-white drop-shadow-md"
                        animate={{ y: [0, -6, 0] }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            repeatType: "mirror",
                            ease: "easeInOut"
                        }}
                    >
                        Discover clubs, create events, connect with members, and make your community shine.
                    </motion.p>
                    
                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                        animate={{ y: [0, -4, 0] }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "mirror",
                            ease: "easeInOut"
                        }}
                    >
                        <button
                            onClick={() => navigate("/all-clubs")}
                            className="btn btn-outline border-2 border-white text-white hover:bg-white hover:text-indigo-600 px-8 py-4 text-lg font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            Explore Clubs
                        </button>

                        <button
                            onClick={() => navigate("/create-club")}
                            className="btn btn-outline border-2 border-white text-white hover:bg-white hover:text-indigo-600 px-8 py-4 text-lg font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            Create Club
                        </button>
                    </motion.div>
                </motion.div>
                
                {/* Scroll indicator for visual flow */}
                <motion.div 
                    className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white dark:text-white !text-white text-sm animate-bounce"
                    animate={{ y: [0, 10, 0] }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                    <span className="sr-only">Scroll down</span>
                </motion.div>
            </div>
        </div>
    );
};

export default Banner;
