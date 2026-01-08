import { Link, NavLink, Outlet, Navigate } from "react-router";
import { CiUser, CiCalendar, CiBoxList } from "react-icons/ci";
import { FaRegCreditCard, FaHome } from "react-icons/fa";
import { IoManSharp } from "react-icons/io5";
import { GiCard10Clubs } from "react-icons/gi";
import { FcApprove } from "react-icons/fc";
import useRole from "../hooks/useRole";



const DashboardLayout = () => {
  const { role } = useRole();

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      {/* NAVBAR */}
      <nav className="flex items-center justify-between bg-white shadow px-4 py-3">
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700 hover:text-black text-xl"
          onClick={() => {
            const drawer = document.getElementById('mobile-menu-drawer');
            const menu = drawer.querySelector('div.bg-white');
            drawer.classList.remove('hidden');
            setTimeout(() => {
              drawer.classList.remove('opacity-0');
              menu.classList.remove('-translate-x-full');
              drawer.classList.add('opacity-100');
            }, 10);
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="text-xl sm:text-2xl font-bold">Dashboard</div>
        <div className="text-xs sm:text-sm font-semibold capitalize">
          {role === "clubManager" ? "Club Manager" : role}
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* MOBILE MENU DRAWER */}
        <div id="mobile-menu-drawer" className="fixed inset-0 z-50 bg-black bg-opacity-50 hidden md:hidden">
          <div className="bg-white w-64 h-full p-4 overflow-y-auto fixed top-0 left-0 h-full z-50 transform -translate-x-full transition-transform duration-300">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Menu</h2>
              <button 
                className="text-gray-700 hover:text-black"
                onClick={() => {
                  const drawer = document.getElementById('mobile-menu-drawer');
                  const menu = drawer.querySelector('div.bg-white');
                  drawer.classList.add('opacity-0');
                  menu.classList.add('-translate-x-full');
                  setTimeout(() => {
                    drawer.classList.add('hidden');
                    drawer.classList.remove('opacity-0');
                    menu.classList.remove('-translate-x-full');
                  }, 300);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="flex items-center p-2 text-gray-700 hover:text-black hover:bg-gray-100 rounded"
                  onClick={() => {
                    const drawer = document.getElementById('mobile-menu-drawer');
                    drawer.classList.add('opacity-0');
                    drawer.querySelector('div.bg-white').classList.add('-translate-x-full');
                    setTimeout(() => {
                      drawer.classList.add('hidden');
                      drawer.classList.remove('opacity-0');
                      drawer.querySelector('div.bg-white').classList.remove('-translate-x-full');
                    }, 300);
                  }}
                >
                  <FaHome />
                  <span className="ml-3">Homepage</span>
                </Link>
              </li>

              {/* Admin Links */}
              {role === "admin" && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/users-management"
                      className={({isActive}) => `flex items-center p-2 rounded ${isActive ? 'text-green-500 bg-green-50' : 'text-gray-700 hover:text-black hover:bg-gray-100'}`}
                      onClick={() => {
                        const drawer = document.getElementById('mobile-menu-drawer');
                        const menu = drawer.querySelector('div.bg-white');
                        drawer.classList.add('opacity-0');
                        menu.classList.add('-translate-x-full');
                        setTimeout(() => {
                          drawer.classList.add('hidden');
                          drawer.classList.remove('opacity-0');
                          menu.classList.remove('-translate-x-full');
                        }, 300);
                      }}
                    >
                      <CiUser />
                      <span className="ml-3">Users Management</span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/clubs-management"
                      className={({isActive}) => `flex items-center p-2 rounded ${isActive ? 'text-green-500 bg-green-50' : 'text-gray-700 hover:text-black hover:bg-gray-100'}`}
                      onClick={() => {
                                              const drawer = document.getElementById('mobile-menu-drawer');
                                              drawer.classList.add('opacity-0');
                                              drawer.querySelector('div.bg-white').classList.add('-translate-x-full');
                                              setTimeout(() => {
                                                drawer.classList.add('hidden');
                                                drawer.classList.remove('opacity-0');
                                                drawer.querySelector('div.bg-white').classList.remove('-translate-x-full');
                                              }, 300);
                                            }}
                    >
                      <GiCard10Clubs />
                      <span className="ml-3">Clubs</span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/clubs-management?filter=pending"
                      className={({isActive}) => `flex items-center p-2 rounded ${isActive ? 'text-green-500 bg-green-50' : 'text-gray-700 hover:text-black hover:bg-gray-100'}`}
                      onClick={() => {
                        const drawer = document.getElementById('mobile-menu-drawer');
                        const menu = drawer.querySelector('div.bg-white');
                        drawer.classList.add('opacity-0');
                        menu.classList.add('-translate-x-full');
                        setTimeout(() => {
                          drawer.classList.add('hidden');
                          drawer.classList.remove('opacity-0');
                          menu.classList.remove('-translate-x-full');
                        }, 300);
                      }}
                    >
                      <CiBoxList />
                      <span className="ml-3">Pending Clubs</span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/clubs-management?filter=approved"
                      className={({isActive}) => `flex items-center p-2 rounded ${isActive ? 'text-green-500 bg-green-50' : 'text-gray-700 hover:text-black hover:bg-gray-100'}`}
                      onClick={() => {
                        const drawer = document.getElementById('mobile-menu-drawer');
                        const menu = drawer.querySelector('div.bg-white');
                        drawer.classList.add('opacity-0');
                        menu.classList.add('-translate-x-full');
                        setTimeout(() => {
                          drawer.classList.add('hidden');
                          drawer.classList.remove('opacity-0');
                          menu.classList.remove('-translate-x-full');
                        }, 300);
                      }}
                    >
                      <FcApprove />
                      <span className="ml-3">Approved Clubs</span>
                    </NavLink>
                  </li>
                  
                  <li>
                    <NavLink
                      to="/dashboard/events-management"
                      className={({isActive}) => `flex items-center p-2 rounded ${isActive ? 'text-green-500 bg-green-50' : 'text-gray-700 hover:text-black hover:bg-gray-100'}`}
                      onClick={() => {
                                              const drawer = document.getElementById('mobile-menu-drawer');
                                              drawer.classList.add('opacity-0');
                                              drawer.querySelector('div.bg-white').classList.add('-translate-x-full');
                                              setTimeout(() => {
                                                drawer.classList.add('hidden');
                                                drawer.classList.remove('opacity-0');
                                                drawer.querySelector('div.bg-white').classList.remove('-translate-x-full');
                                              }, 300);
                                            }}
                    >
                      <CiCalendar />
                      <span className="ml-3">Events-Management</span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/payment-history"
                      className={({isActive}) => `flex items-center p-2 rounded ${isActive ? 'text-green-500 bg-green-50' : 'text-gray-700 hover:text-black hover:bg-gray-100'}`}
                      onClick={() => {
                                              const drawer = document.getElementById('mobile-menu-drawer');
                                              drawer.classList.add('opacity-0');
                                              drawer.querySelector('div.bg-white').classList.add('-translate-x-full');
                                              setTimeout(() => {
                                                drawer.classList.add('hidden');
                                                drawer.classList.remove('opacity-0');
                                                drawer.querySelector('div.bg-white').classList.remove('-translate-x-full');
                                              }, 300);
                                            }}
                    >
                      <FaRegCreditCard />
                      <span className="ml-3">Payments</span>
                    </NavLink>
                  </li>
                </>
              )}

              {/* Club Manager Links */}
              {role === "clubManager" && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/clubs-management"
                      className={({isActive}) => `flex items-center p-2 rounded ${isActive ? 'text-green-500 bg-green-50' : 'text-gray-700 hover:text-black hover:bg-gray-100'}`}
                      onClick={() => {
                        const drawer = document.getElementById('mobile-menu-drawer');
                        const menu = drawer.querySelector('div.bg-white');
                        drawer.classList.add('opacity-0');
                        menu.classList.add('-translate-x-full');
                        setTimeout(() => {
                          drawer.classList.add('hidden');
                          drawer.classList.remove('opacity-0');
                          menu.classList.remove('-translate-x-full');
                        }, 300);
                      }}
                    >
                      <GiCard10Clubs />
                      <span className="ml-3">My Clubs</span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/events-management"
                      className={({isActive}) => `flex items-center p-2 rounded ${isActive ? 'text-green-500 bg-green-50' : 'text-gray-700 hover:text-black hover:bg-gray-100'}`}
                      onClick={() => {
                                              const drawer = document.getElementById('mobile-menu-drawer');
                                              drawer.classList.add('opacity-0');
                                              drawer.querySelector('div.bg-white').classList.add('-translate-x-full');
                                              setTimeout(() => {
                                                drawer.classList.add('hidden');
                                                drawer.classList.remove('opacity-0');
                                                drawer.querySelector('div.bg-white').classList.remove('-translate-x-full');
                                              }, 300);
                                            }}
                    >
                      <CiCalendar />
                      <span className="ml-3">Events-Management</span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/payment-history"
                      className={({isActive}) => `flex items-center p-2 rounded ${isActive ? 'text-green-500 bg-green-50' : 'text-gray-700 hover:text-black hover:bg-gray-100'}`}
                      onClick={() => {
                                              const drawer = document.getElementById('mobile-menu-drawer');
                                              drawer.classList.add('opacity-0');
                                              drawer.querySelector('div.bg-white').classList.add('-translate-x-full');
                                              setTimeout(() => {
                                                drawer.classList.add('hidden');
                                                drawer.classList.remove('opacity-0');
                                                drawer.querySelector('div.bg-white').classList.remove('-translate-x-full');
                                              }, 300);
                                            }}
                    >
                      <FaRegCreditCard />
                      <span className="ml-3">Payments</span>
                    </NavLink>
                  </li>
                </>
              )}

              {/* Member Links */}
              {role === "member" && (
                <li>
                  <NavLink
                    to="/dashboard/payment-history"
                    className={({isActive}) => `flex items-center p-2 rounded ${isActive ? 'text-green-500 bg-green-50' : 'text-gray-700 hover:text-black hover:bg-gray-100'}`}
                    onClick={() => {
                                            const drawer = document.getElementById('mobile-menu-drawer');
                                            drawer.classList.add('opacity-0');
                                            drawer.querySelector('div.bg-white').classList.add('-translate-x-full');
                                            setTimeout(() => {
                                              drawer.classList.add('hidden');
                                              drawer.classList.remove('opacity-0');
                                              drawer.querySelector('div.bg-white').classList.remove('-translate-x-full');
                                            }, 300);
                                          }}
                  >
                    <FaRegCreditCard />
                    <span className="ml-3">Payments</span>
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* SIDEBAR */}
        <aside className="hidden md:flex flex-col bg-white shadow-sm w-16 lg:w-20">
          <ul className="flex flex-col items-center space-y-3 py-4">

            {/* Homepage */}
            <li className="group relative w-full flex justify-center">
              <Link
                to="/"
                className="text-gray-700 hover:text-black text-xl"
              >
                <FaHome />
              </Link>
              <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 rounded bg-gray-900 text-white text-sm px-2 py-1 opacity-0 group-hover:opacity-100 whitespace-nowrap">
                Homepage
              </span>
            </li>


            {/* Admin Links */}
            {role === "admin" && (
              <>
                <li className="group relative w-full flex justify-center">
                  <NavLink
                    to="/dashboard/users-management"
                    className="text-gray-700 hover:text-black text-xl"
                  >
                    <CiUser />
                  </NavLink>
                  <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 rounded bg-gray-900 text-white text-sm px-2 py-1 opacity-0 group-hover:opacity-100 whitespace-nowrap">
                    Users Management
                  </span>
                </li>

                <li className="group relative w-full flex justify-center">
                  <NavLink
                    to="/dashboard/clubs-management"
                    className="text-gray-700 hover:text-black text-xl"
                  >
                    <GiCard10Clubs />
                  </NavLink>
                  <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 rounded bg-gray-900 text-white text-sm px-2 py-1 opacity-0 group-hover:opacity-100 whitespace-nowrap">
                    Clubs
                  </span>
                </li>

                <li className="group relative w-full flex justify-center">
                  <NavLink
                    to="/dashboard/clubs-management?filter=pending"
                    className="text-gray-700 hover:text-black text-xl"
                  >
                    <CiBoxList />
                  </NavLink>
                  <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 rounded bg-gray-900 text-white text-sm px-2 py-1 opacity-0 group-hover:opacity-100 whitespace-nowrap">
                    Pending Clubs
                  </span>
                </li>

                <li className="group relative w-full flex justify-center">
                  <NavLink
                    to="/dashboard/clubs-management?filter=approved"
                    className="text-gray-700 hover:text-black text-xl"
                  >
                    <FcApprove />
                  </NavLink>
                  <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 rounded bg-gray-900 text-white text-sm px-2 py-1 opacity-0 group-hover:opacity-100 whitespace-nowrap">
                    Approved Clubs
                  </span>
                </li>
                
                {/* 
                <li className="group relative w-full flex justify-center">
                  <NavLink
                    to="/dashboard/memberships-management"
                    className="text-gray-700 hover:text-black text-xl"
                  >
                    <IoManSharp />
                  </NavLink>
                  <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 rounded bg-gray-900 text-white text-sm px-2 py-1 opacity-0 group-hover:opacity-100 whitespace-nowrap">
                    Memberships
                  </span>
                </li> */}

                <li className="group relative w-full flex justify-center">
                  <NavLink
                    to="/dashboard/events-management"
                    className="text-gray-700 hover:text-black text-xl"
                  >
                    <CiCalendar />
                  </NavLink>
                  <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 rounded bg-gray-900 text-white text-sm px-2 py-1 opacity-0 group-hover:opacity-100 whitespace-nowrap">
                    Events-Management
                  </span>
                </li>

                <li className="group relative w-full flex justify-center">
                  <NavLink
                    to="/dashboard/payment-history"
                    className="text-gray-700 hover:text-black text-xl"
                  >
                    <FaRegCreditCard />
                  </NavLink>
                  <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 rounded bg-gray-900 text-white text-sm px-2 py-1 opacity-0 group-hover:opacity-100 whitespace-nowrap">
                    Payments
                  </span>
                </li>
              </>
            )}


            {/* Club Manager Links */}
            {role === "clubManager" && (
              <>
                <li className="group relative w-full flex justify-center">
                  <NavLink
                    to="/dashboard/clubs-management"
                    className="text-gray-700 hover:text-black text-xl"
                  >
                    <GiCard10Clubs />
                  </NavLink>
                  <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 rounded bg-gray-900 text-white text-sm px-2 py-1 opacity-0 group-hover:opacity-100 whitespace-nowrap">
                    My Clubs
                  </span>
                </li>

                <li className="group relative w-full flex justify-center">
                  <NavLink
                    to="/dashboard/events-management"
                    className="text-gray-700 hover:text-black text-xl"
                  >
                    <CiCalendar />
                  </NavLink>
                  <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 rounded bg-gray-900 text-white text-sm px-2 py-1 opacity-0 group-hover:opacity-100 whitespace-nowrap">
                    Events-Management
                  </span>
                </li>

                <li className="group relative w-full flex justify-center">
                  <NavLink
                    to="/dashboard/payment-history"
                    className="text-gray-700 hover:text-black text-xl"
                  >
                    <FaRegCreditCard />
                  </NavLink>
                  <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 rounded bg-gray-900 text-white text-sm px-2 py-1 opacity-0 group-hover:opacity-100 whitespace-nowrap">
                    Payments
                  </span>
                </li>
              </>
            )}


            {/* Member Links */}
            {role === "member" && (
              <li className="group relative w-full flex justify-center">
                <NavLink
                  to="/dashboard/payment-history"
                  className="text-gray-700 hover:text-black text-xl"
                >
                  <FaRegCreditCard />
                </NavLink>
                <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 rounded bg-gray-900 text-white text-sm px-2 py-1 opacity-0 group-hover:opacity-100 whitespace-nowrap">
                  Payments
                </span>
              </li>
            )}
          </ul>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-6 overflow-auto">
          <h2 className="text-5xl text-center font-bold my-5">Welcome To Your Dashboard</h2>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
