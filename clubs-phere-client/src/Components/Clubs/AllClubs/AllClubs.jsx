import { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllClubs = () => {
    const [clubs, setClubs] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [type, setType] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const clubsPerPage = 10; // Show 10 clubs per page
    const axiosSecure = useAxiosSecure()
        
    useEffect(() => {
        axiosSecure.get("/clubs")
            .then(res => {
                setClubs(res.data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, [axiosSecure]);

    const filteredClubs = clubs.filter(club => {
        return (
            club.clubName.toLowerCase().includes(search.toLowerCase()) &&
            (category === "all" || club.category === category) &&
            (type === "all" ||
                (type === "free" && club.membershipFee === 0) ||
                (type === "paid" && club.membershipFee > 0))
        );
    });

    // Pagination logic
    const indexOfLastClub = currentPage * clubsPerPage;
    const indexOfFirstClub = indexOfLastClub - clubsPerPage;
    const currentClubs = filteredClubs.slice(indexOfFirstClub, indexOfLastClub);
    const totalPages = Math.ceil(filteredClubs.length / clubsPerPage);

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-6">Explore Clubs</h1>
            
            {/* Showing results count */}
            <div className="mb-4 text-gray-600">
                Showing {indexOfFirstClub + 1}-{Math.min(indexOfLastClub, filteredClubs.length)} of {filteredClubs.length} clubs
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                <input
                    type="text"
                    placeholder="Search clubs..."
                    className="input input-bordered w-full"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    className="select select-bordered w-full"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="all">All Categories</option>
                    <option>Photography</option>
                    <option>Tech</option>
                    <option>Sports</option>
                    <option>Book Club</option>
                </select>

                <select
                    className="select select-bordered w-full"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <option value="all">All Types</option>
                    <option value="free">Free</option>
                    <option value="paid">Paid</option>
                </select>
            </div>

         {/* Club Cards */}
<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  {loading ? (
    // Skeleton Loader
    Array.from({ length: 8 }).map((_, index) => (
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
    ))
  ) : (
    currentClubs.map(club => (
      <div
        key={club._id}
        className="group relative bg-white rounded-3xl shadow-lg border border-transparent hover:border-green-200 overflow-hidden transform hover:scale-105 transition-all duration-300 flex flex-col h-full"
      >
        {/* Image */}
        <div className="relative h-48 overflow-hidden flex-shrink-0">
          <img
            src={club.image}
            alt={club.clubName}
            className="w-full h-full object-cover brightness-90 group-hover:brightness-100 transition"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 opacity-0 group-hover:opacity-50 transition"></div>
        </div>

        {/* Content */}
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
              className={`text-xs font-semibold ${
                club.membershipFee === 0
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

        {/* Decorative Accent */}
        <div className="absolute -right-6 -top-6 w-24 h-24 bg-green-200 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition"></div>
      </div>
    ))
  )}
</div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-10">
                    <div className="join">
                        <button 
                            className={`join-item btn ${currentPage === 1 ? 'btn-disabled' : 'btn-neutral'}`}
                            onClick={() => setCurrentPage(1)}
                            disabled={currentPage === 1}
                        >
                            « First
                        </button>
                        <button 
                            className={`join-item btn ${currentPage === 1 ? 'btn-disabled' : 'btn-neutral'}`}
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            «
                        </button>
                        <button className="join-item btn btn-neutral">{currentPage}</button>
                        <button 
                            className={`join-item btn ${currentPage === totalPages ? 'btn-disabled' : 'btn-neutral'}`}
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            »
                        </button>
                        <button 
                            className={`join-item btn ${currentPage === totalPages ? 'btn-disabled' : 'btn-neutral'}`}
                            onClick={() => setCurrentPage(totalPages)}
                            disabled={currentPage === totalPages}
                        >
                            Last »
                        </button>
                    </div>
                </div>
            )}

            
            {/* Pagination info */}
            {filteredClubs.length === 0 && (
                <div className="text-center py-10 text-gray-500">
                    No clubs found matching your criteria.
                </div>
            )}
        </div>
    );
};

export default AllClubs;
