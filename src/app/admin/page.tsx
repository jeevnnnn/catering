"use client";

import React, { useState, useEffect } from "react";
import { Lead, getLeads, isUsingFallback } from "@/lib/firebase";
import LeadDetailsModal from "@/components/LeadDetailsModal";
import { 
  Lock, Search, Filter, ArrowUpDown, Download, Database, Users, 
  DollarSign, Mail, CheckCircle2, TrendingUp, Sparkles, LogOut, ChevronLeft, ChevronRight 
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from "recharts";

// Passcode to unlock the dashboard
const SECRET_PASSCODE = process.env.NEXT_PUBLIC_ADMIN_PASSCODE || "admin123";
const IS_PASSCODE_DEFAULT = !process.env.NEXT_PUBLIC_ADMIN_PASSCODE;

// Initial seed data to populate LocalStorage if empty, so the user has mock leads to test out of the box
const MOCK_SEEDS: Omit<Lead, "id">[] = [
  {
    name: "Lady Georgina Cavendish",
    phone: "+44 7700 900077",
    email: "georgina@cavendish-estates.co.uk",
    eventType: "wedding",
    eventDate: "2026-07-15",
    guestCount: 200,
    budget: 25000,
    location: "Blenheim Palace Gardens, Oxfordshire",
    requirements: "Requires custom champagne raw oyster tower, 5-course plated dinner, gluten-free dessert variations for bridal table.",
    status: "Negotiation",
    createdAt: "2026-06-24T10:30:00.000Z"
  },
  {
    name: "Marcus Aurelius Vance",
    phone: "+44 7700 900088",
    email: "m.vance@vancetech.io",
    eventType: "corporate",
    eventDate: "2026-08-04",
    guestCount: 500,
    budget: 45000,
    location: "The Savoy Ballroom, London",
    requirements: "AGM tech gala dinner. Espresso counters, quick-service hot buffet tables. Branded cupcakes at dessert station.",
    status: "Confirmed",
    createdAt: "2026-06-25T08:15:00.000Z"
  },
  {
    name: "The Sterling Family",
    phone: "+44 7700 900099",
    email: "sterling@prestige-invest.com",
    eventType: "birthday",
    eventDate: "2026-09-20",
    guestCount: 80,
    budget: 8500,
    location: "Sterling Private Manor, Mayfair",
    requirements: "Milestone 50th birthday party. Woodfire grill outdoors, live acoustic jazz band. Premium floral centerpieces.",
    status: "New",
    createdAt: "2026-06-25T15:20:00.000Z"
  },
  {
    name: "Sir Arthur Pendelton",
    phone: "+44 7700 900110",
    email: "arthur@pendelton-legal.com",
    eventType: "private",
    eventDate: "2026-06-30",
    guestCount: 12,
    budget: 3500,
    location: "Knightsbridge Penthouse, London",
    requirements: "7-course private chef plated dinner. Premium wine pairings, dedicated private host. Caviar and white truffles requested.",
    status: "Contacted",
    createdAt: "2026-06-23T18:45:00.000Z"
  },
  {
    name: "Queen Mary Gala",
    phone: "+44 7700 900220",
    email: "coordination@queenmaryevents.org",
    eventType: "corporate",
    eventDate: "2026-05-12",
    guestCount: 1000,
    budget: 95000,
    location: "Royal Albert Hall, London",
    requirements: "Grand charity buffet. Live cooking theatrical counters. Full table designs, photography, and classical orchestra setup.",
    status: "Completed",
    createdAt: "2026-05-01T09:00:00.000Z"
  }
];

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [passcodeError, setPasscodeError] = useState(false);

  // Lead State
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  
  // Search, Filters & Sorting
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [sortField, setSortField] = useState<keyof Lead>("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Initialize and check LocalStorage seeding
  useEffect(() => {
    if (!isAuthenticated) return;
    
    const fetchLeads = async () => {
      setLoading(true);
      try {
        let leadsList = await getLeads();
        
        // If leads list is completely empty and we are using localStorage fallback, seed initial data for demonstration
        if (leadsList.length === 0 && typeof window !== "undefined") {
          const seeds = MOCK_SEEDS.map((s, idx) => ({
            id: `seed_${idx + 1}`,
            ...s
          }));
          localStorage.setItem("catering_leads", JSON.stringify(seeds));
          leadsList = seeds as Lead[];
        }
        
        setLeads(leadsList);
      } catch (err) {
        console.error("Failed to load leads:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === SECRET_PASSCODE) {
      setIsAuthenticated(true);
      setPasscodeError(false);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("admin_authed", "true");
      }
    } else {
      setPasscodeError(true);
    }
  };

  // Persist session storage login check
  useEffect(() => {
    if (typeof window !== "undefined") {
      const authed = sessionStorage.getItem("admin_authed");
      if (authed === "true") {
        setIsAuthenticated(true);
      }
    }
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasscode("");
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("admin_authed");
    }
  };

  const reloadLeads = async () => {
    try {
      const leadsList = await getLeads();
      setLeads(leadsList);
    } catch (err) {
      console.error(err);
    }
  };

  // Sort and filter logic
  const handleSort = (field: keyof Lead) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const filteredLeads = leads
    .filter((lead) => {
      const matchSearch = 
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchStatus = filterStatus === "all" || lead.status === filterStatus;
      const matchType = filterType === "all" || lead.eventType === filterType;
      
      return matchSearch && matchStatus && matchType;
    })
    .sort((a, b) => {
      let comparison = 0;
      const fieldA = a[sortField];
      const fieldB = b[sortField];

      if (typeof fieldA === "string" && typeof fieldB === "string") {
        comparison = fieldA.localeCompare(fieldB);
      } else if (typeof fieldA === "number" && typeof fieldB === "number") {
        comparison = fieldA - fieldB;
      }
      return sortDirection === "desc" ? -comparison : comparison;
    });

  // Paginated leads
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLeads = filteredLeads.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);

  // CSV Export utility
  const handleCSVExport = () => {
    const headers = ["ID", "Name", "Email", "Phone", "Event Type", "Event Date", "Guests", "Budget ($)", "Location", "Status", "Submitted At"];
    const rows = filteredLeads.map((l) => [
      l.id,
      `"${l.name.replace(/"/g, '""')}"`,
      l.email,
      l.phone,
      l.eventType,
      l.eventDate,
      l.guestCount,
      l.budget,
      `"${l.location.replace(/"/g, '""')}"`,
      l.status,
      l.createdAt
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `KAÈON_Leads_Report_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Analytics helper metrics
  const totalRevenue = leads
    .filter(l => l.status !== "Cancelled")
    .reduce((sum, current) => sum + current.budget, 0);

  const activeLeadsCount = leads.filter(l => l.status === "New" || l.status === "Contacted" || l.status === "Negotiation").length;

  // Chart data extraction (Budget grouped by Event Type)
  const chartData = ["wedding", "corporate", "birthday", "private"].map((type) => {
    const budgetSum = leads
      .filter((l) => l.eventType === type && l.status !== "Cancelled")
      .reduce((sum, curr) => sum + curr.budget, 0);
    
    const label = type === "wedding" ? "Weddings" : type === "corporate" ? "Corporates" : type === "birthday" ? "Birthdays" : "Private Dining";
    
    return { name: label, Budget: budgetSum };
  });

  if (!isAuthenticated) {
    return (
      <div className="w-full min-h-screen bg-[#FFFDF9] flex items-center justify-center px-6 py-20 font-sans">
        <form 
          onSubmit={handleLogin}
          className="w-full max-w-md rounded-2xl glass-panel shadow-2xl border border-[#C9A66B]/25 p-8 flex flex-col items-center space-y-6"
        >
          <div className="p-3 bg-[#8B5E3C]/10 rounded-full text-[#8B5E3C]">
            <Lock className="w-8 h-8" />
          </div>
          
          <div className="text-center">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8B5E3C] font-extrabold">
              KAÈON Security
            </span>
            <h2 className="text-xl font-serif font-bold text-[#1A1A1A] mt-1">
              VIP Concierge Dashboard
            </h2>
            <p className="text-xs text-[#444444]/65 mt-1.5 leading-relaxed">
              Enter the passcode below to manage calendar reservations, budgets, and lead records.
            </p>
          </div>

          <div className="w-full">
            <input
              type="password"
              placeholder="Passcode"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full bg-[#FFFDF9] border border-[#C9A66B]/30 rounded px-4 py-2.5 text-center text-sm focus:outline-none focus:ring-1 focus:ring-[#8B5E3C] transition-all font-mono"
            />
            {IS_PASSCODE_DEFAULT && (
              <span className="text-[10px] text-amber-600 font-semibold block text-center mt-2">
                Notice: Using default security passcode. Configure NEXT_PUBLIC_ADMIN_PASSCODE in .env to override.
              </span>
            )}
            {passcodeError && (
              <span className="text-[10px] text-red-500 font-semibold block text-center mt-2">
                Invalid Passcode. Please try again.
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#8B5E3C] hover:bg-[#724D30] text-white rounded text-xs font-semibold uppercase tracking-widest transition-colors cursor-pointer"
          >
            Authenticate Portal
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#FFFDF9] py-12 px-6 font-sans">
      
      {/* Dashboard Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10 border-b border-[#C9A66B]/20 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#8B5E3C]" />
            <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8B5E3C]">
              KAÈON Executive Desk
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#1A1A1A] mt-1">
            Lead Operations Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {isUsingFallback() && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-amber-200 bg-amber-50 text-[10px] text-amber-800 font-semibold">
              <Database className="w-3.5 h-3.5" />
              <span>Offline Fallback (LocalStorage)</span>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-4 py-2 border border-red-200 hover:bg-red-50 text-xs font-semibold text-red-600 rounded transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Analytics widgets */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        
        {/* Metric 1 */}
        <div className="glass-panel border border-[#C9A66B]/20 rounded-xl p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#8B5E3C] font-bold block">
              Total Inquiries Captured
            </span>
            <span className="text-3xl font-serif font-bold text-[#1a1a1a] block mt-1.5">
              {leads.length}
            </span>
          </div>
          <div className="p-3 rounded-full bg-[#8B5E3C]/10 text-[#8B5E3C]">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="glass-panel border border-[#C9A66B]/20 rounded-xl p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#8B5E3C] font-bold block">
              Projected Revenue Pipeline
            </span>
            <span className="text-3xl font-serif font-bold text-[#1a1a1a] block mt-1.5">
              ${totalRevenue.toLocaleString()}
            </span>
          </div>
          <div className="p-3 rounded-full bg-[#8B5E3C]/10 text-[#8B5E3C]">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="glass-panel border border-[#C9A66B]/20 rounded-xl p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#8B5E3C] font-bold block">
              Active Negotiations
            </span>
            <span className="text-3xl font-serif font-bold text-[#1a1a1a] block mt-1.5">
              {activeLeadsCount}
            </span>
          </div>
          <div className="p-3 rounded-full bg-[#8B5E3C]/10 text-[#8B5E3C]">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Main Grid: Left side Table, Right side mini Rechart */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        
        {/* Left 8 columns: Table */}
        <div className="lg:col-span-8 flex flex-col space-y-4">
          
          {/* Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#8B5E3C]/5 p-4 rounded-xl border border-[#C9A66B]/15">
            
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-[#444444]/60 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search name, venue..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#FFFDF9] border border-[#C9A66B]/25 rounded pl-9 pr-4 py-2 text-xs focus:outline-none"
              />
            </div>

            {/* Filter selectors */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <div className="flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-[#8B5E3C]" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-[#FFFDF9] border border-[#C9A66B]/25 rounded text-xs px-2.5 py-2 cursor-pointer"
                >
                  <option value="all">All Status</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Negotiation">Negotiation</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="bg-[#FFFDF9] border border-[#C9A66B]/25 rounded text-xs px-2.5 py-2 cursor-pointer"
              >
                <option value="all">All Event Types</option>
                <option value="wedding">Weddings</option>
                <option value="corporate">Corporates</option>
                <option value="birthday">Birthdays</option>
                <option value="private">Private</option>
              </select>

              <button
                onClick={handleCSVExport}
                className="flex items-center gap-1 px-3 py-2 bg-[#8B5E3C] hover:bg-[#724D30] text-white text-xs font-semibold rounded transition-colors cursor-pointer ml-auto sm:ml-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            </div>

          </div>

          {/* Table Container */}
          <div className="overflow-x-auto border border-[#C9A66B]/20 rounded-xl bg-white/50 shadow-sm">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#8B5E3C]/5 border-b border-[#C9A66B]/20 text-[#8B5E3C] font-bold uppercase tracking-wider">
                  <th className="px-5 py-4 cursor-pointer hover:bg-[#8B5E3C]/10 select-none" onClick={() => handleSort("name")}>
                    <div className="flex items-center gap-1">
                      <span>Client</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="px-5 py-4 cursor-pointer hover:bg-[#8B5E3C]/10 select-none" onClick={() => handleSort("eventType")}>
                    <div className="flex items-center gap-1">
                      <span>Event Type</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="px-5 py-4 cursor-pointer hover:bg-[#8B5E3C]/10 select-none" onClick={() => handleSort("eventDate")}>
                    <div className="flex items-center gap-1">
                      <span>Date</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="px-5 py-4 cursor-pointer hover:bg-[#8B5E3C]/10 select-none" onClick={() => handleSort("budget")}>
                    <div className="flex items-center gap-1">
                      <span>Budget</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="px-5 py-4 cursor-pointer hover:bg-[#8B5E3C]/10 select-none" onClick={() => handleSort("status")}>
                    <div className="flex items-center gap-1">
                      <span>Status</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="px-5 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#C9A66B]/15 text-[#444444]">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="text-center py-10 uppercase tracking-widest text-[#8B5E3C] font-semibold">
                      Loading lead sheets...
                    </td>
                  </tr>
                ) : currentLeads.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-10 text-[#444444]/65 italic">
                      No matching leads found.
                    </td>
                  </tr>
                ) : (
                  currentLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-white/90 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="font-semibold text-[#1A1A1A]">{lead.name}</div>
                        <div className="text-[10px] text-[#444444]/60 mt-0.5">{lead.email}</div>
                      </td>
                      <td className="px-5 py-3.5 capitalize">{lead.eventType}</td>
                      <td className="px-5 py-3.5">{lead.eventDate}</td>
                      <td className="px-5 py-3.5 font-bold">${lead.budget.toLocaleString()}</td>
                      <td className="px-5 py-3.5">
                        <span className={`px-2 py-0.5 rounded border text-[10px] font-bold ${
                          lead.status === "New" ? "bg-blue-50 text-blue-700 border-blue-100" :
                          lead.status === "Contacted" ? "bg-amber-50 text-amber-700 border-amber-100" :
                          lead.status === "Negotiation" ? "bg-purple-50 text-purple-700 border-purple-100" :
                          lead.status === "Confirmed" ? "bg-teal-50 text-teal-700 border-teal-100" :
                          lead.status === "Completed" ? "bg-green-50 text-green-700 border-green-100" :
                          "bg-red-50 text-red-700 border-red-100"
                        }`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        <button
                          onClick={() => setSelectedLead(lead)}
                          className="px-3 py-1.5 bg-[#8B5E3C] hover:bg-[#724D30] text-white text-[10px] font-semibold uppercase tracking-wider rounded transition-colors cursor-pointer"
                        >
                          Review Brief
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-4 text-xs">
              <span className="text-[#444444]/60">
                Page {currentPage} of {totalPages} ({filteredLeads.length} leads)
              </span>
              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="p-1.5 border border-[#C9A66B]/25 rounded hover:bg-[#8B5E3C]/5 disabled:opacity-40 transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="p-1.5 border border-[#C9A66B]/25 rounded hover:bg-[#8B5E3C]/5 disabled:opacity-40 transition-all cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Right 4 columns: Recharts Visual */}
        <div className="lg:col-span-4 flex flex-col space-y-4">
          <div className="glass-panel border border-[#C9A66B]/20 rounded-xl p-5 flex flex-col h-full justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#8B5E3C] font-bold block mb-4 border-b border-[#C9A66B]/15 pb-2">
                Revenue Pipeline by Event
              </span>
              
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#C9A66B/10" />
                    <XAxis dataKey="name" stroke="#444444" fontSize={10} tickLine={false} />
                    <YAxis stroke="#444444" fontSize={10} tickLine={false} />
                    <Tooltip cursor={{ fill: "rgba(139, 94, 60, 0.05)" }} formatter={(val) => [`$${Number(val).toLocaleString()}`, "Pipeline"]} />
                    <Bar dataKey="Budget" fill="#8B5E3C" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="p-3 bg-[#8B5E3C]/5 border border-[#8B5E3C]/10 rounded-md text-[10px] text-[#8B5E3C] leading-normal flex items-start gap-1.5 mt-4">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-[#C9A66B]" />
              <span>
                Chart indicates estimated values from active inquiries. Cancelled events are excluded.
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Lead Detail Drawer/Modal */}
      {selectedLead && (
        <LeadDetailsModal
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onStatusChange={() => {
            reloadLeads();
          }}
        />
      )}

    </div>
  );
}
