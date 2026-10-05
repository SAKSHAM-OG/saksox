import React, { useState } from 'react';
import {
  Award,
  Gift,
  Sparkles,
  Copy,
  Check,
  ArrowRight,
  TrendingUp,
  Tag,
  Coins,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Unlock,
  ChevronRight,
  ShoppingBag,
  Info,
  Layers,
  Crown
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { LoyaltyReward } from '../../types';

export interface LoyaltyTierInfo {
  id: 'bronze' | 'silver' | 'gold' | 'platinum';
  name: string;
  minPoints: number;
  maxPoints: number;
  badgeColor: string;
  borderColor: string;
  textColor: string;
  accentBg: string;
  multiplier: string;
  benefits: string[];
}

export const LOYALTY_TIERS: LoyaltyTierInfo[] = [
  {
    id: 'bronze',
    name: 'Bronze Atelier',
    minPoints: 0,
    maxPoints: 499,
    badgeColor: 'bg-amber-900/20 text-amber-500 border-amber-800/40',
    borderColor: 'border-amber-900/30',
    textColor: 'text-amber-500',
    accentBg: 'bg-amber-950/20',
    multiplier: '1.0x',
    benefits: [
      'Earn 10 points for every ₹100 spent',
      'Seasonal newsletter & drop alerts',
      'Standard express dispatch'
    ]
  },
  {
    id: 'silver',
    name: 'Silver Atelier',
    minPoints: 500,
    maxPoints: 999,
    badgeColor: 'bg-slate-300/20 text-slate-200 border-slate-400/40',
    borderColor: 'border-slate-400/30',
    textColor: 'text-slate-200',
    accentBg: 'bg-slate-900/40',
    multiplier: '1.25x',
    benefits: [
      '1.25x Points on all winter outerwear',
      'Complimentary express air shipping',
      '48-hour early access to seasonal sales',
      'Annual ₹250 birthday gift code'
    ]
  },
  {
    id: 'gold',
    name: 'Gold Atelier',
    minPoints: 1000,
    maxPoints: 2499,
    badgeColor: 'bg-[#dfbe7d]/20 text-[#dfbe7d] border-[#dfbe7d]/50',
    borderColor: 'border-[#dfbe7d]/40',
    textColor: 'text-[#dfbe7d]',
    accentBg: 'bg-[#dfbe7d]/10',
    multiplier: '1.5x',
    benefits: [
      '1.5x Points on all purchases',
      'Complimentary fragrance sample with every order',
      'Priority customer concierge hotline',
      'Free size exchange doorstep pickup',
      'Private salon preview invitations'
    ]
  },
  {
    id: 'platinum',
    name: 'Platinum Haute',
    minPoints: 2500,
    maxPoints: 99999,
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50',
    borderColor: 'border-cyan-400/40',
    textColor: 'text-cyan-300',
    accentBg: 'bg-cyan-950/20',
    multiplier: '2.0x',
    benefits: [
      '2.0x Points on every drop',
      'Bespoke perfume bottle engraving & personalization',
      'Dedicated personal wardrobe stylist',
      'Private bespoke fitting consultations',
      'Annual luxury surprise gift box'
    ]
  }
];

export interface UpcomingRewardMilestone {
  id: string;
  title: string;
  category: string;
  pointsCost: number;
  description: string;
  rewardValue: string;
  unlockRequirement: string;
  badge: string;
  associatedReward?: LoyaltyReward;
}

const REDEEMABLE_REWARDS: LoyaltyReward[] = [
  {
    id: 'rew-250',
    title: '₹250 Flat Discount Voucher',
    description: 'Instant ₹250 rebate applicable on any winter drop or fragrance order.',
    pointsCost: 250,
    code: 'SX-PTS250',
    discountType: 'flat',
    discountValue: 250,
    minOrderValue: 1499,
    badge: 'Popular'
  },
  {
    id: 'rew-500',
    title: '₹500 Flat Luxury Voucher',
    description: 'Flat ₹500 off on premium puffers, heavy knitwear, or signature perfumes.',
    pointsCost: 500,
    code: 'SX-PTS500',
    discountType: 'flat',
    discountValue: 500,
    minOrderValue: 2499,
    badge: 'Silver Tier'
  },
  {
    id: 'rew-vip20',
    title: '20% Off Entire Atelier Order',
    description: 'Privilege 20% discount on entire cart for high-fashion winter edits.',
    pointsCost: 800,
    code: 'SX-VIP20',
    discountType: 'percent',
    discountValue: 20,
    minOrderValue: 2999,
    badge: 'Best Value'
  },
  {
    id: 'rew-1000',
    title: '₹1,000 Haute Winter Voucher',
    description: 'Substantial ₹1,000 deduction on luxury winter outerwear and extrait sets.',
    pointsCost: 1000,
    code: 'SX-PTS1000',
    discountType: 'flat',
    discountValue: 1000,
    minOrderValue: 4499,
    badge: 'Gold Privilege'
  },
  {
    id: 'rew-free-scent',
    title: '15ml Signature Flacon Gift',
    description: 'Complimentary 15ml pocket flacon of Midnight Noir or Velvet Cashmere with order.',
    pointsCost: 1200,
    code: 'SX-FREESCENT',
    discountType: 'flat',
    discountValue: 899,
    minOrderValue: 1999,
    badge: 'Fragrance Special'
  },
  {
    id: 'rew-cashmere',
    title: '₹1,800 Cashmere Collection Voucher',
    description: 'Exclusive voucher dedicated to 100% Mongolian Cashmere overshirts and scarves.',
    pointsCost: 1800,
    code: 'SX-CASHMERE18',
    discountType: 'flat',
    discountValue: 1800,
    minOrderValue: 5999,
    badge: 'Gold Elite'
  },
  {
    id: 'rew-platinum-box',
    title: 'Platinum Mystery Gift Box + ₹2,500 Off',
    description: 'Complimentary luxury curation box containing artisan accessories & ₹2,500 store credit.',
    pointsCost: 2500,
    code: 'SX-PLATINUM25',
    discountType: 'flat',
    discountValue: 2500,
    minOrderValue: 7999,
    badge: 'Platinum Exclusive'
  }
];

export const LoyaltyRewardsSection: React.FC = () => {
  const { user, orders, redeemLoyaltyReward, applyCoupon, setIsCartDrawerOpen } = useShop();

  const [filterType, setFilterType] = useState<'all' | 'earned' | 'redeemed'>('all');
  const [recentlyRedeemedCode, setRecentlyRedeemedCode] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [showTierModal, setShowTierModal] = useState(false);

  if (!user) return null;

  const pointsBalance = user.loyaltyPoints ?? 1450;

  // Determine current tier from points
  let currentTierObj = LOYALTY_TIERS[0];
  if (pointsBalance >= 2500) {
    currentTierObj = LOYALTY_TIERS[3]; // Platinum
  } else if (pointsBalance >= 1000) {
    currentTierObj = LOYALTY_TIERS[2]; // Gold
  } else if (pointsBalance >= 500) {
    currentTierObj = LOYALTY_TIERS[1]; // Silver
  } else {
    currentTierObj = LOYALTY_TIERS[0]; // Bronze
  }

  // Next tier calculation
  const currentTierIndex = LOYALTY_TIERS.findIndex((t) => t.id === currentTierObj.id);
  const nextTierObj = LOYALTY_TIERS[currentTierIndex + 1] || null;

  const pointsToNextTier = nextTierObj ? Math.max(0, nextTierObj.minPoints - pointsBalance) : 0;
  const progressPercent = nextTierObj
    ? Math.min(
        100,
        Math.max(
          0,
          Math.round(
            ((pointsBalance - currentTierObj.minPoints) /
              (nextTierObj.minPoints - currentTierObj.minPoints)) *
              100
          )
        )
      )
    : 100;

  // Purchase History Stats
  const totalSpend = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const totalOrdersCount = orders.length;
  const avgOrderSpend = totalOrdersCount > 0 ? Math.round(totalSpend / totalOrdersCount) : 4500;
  // Estimated points earned per average purchase: (avgSpend / 100) * multiplier
  const multNumber = parseFloat(currentTierObj.multiplier);
  const estimatedPointsPerOrder = Math.round((avgOrderSpend / 100) * 10 * multNumber);

  // History filtering
  const history = user.loyaltyHistory ?? [];
  const filteredHistory = history.filter((item) => {
    if (filterType === 'all') return true;
    return item.type === filterType;
  });

  const handleRedeem = (reward: LoyaltyReward) => {
    const res = redeemLoyaltyReward(reward);
    if (res.success && res.couponCode) {
      setRecentlyRedeemedCode(res.couponCode);
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleApplyToCart = (code: string) => {
    applyCoupon(code);
    setIsCartDrawerOpen(true);
  };

  return (
    <div className="space-y-10">
      {/* ========================================================================= */}
      {/* 1. CURRENT POINTS BALANCE & VIP TIER HERO DASHBOARD                       */}
      {/* ========================================================================= */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#151824] via-[#10121a] to-[#0c0d12] border border-[#2b3345] p-6 sm:p-8 shadow-2xl">
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#c9a96e]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left: Points & Tier Information */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <span
                className={`px-3 py-1 font-mono uppercase tracking-widest text-[11px] font-bold border flex items-center gap-1.5 ${currentTierObj.badgeColor}`}
              >
                <Crown className="h-3.5 w-3.5" />
                <span>{currentTierObj.name}</span>
              </span>
              <span className="text-[11px] font-mono text-[#88909e]">
                • SAKSOX Atelier Privilege Member
              </span>
            </div>

            <div>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl sm:text-5xl font-mono font-bold text-white tracking-tight">
                  {pointsBalance.toLocaleString('en-IN')}
                </span>
                <span className="text-sm sm:text-base font-serif text-[#dfbe7d] uppercase tracking-wider font-semibold">
                  Points Available
                </span>
              </div>
              <p className="text-xs text-[#88909e] mt-1.5 flex flex-wrap items-center gap-2">
                <span>Direct Voucher Credit Value:</span>
                <strong className="text-white font-mono font-semibold">
                  ₹{pointsBalance.toLocaleString('en-IN')} INR
                </strong>
                <span className="text-[#555e70]">•</span>
                <span className="text-[#dfbe7d] font-mono">
                  {currentTierObj.multiplier} Earn Multiplier
                </span>
              </p>
            </div>
          </div>

          {/* Right: Next Tier Milestone Progress */}
          <div className="w-full lg:w-96 bg-[#12141c] border border-[#232938] p-4 text-xs space-y-3">
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-[#88909e] font-mono uppercase flex items-center gap-1">
                <span>Tier Standing</span>
                <span className="text-white font-bold">({currentTierObj.name})</span>
              </span>
              {nextTierObj ? (
                <span className="text-[#dfbe7d] font-mono font-semibold">
                  Next: {nextTierObj.name}
                </span>
              ) : (
                <span className="text-cyan-400 font-mono font-semibold">Highest Tier Achieved</span>
              )}
            </div>

            {/* Progress track */}
            <div className="h-2.5 w-full bg-[#1b1f2b] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#c9a96e] to-[#dfbe7d] transition-all duration-700 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {nextTierObj ? (
              <div className="space-y-1">
                <p className="text-[11px] text-[#88909e]">
                  Need <strong className="text-white font-mono">{pointsToNextTier} more points</strong> to reach{' '}
                  <strong className={nextTierObj.textColor}>{nextTierObj.name}</strong>.
                </p>
                <p className="text-[10px] text-[#677083]">
                  Based on your spend history (~₹{avgOrderSpend.toLocaleString('en-IN')}/order), you will unlock {nextTierObj.name} in approx.{' '}
                  <strong className="text-white">
                    {Math.max(1, Math.ceil(pointsToNextTier / (estimatedPointsPerOrder || 450)))} more order(s)
                  </strong>.
                </p>
              </div>
            ) : (
              <p className="text-[10px] text-cyan-300">
                You enjoy our highest status with 2.0x points and bespoke studio privileges.
              </p>
            )}

            <button
              type="button"
              onClick={() => setShowTierModal(!showTierModal)}
              className="text-[11px] font-mono text-[#dfbe7d] hover:text-white underline transition-colors pt-1 cursor-pointer block"
            >
              {showTierModal ? 'Hide Tier Comparison ▲' : 'View All Tier Levels & Benefits (Bronze, Silver, Gold, Platinum) ▼'}
            </button>
          </div>
        </div>

        {/* Purchase History Spend Quick Metrics */}
        <div className="mt-8 pt-6 border-t border-[#202534] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="flex items-center gap-2.5">
            <Coins className="h-4 w-4 text-[#dfbe7d] flex-shrink-0" />
            <div>
              <p className="font-semibold text-white text-[11px]">
                {currentTierObj.multiplier} Earn Rate
              </p>
              <p className="text-[10px] text-[#88909e]">
                {Math.round(10 * multNumber)} pts / ₹100 spent
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="h-4 w-4 text-[#dfbe7d] flex-shrink-0" />
            <div>
              <p className="font-semibold text-white text-[11px]">
                ₹{totalSpend.toLocaleString('en-IN')} Total Spend
              </p>
              <p className="text-[10px] text-[#88909e]">Across {totalOrdersCount} verified order(s)</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Sparkles className="h-4 w-4 text-[#dfbe7d] flex-shrink-0" />
            <div>
              <p className="font-semibold text-white text-[11px]">~{estimatedPointsPerOrder} Pts / Order</p>
              <p className="text-[10px] text-[#88909e]">Based on purchase history</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="h-4 w-4 text-[#22c55e] flex-shrink-0" />
            <div>
              <p className="font-semibold text-white text-[11px]">Lifetime Validity</p>
              <p className="text-[10px] text-[#88909e]">Atelier points never expire</p>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. LOYALTY TIERS COMPARISON (BRONZE, SILVER, GOLD, PLATINUM)               */}
      {/* ========================================================================= */}
      {showTierModal && (
        <div className="bg-[#0f1118] border border-[#2b3345] p-5 sm:p-6 space-y-5 animate-in fade-in duration-300">
          <div className="flex items-center justify-between pb-3 border-b border-[#212632]">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-[#dfbe7d]" />
              <h3 className="font-serif text-base sm:text-lg font-bold text-white uppercase tracking-wider">
                SAKSOX Membership Tiers & Privileges
              </h3>
            </div>
            <button
              onClick={() => setShowTierModal(false)}
              className="text-xs font-mono text-[#88909e] hover:text-white"
            >
              ✕ Close
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {LOYALTY_TIERS.map((tier) => {
              const isCurrent = tier.id === currentTierObj.id;
              return (
                <div
                  key={tier.id}
                  className={`p-4 border transition-all flex flex-col justify-between text-xs ${
                    isCurrent
                      ? 'bg-[#151924] border-[#dfbe7d] ring-1 ring-[#dfbe7d]'
                      : 'bg-[#111319] border-[#222736]'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-0.5 font-mono text-[10px] font-bold border ${tier.badgeColor}`}>
                        {tier.name}
                      </span>
                      {isCurrent && (
                        <span className="text-[10px] font-mono text-[#dfbe7d] uppercase font-bold">
                          Your Tier
                        </span>
                      )}
                    </div>

                    <div className="pt-1">
                      <span className="font-mono text-xs text-[#88909e]">
                        {tier.minPoints.toLocaleString('en-IN')} – {tier.maxPoints > 50000 ? 'Unlimited' : `${tier.maxPoints.toLocaleString('en-IN')} PTS`}
                      </span>
                      <p className="font-mono text-sm font-bold text-white mt-0.5">
                        {tier.multiplier} Points Multiplier
                      </p>
                    </div>

                    <ul className="space-y-1.5 pt-2 border-t border-[#1d222f] text-[11px] text-[#88909e]">
                      {tier.benefits.map((b, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <Check className="h-3 w-3 text-[#dfbe7d] flex-shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. UPCOMING REWARDS YOU CAN UNLOCK BASED ON PURCHASE HISTORY               */}
      {/* ========================================================================= */}
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#212632] gap-2">
          <div>
            <div className="flex items-center gap-2">
              <Gift className="h-4 w-4 text-[#dfbe7d]" />
              <h3 className="font-serif text-lg font-bold text-white uppercase tracking-wider">
                Upcoming Rewards & Milestone Unlocks
              </h3>
            </div>
            <p className="text-xs text-[#88909e] mt-0.5">
              Personalized reward roadmap mapped to your current {pointsBalance} pts and winter purchase frequency.
            </p>
          </div>

          <div className="text-[11px] font-mono text-[#88909e]">
            Based on <strong className="text-white">{totalOrdersCount} past order(s)</strong> • Avg order: ₹{avgOrderSpend.toLocaleString('en-IN')}
          </div>
        </div>

        {/* Milestone Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {REDEEMABLE_REWARDS.map((reward) => {
            const isUnlocked = pointsBalance >= reward.pointsCost;
            const pointsNeeded = Math.max(0, reward.pointsCost - pointsBalance);
            const rewardProgress = Math.min(100, Math.round((pointsBalance / reward.pointsCost) * 100));
            // Spend needed = (pointsNeeded / 10) * 100 / multiplier
            const estimatedSpendNeeded = Math.round((pointsNeeded / 10) * (100 / multNumber));

            return (
              <div
                key={reward.id}
                className={`p-5 border transition-all flex flex-col justify-between ${
                  isUnlocked
                    ? 'bg-[#11141c] border-[#293245] hover:border-[#dfbe7d]'
                    : 'bg-[#0e0f14] border-[#1d212c]'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider border font-semibold ${
                        isUnlocked
                          ? 'bg-emerald-950/50 text-emerald-400 border-emerald-500/30'
                          : 'bg-[#181a24] text-[#88909e] border-[#292f3f]'
                      }`}
                    >
                      {isUnlocked ? (
                        <span className="flex items-center gap-1">
                          <Unlock className="h-2.5 w-2.5" />
                          <span>Unlocked & Ready</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Lock className="h-2.5 w-2.5" />
                          <span>Locked ({pointsNeeded} pts to go)</span>
                        </span>
                      )}
                    </span>

                    <span className="font-mono text-sm font-bold text-[#dfbe7d]">
                      {reward.pointsCost} PTS
                    </span>
                  </div>

                  <div>
                    <h4 className="font-serif font-bold text-white text-base leading-tight">
                      {reward.title}
                    </h4>
                    <p className="text-xs text-[#88909e] leading-relaxed mt-1">
                      {reward.description}
                    </p>
                  </div>

                  {/* Progress Indicator */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className="text-[#88909e]">Progress to Unlock</span>
                      <span className="text-white font-semibold">
                        {pointsBalance} / {reward.pointsCost} PTS ({rewardProgress}%)
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-[#191b24] rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          isUnlocked
                            ? 'bg-emerald-400'
                            : 'bg-gradient-to-r from-[#a1824a] to-[#dfbe7d]'
                        }`}
                        style={{ width: `${rewardProgress}%` }}
                      />
                    </div>
                  </div>

                  {/* Purchase History Insight */}
                  {!isUnlocked ? (
                    <div className="p-2.5 bg-[#12141c] border border-[#212634] text-[11px] text-[#88909e] space-y-0.5">
                      <p className="text-white font-medium">Purchase Forecast:</p>
                      <p className="text-[10px]">
                        Spend ~<strong className="text-[#dfbe7d]">₹{estimatedSpendNeeded.toLocaleString('en-IN')}</strong> in future orders to unlock this reward.
                      </p>
                    </div>
                  ) : (
                    <div className="p-2.5 bg-emerald-950/20 border border-emerald-500/20 text-[11px] text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" />
                      <span>Available for immediate checkout redemption!</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 mt-3 border-t border-[#1d222e]">
                  {isUnlocked ? (
                    <button
                      type="button"
                      onClick={() => handleRedeem(reward)}
                      className="w-full py-2 px-3 bg-[#c9a96e] hover:bg-[#dfbe7d] text-[#0a0b0d] text-xs font-mono font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Tag className="h-3.5 w-3.5" />
                      <span>Redeem for {reward.pointsCost} Pts</span>
                    </button>
                  ) : (
                    <div className="text-center py-1.5 text-[11px] font-mono text-[#5e6678]">
                      Locked • Earn {pointsNeeded} more points
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* REDEEM SUCCESS NOTIFICATION ALERT (IF CODE JUST UNLOCKED)                 */}
      {/* ========================================================================= */}
      {recentlyRedeemedCode && (
        <div className="p-4 sm:p-5 bg-[#17221a] border-2 border-[#22c55e] shadow-xl text-xs space-y-3 animate-in fade-in duration-300">
          <div className="flex items-center gap-2 text-[#22c55e]">
            <CheckCircle2 className="h-5 w-5" />
            <h4 className="font-mono font-bold uppercase text-sm">
              Discount Voucher Unlocked Successfully!
            </h4>
          </div>

          <p className="text-[#c7d9ce]">
            Your points have been redeemed. Use this voucher code at checkout or copy it to apply immediately to your bag.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <div className="px-4 py-2 bg-[#0d140f] border border-[#22c55e]/40 font-mono text-base font-bold text-white tracking-widest flex items-center gap-3">
              <span>{recentlyRedeemedCode}</span>
              <button
                type="button"
                onClick={() => handleCopyCode(recentlyRedeemedCode)}
                className="text-[#dfbe7d] hover:text-white transition-colors"
                title="Copy Code"
              >
                {copiedCode === recentlyRedeemedCode ? (
                  <Check className="h-4 w-4 text-[#22c55e]" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>

            <button
              type="button"
              onClick={() => handleApplyToCart(recentlyRedeemedCode)}
              className="px-4 py-2 bg-[#22c55e] hover:bg-[#16a34a] text-[#0a0b0d] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Tag className="h-3.5 w-3.5" />
              <span>Apply Directly To Bag</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. RECENT EARNING & REDEMPTION HISTORY (TRANSACTION LEDGER)                */}
      {/* ========================================================================= */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#212632] gap-3">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-[#dfbe7d]" />
              <h3 className="font-serif text-lg font-bold text-white uppercase tracking-wider">
                Recent Points Activity & Ledger
              </h3>
            </div>
            <p className="text-xs text-[#88909e] mt-0.5">
              Verified record of loyalty points accumulated from purchases, reviews, and redeemed vouchers.
            </p>
          </div>

          {/* History Filter Tabs */}
          <div className="flex items-center gap-1 bg-[#141620] p-1 border border-[#242a3a]">
            {(['all', 'earned', 'redeemed'] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setFilterType(type)}
                className={`px-3 py-1 text-[11px] font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                  filterType === type
                    ? 'bg-[#dfbe7d] text-[#0a0b0d] font-bold'
                    : 'text-[#88909e] hover:text-white'
                }`}
              >
                {type === 'all' ? 'All (Ledger)' : type === 'earned' ? 'Earned (+)' : 'Redeemed (-)'}
              </button>
            ))}
          </div>
        </div>

        {/* Transactions Table / List */}
        {filteredHistory.length === 0 ? (
          <div className="text-center py-12 bg-[#111319] border border-[#212632] text-xs text-[#88909e]">
            No activity found for this filter.
          </div>
        ) : (
          <div className="bg-[#111319] border border-[#212632] divide-y divide-[#1e2330] overflow-hidden">
            {filteredHistory.map((tx) => {
              const isEarned = tx.type === 'earned';

              return (
                <div
                  key={tx.id}
                  className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs hover:bg-[#141722] transition-colors"
                >
                  <div className="flex items-start sm:items-center gap-3.5">
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isEarned
                          ? 'bg-[#15231a] text-[#22c55e] border border-[#22c55e]/30'
                          : 'bg-[#261d15] text-[#dfbe7d] border border-[#dfbe7d]/30'
                      }`}
                    >
                      {isEarned ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <Tag className="h-4 w-4" />
                      )}
                    </div>

                    <div>
                      <p className="font-semibold text-white text-xs">{tx.description}</p>
                      <div className="flex flex-wrap items-center gap-2 mt-0.5 text-[11px] text-[#88909e]">
                        <span>{tx.date}</span>
                        {tx.orderId && (
                          <>
                            <span>•</span>
                            <span className="font-mono text-[#dfbe7d]">
                              Order #{tx.orderId}
                            </span>
                          </>
                        )}
                        {tx.codeGenerated && (
                          <>
                            <span>•</span>
                            <span className="font-mono text-[#22c55e] bg-[#22c55e]/10 px-1 py-0.2">
                              Code: {tx.codeGenerated}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="self-end sm:self-auto flex items-center gap-3">
                    <span
                      className={`font-mono text-sm font-bold ${
                        isEarned ? 'text-[#22c55e]' : 'text-[#dfbe7d]'
                      }`}
                    >
                      {isEarned ? `+${tx.points}` : `-${tx.points}`} PTS
                    </span>

                    <span
                      className={`text-[9px] font-mono uppercase px-2 py-0.5 border ${
                        isEarned
                          ? 'bg-[#15231a] border-[#22c55e]/30 text-[#22c55e]'
                          : 'bg-[#221c16] border-[#dfbe7d]/30 text-[#dfbe7d]'
                      }`}
                    >
                      {isEarned ? 'Credited' : 'Redeemed'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
