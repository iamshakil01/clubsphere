import { Link } from "react-router";
import Banner from "../Banner/Banner";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import FeaturedClub from "../Banner/FeaturedClub/FeaturedClub";

const Home = () => {
    const axiosSecure = useAxiosSecure();

    const { data: clubs = [], isLoading } = useQuery({
        queryKey: ["clubs"],
        queryFn: async () => {
            const res = await axiosSecure.get("/clubs");
            return res.data;
        }
    });



    return (
        <div className="bg-white">
            <Banner />
            <FeaturedClub></FeaturedClub>

            <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10">Popular Clubs</h2>

                {isLoading ? (
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <div
                                key={`skeleton-${index}`}
                                className="group relative bg-white rounded-3xl shadow-lg border border-transparent overflow-hidden flex flex-col h-full"
                            >
                                {/* Skeleton Image */}
                                <div className="relative h-48 bg-gray-200 animate-pulse flex-shrink-0">
                                    <div className="w-full h-full bg-gradient-to-r from-gray-200 to-gray-300"></div>
                                </div>

                                {/* Skeleton Content */}
                                <div className="p-4 space-y-3 flex-grow">
                                    <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="space-y-2">
                                        <div className="h-2 bg-gray-200 rounded animate-pulse"></div>
                                        <div className="h-2 bg-gray-200 rounded animate-pulse w-5/6"></div>
                                        <div className="h-2 bg-gray-200 rounded animate-pulse w-4/6"></div>
                                    </div>
                                    <div className="flex items-center justify-between pt-1">
                                        <div className="h-3 w-12 bg-gray-200 rounded-full animate-pulse"></div>
                                        <div className="h-3 w-10 bg-gray-200 rounded-full animate-pulse"></div>
                                    </div>
                                    <div className="h-6 bg-gray-200 rounded-xl animate-pulse mt-1"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {clubs.slice(0, 8).map(club => (
                            <div
                                key={club._id}
                                className="group relative bg-white rounded-3xl shadow-lg border border-transparent hover:border-green-200 overflow-hidden transform hover:scale-105 transition-all duration-300 flex flex-col h-full"
                            >
                                <div className="relative h-48 overflow-hidden flex-shrink-0">
                                    <img
                                        src={club.image}
                                        alt={club.clubName}
                                        className="w-full h-full object-cover brightness-90 group-hover:brightness-100 transition"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 opacity-0 group-hover:opacity-50 transition"></div>
                                </div>

                                <div className="p-4 flex flex-col flex-grow">
                                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-green-600 transition-colors underline-offset-2 group-hover:underline mb-2">
                                        {club.clubName}
                                    </h3>

                                    <p className="text-xs text-gray-600 mb-3 flex-grow">
                                        {club.description.length > 80 ? `${club.description.substring(0, 80)}...` : club.description}
                                    </p>

                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs uppercase font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                            {club.category}
                                        </span>

                                        <span
                                            className={`text-xs font-semibold ${club.membershipFee === 0
                                                ? "text-green-600 bg-green-100 px-2 py-1 rounded-full"
                                                : "text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full"
                                                }`}
                                        >
                                            {club.membershipFee === 0 ? "Free" : `$${club.membershipFee}`}
                                        </span>
                                    </div>

                                    <Link
                                        to={`/clubs/${club._id}`}
                                        className="inline-block w-full text-center text-white bg-green-600 hover:bg-green-700 font-semibold py-2 rounded-xl transition transform hover:-translate-y-0.5 mt-auto"
                                    >
                                        View Details
                                    </Link>
                                </div>

                                <div className="absolute -right-6 -top-6 w-24 h-24 bg-green-200 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition"></div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <section className="bg-gradient-to-tr from-green-50 to-gray-100 py-8 sm:py-12 md:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 text-center">

                    {/* Trusted Clubs */}
                    <div className="relative p-8 bg-white rounded-3xl shadow-2xl hover:shadow-xl transition-shadow duration-300 group">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-green-200 p-4 rounded-full shadow-lg group-hover:bg-green-300 transition-all duration-300">
                            <svg className="w-8 h-8 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 10-1.414 1.414L9 13.414l4.707-4.707z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mt-6">Trusted Clubs</h3>
                        <p className="text-gray-600 mt-3">Verified and secure community clubs.</p>
                    </div>

                    {/* Easy Management */}
                    <div className="relative p-8 bg-white rounded-3xl shadow-2xl hover:shadow-xl transition-shadow duration-300 group">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-blue-200 p-4 rounded-full shadow-lg group-hover:bg-blue-300 transition-all duration-300">
                            <svg className="w-8 h-8 text-blue-700" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M3 4a1 1 0 000 2h14a1 1 0 100-2H3zM3 9a1 1 0 100 2h14a1 1 0 100-2H3zM3 14a1 1 0 100 2h14a1 1 0 100-2H3z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mt-6">Easy Management</h3>
                        <p className="text-gray-600 mt-3">Manage clubs and events effortlessly.</p>
                    </div>

                    {/* Secure Payments */}
                    <div className="relative p-8 bg-white rounded-3xl shadow-2xl hover:shadow-xl transition-shadow duration-300 group">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-yellow-200 p-4 rounded-full shadow-lg group-hover:bg-yellow-300 transition-all duration-300">
                            <svg className="w-8 h-8 text-yellow-700" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M4 4h12v2H4V4zm0 5h12v2H4V9zm0 5h12v2H4v-2z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mt-6">Secure Payments</h3>
                        <p className="text-gray-600 mt-3">Stripe protected transactions.</p>
                    </div>

                </div>
            </section>


            <section className="relative py-20 bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-400 text-white text-center overflow-hidden mb-5">
                {/* Decorative Light Blobs */}
                <div className="absolute -left-24 -top-24 w-72 h-72 bg-indigo-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                <div className="absolute -right-24 -bottom-24 w-80 h-80 bg-indigo-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>

                <div className="relative max-w-3xl mx-auto px-6">
                    <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight">
                        Ready to Join Your Community?
                    </h2>

                    <p className="mt-4 text-indigo-100 text-lg lg:text-xl">
                        Sign up today and become part of something amazing.
                    </p>

                    <Link
                        to="/register"
                        className="mt-8 inline-block bg-white text-indigo-600 font-semibold text-lg px-8 py-3 rounded-full shadow-xl hover:bg-indigo-50 hover:shadow-2xl transition-all duration-300 focus:ring-4 focus:ring-indigo-300"
                    >
                        Create Account
                    </Link>
                </div>
            </section>

        </div>
    );
};

export default Home;
