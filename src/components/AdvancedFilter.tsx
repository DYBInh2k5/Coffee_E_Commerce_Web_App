import React from 'react';

interface AdvancedFilterProps {
  filters: {
    roast: string[];
    origin: string[];
    priceRange: [number, number];
    flavorNotes: string[];
  };
  onFilterChange: (filters: any) => void;
  onClose: () => void;
}

const AdvancedFilter: React.FC<AdvancedFilterProps> = ({ filters, onFilterChange, onClose }) => {
  const roastLevels = ['Light', 'Medium-Light', 'Medium', 'Dark'];
  const origins = ['Ethiopia', 'Colombia', 'Kenya', 'Indonesia', 'Brazil', 'Guatemala', 'Costa Rica'];
  const flavorNotes = [
    'Blueberry', 'Jasmine', 'Bergamot', 'Honey', 'Caramel', 'Red Apple',
    'Milk Chocolate', 'Walnut', 'Dark Chocolate', 'Smoky', 'Brown Sugar',
    'Roasted Almond', 'Blackcurrant', 'Grapefruit', 'Peach', 'Vanilla',
    'Citrus Zest', 'Cedar', 'Tobacco', 'Earthy', 'Dark Cocoa'
  ];

  const toggleFilter = (category: string, value: string) => {
    const current = filters[category as keyof typeof filters] as string[];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    onFilterChange({ ...filters, [category]: updated });
  };

  const clearFilters = () => {
    onFilterChange({
      roast: [],
      origin: [],
      priceRange: [0, 30],
      flavorNotes: [],
    });
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-stone-900 border border-stone-700/50 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-2xl text-amber-100">Lọc nâng cao</h2>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-amber-300 hover:bg-stone-800 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-6">
            {/* Roast Level */}
            <div>
              <h3 className="text-amber-200 font-medium mb-3">Độ rang</h3>
              <div className="flex flex-wrap gap-2">
                {roastLevels.map(level => (
                  <button
                    key={level}
                    onClick={() => toggleFilter('roast', level)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      filters.roast.includes(level)
                        ? 'bg-amber-700 text-white'
                        : 'bg-stone-800 text-stone-400 hover:bg-stone-700 border border-stone-700/50'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Origin */}
            <div>
              <h3 className="text-amber-200 font-medium mb-3">Nguồn gốc</h3>
              <div className="flex flex-wrap gap-2">
                {origins.map(origin => (
                  <button
                    key={origin}
                    onClick={() => toggleFilter('origin', origin)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      filters.origin.includes(origin)
                        ? 'bg-amber-700 text-white'
                        : 'bg-stone-800 text-stone-400 hover:bg-stone-700 border border-stone-700/50'
                    }`}
                  >
                    {origin}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="text-amber-200 font-medium mb-3">Khoảng giá</h3>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="30"
                  step="1"
                  value={filters.priceRange[1]}
                  onChange={(e) => onFilterChange({
                    ...filters,
                    priceRange: [filters.priceRange[0], Number(e.target.value)]
                  })}
                  className="flex-1 accent-amber-600"
                />
                <span className="text-amber-400 font-medium min-w-[60px] text-right">
                  ${filters.priceRange[1]}
                </span>
              </div>
            </div>

            {/* Flavor Notes */}
            <div>
              <h3 className="text-amber-200 font-medium mb-3">Hương vị</h3>
              <div className="flex flex-wrap gap-2">
                {flavorNotes.map(note => (
                  <button
                    key={note}
                    onClick={() => toggleFilter('flavorNotes', note)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      filters.flavorNotes.includes(note)
                        ? 'bg-amber-700 text-white'
                        : 'bg-stone-800 text-stone-400 hover:bg-stone-700 border border-stone-700/50'
                    }`}
                  >
                    {note}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6 pt-6 border-t border-stone-700/50">
            <button
              onClick={clearFilters}
              className="flex-1 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-300 font-medium rounded-xl border border-stone-700 transition-colors"
            >
              Xóa bộ lọc
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-2.5 bg-amber-700 hover:bg-amber-600 text-white font-medium rounded-xl transition-colors"
            >
              Áp dụng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFilter;
