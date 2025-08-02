import React, { useState, useEffect, useMemo, Fragment } from 'react';

// --- ICONS (No changes here, code is collapsed for brevity) ---
const MapPinIcon = ({ className = 'w-6 h-6' }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 004.6-5.9C17.54 15.097 18 13.51 18 12a6 6 0 00-12 0c0 1.51.46 3.097 1.17 4.41l.07.132a16.975 16.975 0 004.6 5.9zM12 10.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" clipRule="evenodd" /></svg>;
const ListBulletIcon = ({ className = 'w-6 h-6' }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 01-.75-.75z" clipRule="evenodd" /></svg>;
const XMarkIcon = ({ className = 'w-6 h-6' }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" /></svg>;
const ArrowUturnLeftIcon = ({ className = 'w-6 h-6' }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path fillRule="evenodd" d="M9.53 2.47a.75.75 0 010 1.06L4.81 8.25H15a6.75 6.75 0 010 13.5h-3a.75.75 0 010-1.5h3a5.25 5.25 0 100-10.5H4.81l4.72 4.72a.75.75 0 11-1.06 1.06l-6-6a.75.75 0 010-1.06l6-6a.75.75 0 011.06 0z" clipRule="evenodd" /></svg>;
const PlusIcon = ({ className = 'w-6 h-6' }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" /></svg>;
const ArrowRightOnRectangleIcon = ({ className = 'w-6 h-6' }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z" clipRule="evenodd" /></svg>;
const RoadIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M2.25 10.5a.75.75 0 000 1.5h19.5a.75.75 0 000-1.5H2.25z" /><path fillRule="evenodd" d="M20.53 3.47a.75.75 0 00-1.06 0l-2.25 2.25a.75.75 0 001.06 1.06l2.25-2.25a.75.75 0 000-1.06zM16.97 6.72a.75.75 0 001.06-1.06l-2.25-2.25a.75.75 0 00-1.06 1.06l2.25 2.25zM4.53 17.47a.75.75 0 00-1.06 0l-2.25 2.25a.75.75 0 101.06 1.06l2.25-2.25a.75.75 0 000-1.06zM8.03 20.72a.75.75 0 001.06-1.06l-2.25-2.25a.75.75 0 00-1.06 1.06l2.25 2.25z" clipRule="evenodd" /></svg>;
const LightbulbIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.25a.75.75 0 01.75.75v.518c.898.16 1.74.52 2.5.996l.368-.368a.75.75 0 111.06 1.06l-.367.368c.477.76.837 1.602.997 2.5h.518a.75.75 0 010 1.5h-.518c-.16.898-.52 1.74-.996 2.5l.368.368a.75.75 0 11-1.06 1.06l-.368-.367a5.216 5.216 0 01-2.5.997v.518a.75.75 0 01-1.5 0v-.518a5.216 5.216 0 01-2.5-.997l-.368.367a.75.75 0 11-1.06-1.06l.368-.368a5.212 5.212 0 01-.996-2.5H3a.75.75 0 010-1.5h.518c.16-.898.52-1.74.996-2.5l-.368-.368a.75.75 0 011.06-1.06l.368.368c.76-.477 1.602-.837 2.5-.997V3a.75.75 0 01.75-.75zM12 15a3 3 0 100-6 3 3 0 000 6z" /></svg>;
const WaterIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25c0 3.633 2.234 6.73 5.25 8.376 3.016-1.646 5.25-4.743 5.25-8.376A5.25 5.25 0 0012 1.5zm0 19.5a5.25 5.25 0 005.25-5.25c0-3.633-2.234-6.73-5.25-8.376C8.984 8.647 6.75 11.743 6.75 15.375a5.25 5.25 0 005.25 5.25z" clipRule="evenodd" /></svg>;
const TrashIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.006a.75.75 0 01-.749.654H5.83a.75.75 0 01-.749-.654L4.075 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452z" clipRule="evenodd" /></svg>;
const ShieldExclamationIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm-.75 10.5a.75.75 0 00-1.5 0v.09c-.534.163-1.02.433-1.432.784a.75.75 0 10.99 1.125A2.25 2.25 0 0112 12a.75.75 0 00-1.5 0v-.5a.75.75 0 00-.75-.75h-.008a.75.75 0 00-.742.653 3.75 3.75 0 006.218 2.54.75.75 0 10-.99-1.125 2.25 2.25 0 01-2.478-2.065V12a.75.75 0 00-.75-.75zm.75 6a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" /></svg>;
const ObstructionIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm14.25 1.5a.75.75 0 000-1.5H6.75a.75.75 0 000 1.5h10.5z" clipRule="evenodd" /></svg>;

// --- MOCK API & DATA (Removed, will use real API) ---
const STATUSES = { REPORTED: "Reported", IN_PROGRESS: "In Progress", RESOLVED: "Resolved" };
const USER_LOCATION = { lat: 40.7128, lng: -74.0060 };

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');


// --- API SERVICE OBJECT ---

// --- API SERVICE ---
 const API_BASE_URL = 'http://127.0.0.1:8000/api';

const api = {
    // --- AUTHENTICATION ---
    login: async (credentials) => {
        const response = await fetch(`${API_BASE_URL}/login/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
            credentials: 'include', // --- CHANGED: Important for session cookies
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Login failed');
        return data; // { success: true, user: {id, username} }
    },

    register: async (userData) => {
        const response = await fetch(`${API_BASE_URL}/register/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
            credentials: 'include',
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Registration failed');
        return data; // { success: 'User created successfully' }
    },
    
    logout: async () => {
         await fetch(`${API_BASE_URL}/logout/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });
    },

    // --- DATA FETCHING ---
    getIssues: async (location) => {
        const response = await fetch(`${API_BASE_URL}/issues/?lat=${location.lat}&lon=${location.lng}`);
        if (!response.ok) throw new Error('Failed to fetch issues');
        return await response.json();
    },

    getCategories: async () => {
        const response = await fetch(`${API_BASE_URL}/categories/`);
        if (!response.ok) throw new Error('Failed to fetch categories');
        return await response.json();
    },

    createIssue: async (issueFormData) => {
        // --- CHANGED: Now uses FormData for file uploads
        const response = await fetch(`${API_BASE_URL}/issues/create/`, {
            method: 'POST',
            body: issueFormData,
            credentials: 'include', // Important for session-based auth
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Failed to create issue');
        return data;
    }
};

const LocationPicker = ({ onLocationSelect }) => {
    const [markerPosition, setMarkerPosition] = useState(null);
    const mapRef = React.useRef(null);

    const handleMapClick = (e) => {
        const map = mapRef.current;
        if (!map) return;
        const rect = map.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const percentX = (x / rect.width) * 100;
        const percentY = (y / rect.height) * 100;

        setMarkerPosition({ x: percentX, y: percentY });

        // Convert percentage to mock lat/lng
        // These bounds are arbitrary for this example
        const mockBounds = {
            minLat: 28.4, maxLat: 28.8,
            minLng: 77.0, maxLng: 77.4
        };
        const lat = mockBounds.maxLat - (percentY / 100) * (mockBounds.maxLat - mockBounds.minLat);
        const lng = mockBounds.minLng + (percentX / 100) * (mockBounds.maxLng - mockBounds.minLng);

        onLocationSelect({ lat: lat.toFixed(6), lng: lng.toFixed(6) });
    };

    return (
        <div 
            ref={mapRef} 
            onClick={handleMapClick}
            className="relative w-full h-64 bg-slate-700 rounded-lg cursor-pointer border-2 border-slate-600 overflow-hidden bg-grid-slate-600/20"
        >
            {!markerPosition && <p className="flex items-center justify-center h-full text-slate-400 font-semibold">Click on the map to set issue location</p>}
            {markerPosition && (
                <div 
                    className="absolute transform -translate-x-1/2 -translate-y-full"
                    style={{ left: `${markerPosition.x}%`, top: `${markerPosition.y}%` }}
                >
                    <MapPinIcon className="w-10 h-10 text-sky-500 drop-shadow-lg" />
                </div>
            )}
        </div>
    );
};


const StatusBadge = ({ status }) => {
    const styles = {
        [STATUSES.REPORTED]: "bg-rose-500/20 text-rose-400",
        [STATUSES.IN_PROGRESS]: "bg-amber-500/20 text-amber-400",
        [STATUSES.RESOLVED]: "bg-emerald-500/20 text-emerald-400",
    };
    return <span className={`text-xs font-bold mr-2 px-3 py-1 rounded-full ${styles[status]}`}>{status}</span>;
};
const CategoryPill = ({ category, withIcon = false, categories }) => {
    const categoryInfo = {
        "Roads": { icon: RoadIcon, style: "bg-slate-600 text-slate-300" },
        "Lighting": { icon: LightbulbIcon, style: "bg-yellow-600/80 text-yellow-200" },
        "Water Supply": { icon: WaterIcon, style: "bg-sky-600 text-sky-200" },
        "Cleanliness": { icon: TrashIcon, style: "bg-fuchsia-600 text-fuchsia-200" },
        "Public Safety": { icon: ShieldExclamationIcon, style: "bg-orange-600 text-orange-200" },
        "Obstructions": { icon: ObstructionIcon, style: "bg-stone-600 text-stone-200" },
    };
    const info = categoryInfo[category] || { icon: () => null, style: "bg-gray-500 text-gray-200" };
    return (
        <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-md ${info.style}`}>
            {withIcon && <info.icon className="w-4 h-4 mr-1.5" />}
            {category}
        </span>
    );
}
const Spinner = () => (
    <div className="flex justify-center items-center p-12">
        <div className="relative">
            <div className="w-16 h-16 border-4 border-sky-800 rounded-full"></div>
            <div className="w-16 h-16 border-4 border-sky-400 rounded-full animate-spin border-t-transparent absolute top-0 left-0"></div>
        </div>
    </div>
);
const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center p-4" onClick={onClose}>
            <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-2xl transform transition-all" onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

// --- MAIN COMPONENTS ---

const Header = ({ isAuthenticated, user, onLogout, onReportIssueClick, onLoginClick }) => (
    <header className="bg-slate-900/70 backdrop-blur-lg border-b border-slate-800 sticky top-0 z-30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">
                CivicTrack
            </h1>
            <div className="flex items-center space-x-4">
                <button onClick={onReportIssueClick} className="inline-flex items-center bg-slate-800 text-slate-300 font-bold py-2.5 px-5 rounded-full hover:bg-slate-700 transition-colors duration-300 shadow-lg border border-slate-700">
                    <PlusIcon className="w-5 h-5 mr-2 -ml-1"/>
                    Report Issue
                </button>
                {isAuthenticated ? (
                    <>
                        <span className="text-slate-300 hidden sm:block">Welcome, <span className="font-bold text-white">{user.username}</span></span>
                        <button onClick={onLogout} title="Logout" className="p-2 rounded-full text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
                           <ArrowRightOnRectangleIcon className="w-6 h-6 rotate-180"/>
                        </button>
                    </>
                ) : (
                    <button onClick={onLoginClick} className="inline-flex items-center bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold py-2.5 px-6 rounded-full hover:scale-105 transform transition-transform duration-300 shadow-lg hover:shadow-sky-500/30">
                        Login / Register
                    </button>
                )}
            </div>
        </div>
    </header>
);

const IssueCard = ({ issue, onSelectIssue, categories }) => {
    const statusBorders = {
        [STATUSES.REPORTED]: "border-rose-500",
        [STATUSES.IN_PROGRESS]: "border-amber-500",
        [STATUSES.RESOLVED]: "border-emerald-500",
    };
    return (
    <div onClick={() => onSelectIssue(issue.id)} className={`bg-slate-800 rounded-xl shadow-lg hover:shadow-sky-500/10 hover:border-sky-500 transition-all duration-300 cursor-pointer overflow-hidden border-l-4 ${statusBorders[issue.status]}`}>
        <div className="p-5">
            <div className="flex justify-between items-start mb-3">
                <CategoryPill category={issue.category} withIcon={true} />
                <span className="text-sm font-medium text-slate-400 flex items-center">
                    <MapPinIcon className="w-4 h-4 mr-1 text-slate-500"/>
                    {issue.distance ? `${issue.distance.toFixed(1)} km` : 'N/A'}
                </span>
            </div>
            <h3 className="text-lg font-bold text-slate-100 mb-2 truncate">{issue.title}</h3>
            <p className="text-slate-400 text-sm mb-4 h-10 line-clamp-2">{issue.description}</p>
            <div className="flex justify-between items-center pt-3 border-t border-slate-700/50">
                <StatusBadge status={issue.status} />
                <span className="text-xs text-slate-500">
                    By: {issue.reporter}
                </span>
            </div>
        </div>
    </div>
)};

const FilterBar = ({ filters, setFilters, categories }) => (
    <div className="bg-slate-800/50 backdrop-blur-sm p-4 rounded-xl shadow-md mb-8 border border-slate-700">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {['status', 'category', 'distance'].map(filterType => (
                <div key={filterType}>
                    <label htmlFor={`${filterType}-filter`} className="block text-sm font-bold text-slate-300 mb-1 capitalize">{filterType}</label>
                    <select
                        id={`${filterType}-filter`}
                        value={filters[filterType]}
                        onChange={e => setFilters({...filters, [filterType]: e.target.value})}
                        className="w-full p-2.5 bg-slate-700 border border-slate-600 text-white rounded-lg shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                    >
                        {filterType === 'status' && <><option value="ALL">All Statuses</option>{Object.values(STATUSES).map(s => <option key={s} value={s}>{s}</option>)}</>}
                        {filterType === 'category' && <><option value="ALL">All Categories</option>{categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}</>}
                        {filterType === 'distance' && <><option value="5">Within 5 km</option><option value="3">Within 3 km</option><option value="1">Within 1 km</option></>}
                    </select>
                </div>
            ))}
        </div>
    </div>
);

const IssueMap = ({ issues, onSelectIssue }) => {
     // --- NEW: Generate mock locations if they don't exist
    const issuesWithLocations = useMemo(() => {
        return issues.map(issue => {
            if (issue.location && issue.location.x && issue.location.y) return issue;
            return { ...issue, location: { ...issue.location, x: Math.random() * 90 + 5, y: Math.random() * 90 + 5 } };
        });
    }, [issues]);

     const getPinClasses = (status) => {
        switch (status) {
            case STATUSES.REPORTED: return 'text-rose-500 animate-pulse-slow';
            case STATUSES.IN_PROGRESS: return 'text-amber-500';
            case STATUSES.RESOLVED: return 'text-emerald-500';
            default: return 'text-slate-500';
        }
    };

    return (
        <div className="relative w-full h-[500px] bg-slate-800 rounded-xl shadow-xl overflow-hidden border-4 border-slate-700">
            <div className="absolute inset-0 bg-grid-slate-700/40 [background-position:10px_10px]"></div>
            <div className="absolute top-0 left-0 w-full h-full">
                {issuesWithLocations.map(issue => (
                    <div
                        key={issue.id}
                        className="absolute transform -translate-x-1/2 -translate-y-full cursor-pointer group"
                        style={{ left: `${issue.location.x}%`, top: `${issue.location.y}%` }}
                        onClick={() => onSelectIssue(issue.id)}
                    >
                        <MapPinIcon className={`w-10 h-10 drop-shadow-lg ${getPinClasses(issue.status)} transition-transform duration-200 group-hover:scale-125`} />
                        <div className="hidden group-hover:block absolute bottom-full mb-2 w-48 bg-slate-900 border border-slate-700 p-3 rounded-lg shadow-xl text-center z-10 transition-all">
                            <p className="font-bold text-sm text-white truncate">{issue.title}</p>
                            <CategoryPill category={issue.category} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const StatsBar = ({ issues }) => {
    const stats = useMemo(() => issues.reduce((acc, issue) => {
        if (issue.status === STATUSES.REPORTED) acc.reported++;
        if (issue.status === STATUSES.IN_PROGRESS) acc.inProgress++;
        if (issue.status === STATUSES.RESOLVED) acc.resolved++;
        return acc;
    }, { reported: 0, inProgress: 0, resolved: 0 }), [issues]);

    const statItems = [
        { label: 'Total Issues', value: issues.length, color: 'text-sky-400' },
        { label: 'In Progress', value: stats.inProgress, color: 'text-amber-400' },
        { label: 'Resolved', value: stats.resolved, color: 'text-emerald-400' },
    ];

    return (
        <div className="bg-slate-800/80 border border-slate-700 rounded-xl shadow-lg p-4 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                {statItems.map(item => (
                    <div key={item.label} className="p-2">
                        <p className="text-4xl font-extrabold text-white">{item.value}</p>
                        <p className={`text-sm font-semibold ${item.color}`}>{item.label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- PAGES ---

const DashboardPage = ({ issues, loading, filters, setFilters, onSelectIssue, categories }) => {
    const [view, setView] = useState('list');

    const filteredIssues = useMemo(() => {
        return issues
            .filter(issue => filters.status === 'ALL' || issue.status === filters.status)
            .filter(issue => filters.category === 'ALL' || issue.category === filters.category)
            .filter(issue => issue.distance <= parseInt(filters.distance));
    }, [issues, filters]);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <StatsBar issues={issues} />
            <FilterBar filters={filters} setFilters={setFilters} categories={categories} />

            <div className="flex justify-end mb-6">
                <div className="inline-flex rounded-full shadow-md bg-slate-800 p-1" role="group">
                    <button onClick={() => setView('list')} type="button" className={`px-5 py-2 text-sm font-bold ${view === 'list' ? 'bg-sky-600 text-white shadow-md' : 'text-slate-300'} rounded-full transition-all`}>
                        <ListBulletIcon className="w-5 h-5 inline-block mr-2" /> List
                    </button>
                    <button onClick={() => setView('map')} type="button" className={`px-5 py-2 text-sm font-bold ${view === 'map' ? 'bg-sky-600 text-white shadow-md' : 'text-slate-300'} rounded-full transition-all`}>
                        <MapPinIcon className="w-5 h-5 inline-block mr-2" /> Map
                    </button>
                </div>
            </div>

            {loading ? <Spinner /> : (
                <Fragment>
                    {view === 'list' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredIssues.map(issue => <IssueCard key={issue.id} issue={issue} onSelectIssue={onSelectIssue} categories={categories} />)}
                        </div>
                    ) : (
                        <IssueMap issues={filteredIssues} onSelectIssue={onSelectIssue} />
                    )}
                    {!loading && filteredIssues.length === 0 && <p className="text-center text-slate-400 mt-12 text-lg">No issues found. Try adjusting your filters!</p>}
                </Fragment>
            )}
        </div>
    );
};

/*
const ReportIssuePage = ({ onBack, onIssueCreated, isSubmitting, categories }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState(categories[0]?.id || '');
    const [files, setFiles] = useState([]); // --- NEW: State for files

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !description || !categoryId) { alert("Please fill all fields."); return; }
        
        // --- CHANGED: Use FormData for submission
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('category', categoryId);
        formData.append('latitude', USER_LOCATION.lat);
        formData.append('longitude', USER_LOCATION.lng);
        formData.append('is_anonymous', 'false'); // Example value
        
        files.forEach(file => {
            formData.append('images', file);
        });

        onIssueCreated(formData);
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6"><h2 className="text-3xl font-bold text-white">Report a New Issue</h2><button onClick={onBack} className="text-slate-400 hover:text-white transition-colors"><XMarkIcon className="w-7 h-7" /></button></div>
            <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                    <div><label htmlFor="title" className="block text-slate-300 text-sm font-bold mb-2">Title</label><input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} className="appearance-none bg-slate-700 border-2 border-slate-600 rounded-lg w-full py-3 px-4 text-white leading-tight focus:outline-none focus:bg-slate-700 focus:border-sky-500 transition-all" required /></div>
                    <div><label htmlFor="description" className="block text-slate-300 text-sm font-bold mb-2">Description</label><textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows="4" className="appearance-none bg-slate-700 border-2 border-slate-600 rounded-lg w-full py-3 px-4 text-white leading-tight focus:outline-none focus:bg-slate-700 focus:border-sky-500 transition-all" required></textarea></div>
                    <div><label htmlFor="category" className="block text-slate-300 text-sm font-bold mb-2">Category</label><select id="category" value={categoryId} onChange={e => setCategoryId(e.target.value)} className="appearance-none bg-slate-700 border-2 border-slate-600 rounded-lg w-full py-3 px-4 text-white leading-tight focus:outline-none focus:bg-slate-700 focus:border-sky-500 transition-all">{categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
                    <div><label htmlFor="photos" className="block text-slate-300 text-sm font-bold mb-2">Photos</label><input type="file" id="photos" multiple onChange={e => setFiles(Array.from(e.target.files))} className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-100 file:text-sky-700 hover:file:bg-sky-200" /></div>
                </div>
                <div className="mt-8 flex justify-end"><button type="submit" disabled={isSubmitting} className="w-full sm:w-auto bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-lg focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-sky-500/30">{isSubmitting ? 'Submitting...' : 'Submit Report'}</button></div>
            </form>
        </div>
    );
};
*/

const ReportIssuePage = ({ onBack, onIssueCreated, isSubmitting, categories }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState(categories[0]?.id || '');
    const [files, setFiles] = useState([]);
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [location, setLocation] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !description || !categoryId) {
            alert("Please fill title, description, and category."); return;
        }
        if (!location) {
            alert("Please select a location on the map."); return;
        }
        
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('category', categoryId);
        formData.append('latitude', location.lat);
        formData.append('longitude', location.lng);
        formData.append('is_anonymous', isAnonymous);
        
        files.forEach(file => {
            formData.append('images', file);
        });

        onIssueCreated(formData);
    };

    return (
        <div className="p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-white">Report a New Issue</h2>
                <button onClick={onBack} className="text-slate-400 hover:text-white transition-colors"><XMarkIcon className="w-7 h-7" /></button>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-slate-300 text-sm font-bold mb-2">Title</label>
                        <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} className="appearance-none bg-slate-700 border-2 border-slate-600 rounded-lg w-full py-3 px-4 text-white leading-tight focus:outline-none focus:bg-slate-700 focus:border-sky-500 transition-all" required />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-slate-300 text-sm font-bold mb-2">Description</label>
                        <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows="4" className="appearance-none bg-slate-700 border-2 border-slate-600 rounded-lg w-full py-3 px-4 text-white leading-tight focus:outline-none focus:bg-slate-700 focus:border-sky-500 transition-all" required></textarea>
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-slate-300 text-sm font-bold mb-2">Category</label>
                        <select id="category" value={categoryId} onChange={e => setCategoryId(e.target.value)} className="appearance-none bg-slate-700 border-2 border-slate-600 rounded-lg w-full py-3 px-4 text-white leading-tight focus:outline-none focus:bg-slate-700 focus:border-sky-500 transition-all">{categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select>
                    </div>
                    <div>
                        <label className="block text-slate-300 text-sm font-bold mb-2">Location</label>
                        <LocationPicker onLocationSelect={setLocation} />
                    </div>
                    <div>
                        <label htmlFor="photos" className="block text-slate-300 text-sm font-bold mb-2">Photos</label>
                        <input type="file" id="photos" multiple onChange={e => setFiles(Array.from(e.target.files))} className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-100 file:text-sky-700 hover:file:bg-sky-200" />
                    </div>
                     <div className="flex items-center">
                        <input id="is_anonymous" type="checkbox" checked={isAnonymous} onChange={(e) => setIsAnonymous(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-600" />
                        <label htmlFor="is_anonymous" className="ml-3 block text-sm font-medium leading-6 text-slate-300">Report Anonymously</label>
                    </div>
                </div>
                <div className="mt-8 flex justify-end">
                    <button type="submit" disabled={isSubmitting} className="w-full sm:w-auto bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-lg focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-sky-500/30">{isSubmitting ? 'Submitting...' : 'Submit Report'}</button>
                </div>
            </form>
        </div>
    );
};

const IssueDetailPage = ({ issueId, issues, onBack }) => {
    const issue = issues.find(i => i.id === issueId);
    if (!issue) return <div className="container mx-auto px-4 py-8 text-center"><p className="text-rose-400 text-xl">Oops! Issue not found.</p><button onClick={onBack} className="mt-6 text-sky-400 hover:underline font-semibold">Go Back to Dashboard</button></div>;
    const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });

    return (
         <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
            <button onClick={onBack} className="flex items-center text-sky-400 font-semibold mb-6 hover:underline"><ArrowUturnLeftIcon className="w-5 h-5 mr-2" />Back to Dashboard</button>
            <div className="bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-700">
                <div className="p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start mb-4"><CategoryPill category={issue.category} withIcon={true} /><div className="mt-2 sm:mt-0"><StatusBadge status={issue.status} /></div></div>
                    <h2 className="text-4xl font-extrabold text-white mb-4">{issue.title}</h2>
                    <p className="text-slate-300 text-lg mb-8 leading-relaxed">{issue.description}</p>
                    {issue.images && issue.images.length > 0 && <div className="mb-8"><h3 className="text-2xl font-bold text-white mb-4">Photos</h3><div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">{issue.images.map((photoUrl, index) => <img key={index} src={`http://127.0.0.1:8000${photoUrl}`} alt={`Issue ${index + 1}`} className="w-full h-auto rounded-xl shadow-md transition-transform hover:scale-105" />)}</div></div>}
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700"><h3 className="text-2xl font-bold text-white mb-4">Details</h3><ul className="space-y-3 text-slate-300"><li className="flex items-center"><strong>Reported by:</strong><span className="ml-2 font-medium">{issue.reporter}</span></li><li className="flex items-center"><strong>Location:</strong><span className="ml-2 font-medium">{issue.distance ? `Approx. ${issue.distance.toFixed(1)} km away` : 'N/A'}</span></li></ul></div>
                        <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700"><h3 className="text-2xl font-bold text-white mb-4">Status History</h3><div className="relative border-l-4 border-slate-700 pl-6">{issue.history.slice().reverse().map((event, index) => <div key={index} className="relative mb-6 last:mb-0"><div className={`absolute -left-[1.7rem] top-1 w-6 h-6 bg-slate-800 rounded-full border-4 ${index === 0 ? 'border-sky-500' : 'border-slate-600'}`}></div><p className={`font-bold ${index === 0 ? 'text-sky-400' : 'text-white'}`}>{event.status}</p><p className="text-sm text-slate-400">{formatDate(event.timestamp)}</p></div>)}</div></div>
                    </div>
                </div>
            </div>
        </div>
    )
};

const AuthForm = ({ onLogin, onRegister, onDone }) => {
    const [isLoginView, setIsLoginView] = useState(true);
    const [username, setUsername] = useState(''); // --- CHANGED to username
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            if (isLoginView) {
                await onLogin({ username, password });
            } else {
                await onRegister({ username, email, password });
            }
            onDone(); // Close modal on success
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-8">
            <h2 className="text-3xl font-bold text-white text-center mb-6">{isLoginView ? 'Sign In' : 'Create Account'}</h2>
            <p className="text-slate-400 text-center mb-6">{isLoginView ? 'Sign in to report issues and track their status.' : 'Join to start reporting issues in your community.'}</p>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div><label className="block text-slate-300 text-sm font-bold mb-2" htmlFor="username-auth">Username</label><input className="appearance-none bg-slate-700 border-2 border-slate-600 rounded-lg w-full py-3 px-4 text-white leading-tight focus:outline-none focus:bg-slate-700 focus:border-sky-500" id="username-auth" type="text" value={username} onChange={e => setUsername(e.target.value)} required /></div>
                {!isLoginView && (
                    <div><label className="block text-slate-300 text-sm font-bold mb-2" htmlFor="email-auth">Email Address</label><input className="appearance-none bg-slate-700 border-2 border-slate-600 rounded-lg w-full py-3 px-4 text-white leading-tight focus:outline-none focus:bg-slate-700 focus:border-sky-500" id="email-auth" type="email" value={email} onChange={e => setEmail(e.target.value)} required /></div>
                )}
                <div><label className="block text-slate-300 text-sm font-bold mb-2" htmlFor="password-auth">Password</label><input className="appearance-none bg-slate-700 border-2 border-slate-600 rounded-lg w-full py-3 px-4 text-white leading-tight focus:outline-none focus:bg-slate-700 focus:border-sky-500" id="password-auth" type="password" value={password} onChange={e => setPassword(e.target.value)} required /></div>
                {error && <p className="text-rose-400 text-sm text-center">{error}</p>}
                <div><button className="w-full bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline disabled:opacity-50" type="submit" disabled={isLoading}>{isLoading ? 'Processing...' : (isLoginView ? 'Sign In' : 'Sign Up')}</button></div>
            </form>
            <p className="text-center text-slate-400 text-sm mt-6">{isLoginView ? "Don't have an account?" : "Already have an account?"}<button onClick={() => setIsLoginView(!isLoginView)} className="font-bold text-sky-400 hover:text-sky-300 ml-2">{isLoginView ? 'Sign Up' : 'Sign In'}</button></p>
        </div>
    );
};

// --- Main App Component ---
export default function App() {
    const [page, setPage] = useState('dashboard');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedIssueId, setSelectedIssueId] = useState(null);
    const [issues, setIssues] = useState([]);
    const [categories, setCategories] = useState([]); // --- NEW: State for categories
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ status: 'ALL', category: 'ALL', distance: '5' });

    // --- CHANGED: Fetch public issues & categories on initial load
    useEffect(() => {
        const fetchInitialData = async () => {
            setLoading(true);
            try {
                // Fetch in parallel
                const [issuesData, categoriesData] = await Promise.all([
                    api.getIssues(USER_LOCATION),
                    api.getCategories()
                ]);
                setIssues(issuesData);
                setCategories(categoriesData);
            } catch (error) {
                console.error("Failed to fetch initial data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchInitialData();
    }, []);

    const handleLogin = async (credentials) => {
        const { user } = await api.login(credentials);
        setCurrentUser(user);
        setIsAuthenticated(true);
    };

    const handleRegister = async (userData) => {
        await api.register(userData);
        // --- NEW: Automatically log in after successful registration
        await handleLogin({ username: userData.username, password: userData.password });
    };

    const handleLogout = async () => {
        await api.logout();
        setCurrentUser(null);
        setIsAuthenticated(false);
    };

    const handleSelectIssue = (id) => { setSelectedIssueId(id); setPage('detail'); };
    const handleBackToDashboard = () => { setPage('dashboard'); setSelectedIssueId(null); };

    const handleReportIssueClick = () => {
        if (isAuthenticated) {
            setIsReportModalOpen(true);
        } else {
            setIsAuthModalOpen(true);
        }
    };

    /*const handleIssueCreated = async (issueFormData) => {
        setIsSubmitting(true);
        try {
            const newIssue = await api.createIssue(issueFormData);
            setIssues(prev => [...prev, newIssue]);
            setIsReportModalOpen(false);
            handleSelectIssue(newIssue.id); // Go to detail page of the new issue
        } catch (error) {
            console.error("Failed to create issue:", error);
            alert("There was an error submitting your report. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
	};*/
     const handleIssueCreated = async (issueFormData) => {
      setIsSubmitting(true);
      try {
        const newIssue = await api.createIssue(issueFormData);
        setIssues(prev => [...prev, newIssue]);
        setIsReportModalOpen(false);
        handleSelectIssue(newIssue.id);
      } catch (error) {
          console.error("Failed to create issue:", error);
        // --- CHANGED: Display the specific error message ---
        alert(`There was an error submitting your report: ${error.message}`);
      } finally {
        setIsSubmitting(false);
    }
	};


    const renderPage = () => {
        if (page === 'detail') {
            return <IssueDetailPage issueId={selectedIssueId} issues={issues} onBack={handleBackToDashboard} />;
        }
        return <DashboardPage issues={issues} loading={loading} filters={filters} setFilters={setFilters} onSelectIssue={handleSelectIssue} categories={categories} />;
    };

    return (
        <div className="bg-slate-900 min-h-screen font-sans antialiased text-slate-300">
            <Header isAuthenticated={isAuthenticated} user={currentUser} onLogout={handleLogout} onReportIssueClick={handleReportIssueClick} onLoginClick={() => setIsAuthModalOpen(true)} />
            <main>{renderPage()}</main>

            <Modal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)}>
                <AuthForm onLogin={handleLogin} onRegister={handleRegister} onDone={() => setIsAuthModalOpen(false)} />
            </Modal>

            <Modal isOpen={isReportModalOpen} onClose={() => setIsReportModalOpen(false)}>
                 <ReportIssuePage onBack={() => setIsReportModalOpen(false)} onIssueCreated={handleIssueCreated} isSubmitting={isSubmitting} categories={categories} />
            </Modal>

            <footer className="text-center py-6 mt-8"><p className="text-sm text-slate-500">&copy; 2025 CivicTrack. Empowering Communities with Technology.</p></footer>
        </div>
    );
}
