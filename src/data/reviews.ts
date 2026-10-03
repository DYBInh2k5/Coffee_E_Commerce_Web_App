export interface Review {
  id: number;
  productId: number;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export const reviews: Review[] = [
  // Ethiopian Yirgacheffe
  { id: 1, productId: 1, author: 'Sarah M.', rating: 5, date: '2026-01-15', comment: 'Absolutely stunning coffee. The blueberry notes are incredible and the jasmine aroma fills the room. Best pour-over I\'ve ever had at home.', verified: true },
  { id: 2, productId: 1, author: 'James K.', rating: 5, date: '2026-01-10', comment: 'This is my go-to morning coffee now. So bright and complex. Worth every penny.', verified: true },
  { id: 3, productId: 1, author: 'Linda P.', rating: 4, date: '2025-12-28', comment: 'Beautiful coffee but a bit too floral for my taste. Still excellent quality.', verified: true },
  
  // Colombian Supremo
  { id: 4, productId: 2, author: 'Mike R.', rating: 5, date: '2026-01-12', comment: 'Perfect everyday coffee. Smooth, balanced, and the caramel notes are delightful.', verified: true },
  { id: 5, productId: 2, author: 'Anna T.', rating: 4, date: '2026-01-08', comment: 'Great value for the quality. I use this for my daily espresso and it\'s fantastic.', verified: true },
  
  // Midnight Velvet Blend
  { id: 6, productId: 3, author: 'David L.', rating: 5, date: '2026-01-14', comment: 'The name says it all — midnight velvet. Incredibly smooth dark roast with no bitterness.', verified: true },
  { id: 7, productId: 3, author: 'Rachel W.', rating: 4, date: '2026-01-05', comment: 'Excellent for espresso. Rich chocolate flavor that pairs perfectly with milk.', verified: true },
  
  // Kenyan AA Peaberry
  { id: 8, productId: 4, author: 'Tom H.', rating: 5, date: '2026-01-13', comment: 'Mind-blowing complexity. The blackcurrant and citrus notes are unlike anything I\'ve tasted.', verified: true },
  { id: 9, productId: 4, author: 'Emma S.', rating: 5, date: '2026-01-09', comment: 'Worth the premium price. This peaberry selection is truly special.', verified: true },
  
  // Morning Ritual Blend
  { id: 10, productId: 5, author: 'Chris B.', rating: 5, date: '2026-01-11', comment: 'My morning isn\'t complete without this. Uplifting, clean, and perfectly balanced.', verified: true },
  { id: 11, productId: 5, author: 'Nina F.', rating: 4, date: '2026-01-03', comment: 'Love the peach and vanilla notes. Great for drip coffee.', verified: true },
  
  // Sumatra Mandheling
  { id: 12, productId: 6, author: 'Robert J.', rating: 5, date: '2026-01-16', comment: 'If you love earthy, full-bodied coffee, this is the one. The cedar and cocoa notes are incredible.', verified: true },
  { id: 13, productId: 6, author: 'Maria G.', rating: 4, date: '2026-01-07', comment: 'Very unique flavor profile. Not for everyone but I absolutely love it.', verified: true },
];
