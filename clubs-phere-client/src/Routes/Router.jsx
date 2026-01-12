import { createBrowserRouter } from "react-router";
import HelmetWrapper from '../utils/HelmetWrapper.jsx';
import RootLayout from "../Layouts/RootLayouts";
import Home from "../Pages/Home/Home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import Profile from "../Components/Profile/Profile";
import PrivateRoutes from "./PrivateRoutes";
import CreateClub from "../Components/Clubs/CreateClubs/CreateClub";
import AllClubs from "../Components/Clubs/AllClubs/AllClubs";
import DashboardLayout from '../Layouts/DashboardLayout';
import DashboardHome from '../Pages/Dashboard/DashboardHome/DashboardHome';
import RecentActivity from '../Pages/Dashboard/RecentActivity/RecentActivity';
import ClubDetails from "../Components/Clubs/ClubDetails/ClubDetails";
import Admin from "../Pages/Dashboard/Admin/Admin";
import UsersManagement from "../Pages/Dashboard/UsersManagement/UsersManagement";
import PaymentSuccess from "../Pages/Dashboard/Payment/PaymentSuccess/PaymentSuccess";
import PaymentCancelled from "../Pages/Dashboard/Payment/PaymentCancelled/PaymentCancelled";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import ClubsManagement from "../Pages/Dashboard/ClubManagement/ClubManagement";
import CreateEvents from "../Components/Clubs/CreateEvents/CreateEvents";
import Events from "../Components/Clubs/Events/Events";
import ErrorPage from "../Components/ErrorPage/ErrorPage";
import AdminRoutes from "./AdminRoutes";
import EventsManagement from "../Pages/Dashboard/EventsManagement/EventsManagement";
import FAQ from "../Components/FAQ/FAQ";
import About from "../Components/About/About";
import Contact from "../Components/Contact/Contact";
import HelpCenter from "../Components/HelpCenter/HelpCenter";
import MyClubs from "../Components/MyClubs/MyClubs";
import PrivacyPolicy from "../Pages/Shared/PrivacyPolicy/PrivacyPolicy";
import TermsOfService from "../Pages/Shared/TermsOfService/TermsOfService";


