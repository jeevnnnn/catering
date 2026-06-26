"use client";

import React, { useState } from "react";
import { Lead, updateLeadStatus } from "@/lib/firebase";
import { X, Calendar, Users, DollarSign, MapPin, ClipboardList, Phone, Mail, Clock, ShieldCheck } from "lucide-react";

interface LeadDetailsModalProps {
  lead: Lead;
  onClose: () => void;
  onStatusChange: () => void;
}

export default function LeadDetailsModal({ lead, onClose, onStatusChange }: LeadDetailsModalProps) {
  const [status, setStatus] = useState<Lead["status"]>(lead.status);
  const [updating, setUpdating] = useState(false);

  const handleStatusChange = async (newStatus: Lead["status"]) => {
    setUpdating(true);
    try {
      await updateLeadStatus(lead.id, newStatus);
      setStatus(newStatus);
      onStatusChange();
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setUpdating(false);
    }
  };

  const getStatusColor = (s: Lead["status"]) => {
    switch (s) {
      case "New": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Contacted": return "bg-amber-100 text-amber-800 border-amber-200";
      case "Negotiation": return "bg-purple-100 text-purple-800 border-purple-200";
      case "Confirmed": return "bg-teal-100 text-teal-800 border-teal-200";
      case "Completed": return "bg-green-100 text-green-800 border-green-200";
      case "Cancelled": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#FFFDF9] dark:bg-[#1A1A1A] border border-[#C9A66B]/25 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-fade-in flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#C9A66B]/15 bg-[#8B5E3C]/5">
          <div>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8B5E3C] dark:text-[#C9A66B]">
              Lead Details ID: {lead.id}
            </span>
            <h3 className="text-base font-serif font-bold text-[#1a1a1a] dark:text-white mt-0.5">
              Client Brief: {lead.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-all text-[#444444] dark:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content (Scrollable) */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm flex-1">
          
          {/* Main Info Blocks */}
          <div className="grid grid-cols-2 gap-4">
            
            {/* Contact Details Card */}
            <div className="p-4 rounded-xl border border-[#C9A66B]/15 bg-white/50 dark:bg-white/5 space-y-3">
              <span className="text-[10px] uppercase tracking-widest text-[#8B5E3C] dark:text-[#C9A66B] font-bold block mb-1">
                Client Contact
              </span>
              <div className="flex items-center gap-2.5 text-xs text-[#444444] dark:text-[#F7F1E8]/90">
                <Phone className="w-4 h-4 text-[#8B5E3C] shrink-0" />
                <a href={`tel:${lead.phone}`} className="hover:underline">{lead.phone}</a>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#444444] dark:text-[#F7F1E8]/90">
                <Mail className="w-4 h-4 text-[#8B5E3C] shrink-0" />
                <a href={`mailto:${lead.email}`} className="hover:underline">{lead.email}</a>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#444444] dark:text-[#F7F1E8]/90">
                <Clock className="w-4 h-4 text-[#8B5E3C] shrink-0" />
                <span>Submitted: {new Date(lead.createdAt).toLocaleString()}</span>
              </div>
            </div>

            {/* Event Metrics Card */}
            <div className="p-4 rounded-xl border border-[#C9A66B]/15 bg-white/50 dark:bg-white/5 space-y-3">
              <span className="text-[10px] uppercase tracking-widest text-[#8B5E3C] dark:text-[#C9A66B] font-bold block mb-1">
                Event Setup
              </span>
              <div className="flex items-center gap-2.5 text-xs text-[#444444] dark:text-[#F7F1E8]/90">
                <Calendar className="w-4 h-4 text-[#8B5E3C] shrink-0" />
                <span>Date: {lead.eventDate}</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#444444] dark:text-[#F7F1E8]/90">
                <Users className="w-4 h-4 text-[#8B5E3C] shrink-0" />
                <span>Guests: {lead.guestCount} Headcount</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#444444] dark:text-[#F7F1E8]/90">
                <DollarSign className="w-4 h-4 text-[#8B5E3C] shrink-0" />
                <span>Target: ${lead.budget.toLocaleString()} USD</span>
              </div>
            </div>

          </div>

          {/* Location details */}
          <div className="p-4 rounded-xl border border-[#C9A66B]/15 bg-white/50 dark:bg-white/5 flex gap-3">
            <MapPin className="w-5 h-5 text-[#8B5E3C] shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#8B5E3C] dark:text-[#C9A66B] font-bold block mb-0.5">
                Target Venue / Location
              </span>
              <p className="text-xs text-[#444444] dark:text-white font-semibold">
                {lead.location}
              </p>
            </div>
          </div>

          {/* Special Requirements */}
          <div className="p-4 rounded-xl border border-[#C9A66B]/15 bg-white/50 dark:bg-white/5 flex gap-3">
            <ClipboardList className="w-5 h-5 text-[#8B5E3C] shrink-0 mt-0.5" />
            <div className="w-full">
              <span className="text-[10px] uppercase tracking-widest text-[#8B5E3C] dark:text-[#C9A66B] font-bold block mb-0.5">
                Culinary Requirements & Event Planner Notes
              </span>
              <p className="text-xs text-[#444444] dark:text-[#F7F1E8]/90 leading-relaxed whitespace-pre-wrap mt-1">
                {lead.requirements || "No custom requests detailed."}
              </p>
            </div>
          </div>

          {/* Status Controls */}
          <div className="pt-4 border-t border-[#C9A66B]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#8B5E3C]/5 -mx-6 -mb-6 p-6">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#8B5E3C]" />
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#444444] font-bold block">
                  Lead Processing Status
                </span>
                <span className={`inline-block border text-[11px] font-bold px-2 py-0.5 rounded mt-1 ${getStatusColor(status)}`}>
                  {status}
                </span>
              </div>
            </div>

            <div className="flex flex-col space-y-1">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8B5E3C] dark:text-[#C9A66B]">
                Advance Status Stage
              </span>
              <select
                value={status}
                disabled={updating}
                onChange={(e) => handleStatusChange(e.target.value as Lead["status"])}
                className="bg-[#FFFDF9] dark:bg-[#1A1A1A] border border-[#C9A66B]/30 rounded px-3 py-2 text-xs text-[#444444] dark:text-white focus:outline-none cursor-pointer"
              >
                <option value="New">New Lead</option>
                <option value="Contacted">Contacted</option>
                <option value="Negotiation">Negotiation</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
