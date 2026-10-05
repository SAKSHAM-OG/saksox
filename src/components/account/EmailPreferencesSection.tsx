import React, { useState } from 'react';
import {
  Mail,
  Sparkles,
  Flame,
  Tag,
  Check,
  Bell,
  BellOff,
  Package,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { EmailPreferences } from '../../types';

export const EmailPreferencesSection: React.FC = () => {
  const { user, updateEmailPreferences } = useShop();
  const [justSaved, setJustSaved] = useState(false);

  if (!user) return null;

  const prefs: EmailPreferences = user.emailPreferences ?? {
    newSeasonDrops: true,
    fragranceReleases: true,
    exclusiveSales: true,
    weeklyDigest: false,
    orderUpdates: true,
    frequency: 'instant'
  };

  const handleToggle = (key: keyof Omit<EmailPreferences, 'frequency'>) => {
    const updated = { [key]: !prefs[key] };
    updateEmailPreferences(updated);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  };

  const handleFrequencyChange = (frequency: 'instant' | 'weekly') => {
    updateEmailPreferences({ frequency });
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  };

  const handleUnsubscribeAll = () => {
    updateEmailPreferences({
      newSeasonDrops: false,
      fragranceReleases: false,
      exclusiveSales: false,
      weeklyDigest: false
    });
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  };

  const handleSubscribeAll = () => {
    updateEmailPreferences({
      newSeasonDrops: true,
      fragranceReleases: true,
      exclusiveSales: true,
      weeklyDigest: true
    });
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  };

  const allMarketingUnsubscribed =
    !prefs.newSeasonDrops && !prefs.fragranceReleases && !prefs.exclusiveSales && !prefs.weeklyDigest;

  const categories = [
    {
      key: 'newSeasonDrops' as const,
      title: 'New Season Drops',
      icon: Sparkles,
      badge: 'Outerwear & Knitwear',
      badgeColor: 'bg-[#dfbe7d]/10 text-[#dfbe7d] border-[#dfbe7d]/30',
      description:
        'First access to high-insulation puffers, oversized cashmere hoodies, tailored winter trousers, and limited-edition runway collections before public release.'
    },
    {
      key: 'fragranceReleases' as const,
      title: 'Fragrance Releases',
      icon: Flame,
      badge: 'Haute Parfumerie',
      badgeColor: 'bg-amber-950/40 text-amber-400 border-amber-500/30',
      description:
        'Notices for new extrait de parfum formulations, 15ml discovery flacons, nocturnal winter scents (e.g. Midnight Noir), and rare batch pressings.'
    },
    {
      key: 'exclusiveSales' as const,
      title: 'Exclusive Sales',
      icon: Tag,
      badge: 'VIP Privilege',
      badgeColor: 'bg-emerald-950/40 text-emerald-400 border-emerald-500/30',
      description:
        'Private member-only discount codes, end-of-season archive sales, flash multiplier points days, and seasonal loyalty reward vouchers.'
    },
    {
      key: 'weeklyDigest' as const,
      title: 'Weekly Atelier Digest',
      icon: Calendar,
      badge: 'Curated Lookbook',
      badgeColor: 'bg-blue-950/40 text-blue-400 border-blue-500/30',
      description:
        'A consolidated weekly dispatch every Thursday evening featuring cold-weather styling guides, cashmere care tips, and editorial winter moodboards.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Section Header Card */}
      <div className="bg-[#111319] border border-[#212632] p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-[#dfbe7d]" />
              <h2 className="text-base sm:text-lg font-serif font-bold text-white tracking-wide">
                Email & Dispatch Preferences
              </h2>
            </div>
            <p className="text-xs text-[#88909e] mt-1">
              Control the communications you receive at{' '}
              <strong className="text-white font-mono">{user.email}</strong>.
            </p>
          </div>

          {/* Quick Bulk Actions */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            {allMarketingUnsubscribed ? (
              <button
                type="button"
                onClick={handleSubscribeAll}
                className="px-3.5 py-1.5 bg-[#1b1f2b] hover:bg-[#252b3c] border border-[#dfbe7d]/40 text-[#dfbe7d] hover:text-white text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Bell className="h-3.5 w-3.5 text-[#dfbe7d]" />
                <span>Subscribe to All</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleUnsubscribeAll}
                className="px-3.5 py-1.5 bg-[#161822] hover:bg-[#202433] border border-[#282f40] hover:border-red-500/50 text-[#88909e] hover:text-red-400 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <BellOff className="h-3.5 w-3.5" />
                <span>Unsubscribe All</span>
              </button>
            )}
          </div>
        </div>

        {/* Real-time Save Confirmation Banner */}
        {justSaved && (
          <div className="p-3 bg-emerald-950/30 border border-emerald-500/40 text-emerald-400 text-xs flex items-center gap-2 animate-in fade-in duration-200">
            <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
            <span>Preferences saved and synchronized to your SAKSOX member profile.</span>
          </div>
        )}
      </div>

      {/* Content Categories Subscription Cards */}
      <div className="space-y-3">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#dfbe7d] px-1">
          Content Subscriptions
        </h3>

        <div className="grid grid-cols-1 gap-3">
          {categories.map((cat) => {
            const isSubscribed = prefs[cat.key];
            const Icon = cat.icon;

            return (
              <div
                key={cat.key}
                onClick={() => handleToggle(cat.key)}
                className={`p-4 sm:p-5 bg-[#111319] border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isSubscribed
                    ? 'border-[#2a3245] hover:border-[#dfbe7d]/70'
                    : 'border-[#1b1f2b] opacity-75 hover:opacity-100'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`h-10 w-10 rounded-sm flex items-center justify-center flex-shrink-0 border ${
                      isSubscribed
                        ? 'bg-[#181c28] border-[#dfbe7d]/40 text-[#dfbe7d]'
                        : 'bg-[#14161f] border-[#252b38] text-[#555d6e]'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-sm font-semibold text-white tracking-wide">
                        {cat.title}
                      </h4>
                      <span
                        className={`px-2 py-0.2 text-[10px] font-mono uppercase tracking-wider border font-medium ${cat.badgeColor}`}
                      >
                        {cat.badge}
                      </span>
                    </div>
                    <p className="text-xs text-[#88909e] leading-relaxed max-w-2xl">
                      {cat.description}
                    </p>
                  </div>
                </div>

                {/* Custom Accessible Toggle Switch */}
                <div className="flex items-center gap-3 self-end sm:self-center flex-shrink-0">
                  <span
                    className={`text-[11px] font-mono font-semibold ${
                      isSubscribed ? 'text-[#dfbe7d]' : 'text-[#5d6575]'
                    }`}
                  >
                    {isSubscribed ? 'Subscribed' : 'Muted'}
                  </span>

                  <button
                    type="button"
                    role="switch"
                    aria-checked={isSubscribed}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggle(cat.key);
                    }}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-1 focus:ring-[#dfbe7d] ${
                      isSubscribed ? 'bg-[#dfbe7d]' : 'bg-[#222736]'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-[#0a0b0d] transition-transform ${
                        isSubscribed ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Transactional Order Emails (Always Active) */}
      <div className="p-4 sm:p-5 bg-[#101217] border border-[#202534] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="h-10 w-10 rounded-sm bg-[#15231a] border border-[#22c55e]/30 text-[#22c55e] flex items-center justify-center flex-shrink-0">
            <Package className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-semibold text-white">
                Order & Shipping Dispatch Confirmations
              </h4>
              <span className="px-2 py-0.2 text-[10px] font-mono uppercase bg-emerald-950/50 text-emerald-400 border border-emerald-500/30">
                Essential
              </span>
            </div>
            <p className="text-xs text-[#88909e] mt-1 leading-relaxed max-w-xl">
              Airway bills, live GPS tracking updates, contactless delivery OTPs, and tax invoices.
              Required for all active order dispatches.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#22c55e] self-end sm:self-center flex-shrink-0">
          <ShieldCheck className="h-4 w-4" />
          <span>Always Active</span>
        </div>
      </div>

      {/* Delivery Cadence / Frequency Settings */}
      <div className="bg-[#111319] border border-[#212632] p-5 sm:p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-[#dfbe7d]" />
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
            Delivery Frequency
          </h3>
        </div>

        <p className="text-xs text-[#88909e]">
          Choose whether to receive drop announcements in real-time or as a weekly consolidated summary.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div
            onClick={() => handleFrequencyChange('instant')}
            className={`p-4 border transition-all cursor-pointer flex items-start gap-3 ${
              prefs.frequency === 'instant'
                ? 'bg-[#151926] border-[#dfbe7d]'
                : 'bg-[#12141c] border-[#222736] hover:border-[#30384c]'
            }`}
          >
            <div
              className={`h-4 w-4 rounded-full border mt-0.5 flex items-center justify-center flex-shrink-0 ${
                prefs.frequency === 'instant'
                  ? 'border-[#dfbe7d] bg-[#dfbe7d]'
                  : 'border-[#555e70]'
              }`}
            >
              {prefs.frequency === 'instant' && <div className="h-1.5 w-1.5 rounded-full bg-[#0a0b0d]" />}
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Instant Notifications</p>
              <p className="text-[11px] text-[#88909e] mt-0.5 leading-relaxed">
                Receive drop emails immediately when new winter inventory or fragrance batches go live.
              </p>
            </div>
          </div>

          <div
            onClick={() => handleFrequencyChange('weekly')}
            className={`p-4 border transition-all cursor-pointer flex items-start gap-3 ${
              prefs.frequency === 'weekly'
                ? 'bg-[#151926] border-[#dfbe7d]'
                : 'bg-[#12141c] border-[#222736] hover:border-[#30384c]'
            }`}
          >
            <div
              className={`h-4 w-4 rounded-full border mt-0.5 flex items-center justify-center flex-shrink-0 ${
                prefs.frequency === 'weekly'
                  ? 'border-[#dfbe7d] bg-[#dfbe7d]'
                  : 'border-[#555e70]'
              }`}
            >
              {prefs.frequency === 'weekly' && <div className="h-1.5 w-1.5 rounded-full bg-[#0a0b0d]" />}
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Weekly Consolidated Digest</p>
              <p className="text-[11px] text-[#88909e] mt-0.5 leading-relaxed">
                Receive a single email every Thursday summarizing all upcoming drops and promotions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