export const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <ErrorPage></ErrorPage>,
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: (
                    <>
                        <HelmetWrapper 
                            title="ClubSphere - Home"
                            description="Discover clubs and organizations that match your interests. Join and create communities around shared passions."
                        />
                        <Home />
                    </>
                ),
            },
            {
                path: "create-club",
                element: (
                    <>
                        <HelmetWrapper 
                            title="Create New Club | ClubSphere"
                            description="Create your own club and start building a community around your interests."
                        />
                        <CreateClub />
                    </>
                ),
            },
            {
                path: "all-clubs",
                element: (
                    <>
                        <HelmetWrapper 
                            title="All Clubs | ClubSphere"
                            description="Browse all available clubs and organizations on ClubSphere."
                        />
                        <AllClubs />
                    </>
                ),
            },
            {
                path: "create-events",
                element: (
                    <>
                        <HelmetWrapper 
                            title="Create New Event | ClubSphere"
                            description="Create events for your club and invite members to participate."
                        />
                        <CreateEvents></CreateEvents>
                    </>
                )
            },
            {
                path: "events",
                element: (
                    <>
                        <HelmetWrapper 
                            title="Events | ClubSphere"
                            description="View upcoming events from clubs and organizations."
                        />
                        <Events></Events>
                    </>
                )
            },
            {
                path: "profile",
                element: (
                    <>
                        <HelmetWrapper 
                            title="My Profile | ClubSphere"
                            description="Manage your profile and account settings on ClubSphere."
                        />
                        <PrivateRoutes>
                            <Profile />
                        </PrivateRoutes>
                    </>
                )
            },
            {
                path: "clubs/:id",
                element: (
                    <>
                        <HelmetWrapper 
                            title="Club Details | ClubSphere"
                            description="View detailed information about a specific club on ClubSphere."
                        />
                        <ClubDetails />
                    </>
                ),            
            },
            {
                path: "faq",
                element: (
                    <>
                        <HelmetWrapper 
                            title="FAQ | ClubSphere"
                            description="Find answers to frequently asked questions about ClubSphere."
                        />
                        <FAQ />
                    </>
                )
            },
            {
                path: "about",
                element: (
                    <>
                        <HelmetWrapper 
                            title="About | ClubSphere"
                            description="Learn more about ClubSphere and our mission to connect communities."
                        />
                        <About />
                    </>
                )
            },
            {
                path: "contact",
                element: (
                    <>
                        <HelmetWrapper 
                            title="Contact Us | ClubSphere"
                            description="Get in touch with the ClubSphere team for support and inquiries."
                        />
                        <Contact />
                    </>
                )
            },
            {
                path: "help",
                element: (
                    <>
                        <HelmetWrapper 
                            title="Help Center | ClubSphere"
                            description="Find help and support resources for using ClubSphere."
                        />
                        <HelpCenter />
                    </>
                )
            },
            {
                path: "my-clubs",
                element: (
                    <>
                        <HelmetWrapper 
                            title="My Clubs | ClubSphere"
                            description="Manage the clubs you're a member of or admin for on ClubSphere."
                        />
                        <MyClubs />
                    </>
                )
            },
            {
                path: "privacy",
                element: (
                    <>
                        <HelmetWrapper 
                            title="Privacy Policy | ClubSphere"
                            description="Read our privacy policy to understand how we protect your data."
                        />
                        <PrivacyPolicy />
                    </>
                )
            },
            {
                path: "terms",
                element: (
                    <>
                        <HelmetWrapper 
                            title="Terms of Service | ClubSphere"
                            description="Read our terms of service to understand the rules for using ClubSphere."
                        />
                        <TermsOfService />
                    </>
                )
            }
        ]
    },
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            {
                path: "login",
                element: (
                    <>
                        <HelmetWrapper 
                            title="Login | ClubSphere"
                            description="Log in to your ClubSphere account to access your clubs and events."
                        />
                        <Login />
                    </>
                )
            },
            {
                path: "register",
                element: (
                    <>
                        <HelmetWrapper 
                            title="Register | ClubSphere"
                            description="Create a new ClubSphere account to join clubs and events."
                        />
                        <Register />
                    </>
                )
            }
        ]
    },
    {
        path: "/dashboard",
        element: (
            <PrivateRoutes>
                <DashboardLayout />
            </PrivateRoutes>
        ),
        children: [
            {
                index: true,
                element: (
                    <>
                        <HelmetWrapper 
                            title="Dashboard | ClubSphere"
                            description="Manage your clubs, events, and activities from your dashboard."
                        />
                        <DashboardHome />
                    </>
                )
            },
            {
                path: "admin",
                element: (
                    <>
                        <HelmetWrapper 
                            title="Admin Panel | ClubSphere"
                            description="Admin panel for managing ClubSphere platform."
                        />
                        <Admin />
                    </>
                )
            },
            {
                path: "users-management",
                element: (
                    <>
                        <HelmetWrapper 
                            title="Users Management | ClubSphere"
                            description="Manage users and their roles on ClubSphere."
                        />
                        <AdminRoutes>
                            <UsersManagement></UsersManagement>
                        </AdminRoutes>
                    </>
                )
            },
            {
                path: "payment-success",
                element: (
                    <>
                        <HelmetWrapper 
                            title="Payment Success | ClubSphere"
                            description="Your payment was processed successfully."
                        />
                        <PaymentSuccess></PaymentSuccess>
                    </>
                )
            },
            {
                path: "payment-cancelled",
                element: (
                    <>
                        <HelmetWrapper 
                            title="Payment Cancelled | ClubSphere"
                            description="Your payment was cancelled."
                        />
                        <PaymentCancelled></PaymentCancelled>
                    </>
                )
            },
            {
                path: 'payment-history',
                element: (
                    <>
                        <HelmetWrapper 
                            title="Payment History | ClubSphere"
                            description="View your payment history and transactions."
                        />
                        <PaymentHistory></PaymentHistory>
                    </>
                )
            },
            {
                path: 'recent-activity',
                element: (
                    <>
                        <HelmetWrapper 
                            title="Recent Activity | ClubSphere"
                            description="View your recent activity and notifications."
                        />
                        <RecentActivity></RecentActivity>
                    </>
                )
            },
            {
                path: 'clubs-management',
                element: (
                    <>
                        <HelmetWrapper 
                            title="Clubs Management | ClubSphere"
                            description="Manage your clubs and club memberships."
                        />
                        <ClubsManagement></ClubsManagement>
                    </>
                )
            },
            {
                path: 'events-management',
                element: (
                    <>
                        <HelmetWrapper 
                            title="Events Management | ClubSphere"
                            description="Manage events for your clubs."
                        />
                        <EventsManagement></EventsManagement>
                    </>
                )
            },
            {
                path: 'users-management',
                element: (
                    <>
                        <HelmetWrapper 
                            title="Users Management | ClubSphere"
                            description="Manage users and their roles on ClubSphere."
                        />
                        <AdminRoutes>
                            <UsersManagement></UsersManagement>
                        </AdminRoutes>
                    </>
                )
            },
           
        ]
    }
]);
