import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight, ArrowLeft, RefreshCw, ShoppingBag, Eye } from 'lucide-react';
import { SCENT_QUIZ_QUESTIONS } from '../../data/quiz';
import { PRODUCTS } from '../../data/products';
import { Product, FragranceFamily } from '../../types';
import { useShop } from '../../context/ShopContext';

interface ScentQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToDetail: (slug: string) => void;
  onNavigateHome?: () => void;
}

export const ScentQuizModal: React.FC<ScentQuizModalProps> = ({
  isOpen,
  onClose,
  onNavigateToDetail,
  onNavigateHome
}) => {
  const { addToCart, setQuickViewProduct } = useShop();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [isCalculated, setIsCalculated] = useState(false);
  const [recommendedFragrances, setRecommendedFragrances] = useState<{ product: Product; matchScore: number }[]>([]);

  if (!isOpen) return null;

  const currentQuestion = SCENT_QUIZ_QUESTIONS[currentStepIndex];

  const handleRestart = () => {
    setCurrentStepIndex(0);
    setSelectedAnswers([]);
    setIsCalculated(false);
  };

  const handleClose = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    handleRestart();
    onClose();
    if (onNavigateHome) {
      onNavigateHome();
    } else {
      window.location.hash = '#/';
    }
  };

  const handleSelectOption = (optionIndex: number) => {
    const updated = [...selectedAnswers];
    updated[currentStepIndex] = optionIndex;
    setSelectedAnswers(updated);

    if (currentStepIndex < SCENT_QUIZ_QUESTIONS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      // Final step: Calculate results
      calculateRecommendations(updated);
    }
  };

  const calculateRecommendations = (answers: number[]) => {
    // Accumulate weights
    const scores: Record<FragranceFamily, number> = {
      woody: 0,
      fresh: 0,
      musky: 0,
      spicy: 0,
      sweet: 0,
      aquatic: 0
    };

    answers.forEach((ansIndex, qIndex) => {
      const question = SCENT_QUIZ_QUESTIONS[qIndex];
      if (question && question.options[ansIndex]) {
        const weights = question.options[ansIndex].familyWeight;
        Object.entries(weights).forEach(([fam, val]) => {
          if (val) {
            scores[fam as FragranceFamily] = (scores[fam as FragranceFamily] || 0) + val;
          }
        });
      }
    });

    // Score all fragrances
    const fragrances = PRODUCTS.filter((p) => p.category === 'fragrances');
    const scoredList = fragrances.map((f) => {
      let score = 75; // baseline match
      if (f.fragranceFamily && scores[f.fragranceFamily]) {
        score += scores[f.fragranceFamily] * 3.5;
      }
      if (f.isBestSeller) score += 3;
      // Cap at 99%
      const finalScore = Math.min(99, Math.round(score));
      return { product: f, matchScore: finalScore };
    });

    scoredList.sort((a, b) => b.matchScore - a.matchScore);
    setRecommendedFragrances(scoredList.slice(0, 3));
    setIsCalculated(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/90 backdrop-blur-md transition-opacity"
        onClick={handleClose}
      />

      <div className="relative z-10 w-full max-w-2xl bg-[#0f1116] border border-[#272d3a] shadow-2xl p-6 sm:p-8 text-[#f5f3ef] my-8">
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 z-30 text-[#88909e] hover:text-white p-2 cursor-pointer transition-colors focus:outline-none"
          aria-label="Close"
        >
          <X className="h-5 w-5 pointer-events-none" />
        </button>

        {!isCalculated ? (
          <div>
            {/* Step Header */}
            <div className="flex items-center justify-between text-xs text-[#88909e] mb-4 pb-2 border-b border-[#202530] pr-8">
              <span className="text-[#dfbe7d] font-mono uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                Olfactory Diagnostic Atelier
              </span>
              <span className="font-mono">
                Step {currentStepIndex + 1} of {SCENT_QUIZ_QUESTIONS.length}
              </span>
            </div>

            {/* Question */}
            <div className="mb-6">
              <span className="text-[11px] font-mono text-[#c9a96e] uppercase tracking-wider block mb-1">
                {currentQuestion.tagline}
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-medium text-white tracking-wide">
                {currentQuestion.question}
              </h2>
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 gap-3 mb-8">
              {currentQuestion.options.map((opt, idx) => {
                const isSelected = selectedAnswers[currentStepIndex] === idx;
                return (
                  <button
                    key={opt.label}
                    onClick={() => handleSelectOption(idx)}
                    className={`p-4 text-left border transition-all duration-200 flex items-start justify-between group ${
                      isSelected
                        ? 'bg-[#1b1f2b] border-[#dfbe7d] text-white'
                        : 'bg-[#14161f] border-[#252b38] hover:border-[#3e4659] text-[#d6ccbe]'
                    }`}
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-white group-hover:text-[#dfbe7d] transition-colors mb-1">
                        {opt.label}
                      </h4>
                      <p className="text-xs text-[#88909e] leading-relaxed">
                        {opt.description}
                      </p>
                    </div>
                    <div
                      className={`h-5 w-5 flex-shrink-0 ml-3 rounded-full border flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'border-[#dfbe7d] bg-[#dfbe7d] text-[#0a0b0d]'
                          : 'border-white/20 group-hover:border-white/40'
                      }`}
                    >
                      {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Back Button */}
            {currentStepIndex > 0 && (
              <button
                onClick={() => setCurrentStepIndex(currentStepIndex - 1)}
                className="flex items-center gap-1.5 text-xs text-[#88909e] hover:text-white uppercase tracking-wider transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Previous Step</span>
              </button>
            )}
          </div>
        ) : (
          /* Recommended Results */
          <div>
            <div className="text-center mb-6">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#1a1f2c] border border-[#c9a96e]/30 text-[#dfbe7d] text-[10px] font-mono uppercase tracking-widest mb-2">
                <Sparkles className="h-3 w-3" />
                Olfactory Prescription Complete
              </span>
              <h2 className="text-2xl font-serif text-white tracking-wide">
                YOUR SIGNATURE SCENT MATCH
              </h2>
              <p className="text-xs text-[#88909e] max-w-md mx-auto mt-1">
                Formulated based on your sensory preferences, projection threshold, and winter mood profile.
              </p>
            </div>

            {/* Top Match Card */}
            {recommendedFragrances.length > 0 && (
              <div className="mb-6 bg-[#161822] border-2 border-[#c9a96e] p-4 sm:p-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#c9a96e] text-[#0a0b0d] text-[10px] font-bold uppercase px-3 py-1 tracking-widest font-mono">
                  {recommendedFragrances[0].matchScore}% Match
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <img
                    src={recommendedFragrances[0].product.images[0]}
                    alt={recommendedFragrances[0].product.name}
                    className="h-28 w-24 object-cover flex-shrink-0 bg-[#0c0d10]"
                  />
                  <div className="flex-1 text-center sm:text-left">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#dfbe7d]">
                      Top Recommendation • {recommendedFragrances[0].product.fragranceFamily}
                    </span>
                    <h3 className="text-base sm:text-lg font-serif font-bold text-white mt-0.5">
                      {recommendedFragrances[0].product.name}
                    </h3>
                    <p className="text-xs text-[#88909e] mt-1 line-clamp-2">
                      {recommendedFragrances[0].product.description}
                    </p>
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-3">
                      <span className="text-sm font-bold text-white">
                        ₹{recommendedFragrances[0].product.price.toLocaleString('en-IN')}
                      </span>
                      <button
                        onClick={() => {
                          addToCart(recommendedFragrances[0].product, recommendedFragrances[0].product.sizes[0]);
                          onClose();
                        }}
                        className="px-4 py-2 bg-[#c9a96e] hover:bg-[#dfbe7d] text-[#0a0b0d] text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5"
                      >
                        <ShoppingBag className="h-3.5 w-3.5" />
                        Add to Bag
                      </button>
                      <button
                        onClick={() => {
                          onClose();
                          onNavigateToDetail(recommendedFragrances[0].product.slug);
                        }}
                        className="px-3 py-2 bg-[#212634] hover:bg-[#2c3345] text-white text-xs font-semibold uppercase tracking-wider transition-colors"
                      >
                        Explore Notes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Other Matches */}
            <div className="space-y-2 mb-6">
              <span className="text-xs uppercase font-mono tracking-wider text-[#88909e] block">
                Secondary Harmonic Matches:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {recommendedFragrances.slice(1).map(({ product, matchScore }) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-3 p-3 bg-[#13151c] border border-[#232733]"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="h-14 w-12 object-cover flex-shrink-0"
                    />
                    <div className="flex-1 overflow-hidden">
                      <div className="flex justify-between items-center text-[10px] text-[#dfbe7d] font-mono">
                        <span>{product.fragranceFamily}</span>
                        <span>{matchScore}% Match</span>
                      </div>
                      <h4 className="text-xs font-semibold text-white truncate">{product.name}</h4>
                      <p className="text-xs font-medium text-[#d1d5db] mt-0.5">
                        ₹{product.price.toLocaleString('en-IN')}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        onClose();
                        onNavigateToDetail(product.slug);
                      }}
                      className="p-1.5 text-[#88909e] hover:text-white"
                      title="View details"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Retake or Close */}
            <div className="flex justify-between items-center pt-4 border-t border-[#202530]">
              <button
                onClick={handleRestart}
                className="flex items-center gap-1.5 text-xs text-[#88909e] hover:text-white uppercase tracking-wider"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Retake Quiz</span>
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="px-5 py-2 bg-[#1e232e] hover:bg-[#2b3140] text-xs font-semibold uppercase tracking-wider text-white cursor-pointer"
              >
                Close Diagnostic
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
