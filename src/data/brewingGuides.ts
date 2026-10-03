export interface BrewingGuide {
  id: number;
  title: string;
  method: string;
  icon: string;
  time: string;
  difficulty: string;
  description: string;
  steps: string[];
  tips: string[];
  ratio: string;
  grindSize: string;
  waterTemp: string;
}

export const brewingGuides: BrewingGuide[] = [
  {
    id: 1,
    title: 'Pour Over',
    method: 'V60 / Chemex',
    icon: '🫖',
    time: '3-4 min',
    difficulty: 'Intermediate',
    description: 'A clean, bright cup that highlights the unique characteristics of single origin coffees. Perfect for our Ethiopian Yirgacheffe and Kenyan AA.',
    steps: [
      'Heat water to 200°F (93°C) — just off boil',
      'Place filter in dripper and rinse with hot water',
      'Add 20g of medium-fine ground coffee',
      'Pour 40g of water and bloom for 30 seconds',
      'Slowly pour remaining 280g in concentric circles',
      'Total brew time should be 3-4 minutes',
      'Remove dripper and enjoy'
    ],
    tips: [
      'Use a gooseneck kettle for precision pouring',
      'Grind fresh right before brewing',
      'Adjust grind size if brew is too fast or slow'
    ],
    ratio: '1:15 (coffee to water)',
    grindSize: 'Medium-Fine (like table salt)',
    waterTemp: '200°F / 93°C'
  },
  {
    id: 2,
    title: 'French Press',
    method: 'Immersion',
    icon: '☕',
    time: '4 min',
    difficulty: 'Beginner',
    description: 'A full-bodied, rich cup with natural oils intact. Ideal for our Sumatra Mandheling and Midnight Velvet Blend.',
    steps: [
      'Heat water to 200°F (93°C)',
      'Add 30g of coarsely ground coffee to press',
      'Pour 450g of water over grounds',
      'Stir gently and place lid on (don\'t press yet)',
      'Steep for exactly 4 minutes',
      'Press plunger down slowly and steadily',
      'Pour immediately to avoid over-extraction'
    ],
    tips: [
      'Use a coarse grind to prevent sediment',
      'Don\'t let coffee sit in the press after pressing',
      'Skim the foam on top before pressing for cleaner cup'
    ],
    ratio: '1:15 (coffee to water)',
    grindSize: 'Coarse (like sea salt)',
    waterTemp: '200°F / 93°C'
  },
  {
    id: 3,
    title: 'Espresso',
    method: 'Pressure',
    icon: '⚡',
    time: '25-30 sec',
    difficulty: 'Advanced',
    description: 'A concentrated, intense shot that forms the base of many drinks. Our Midnight Velvet and Colombian Supremo shine here.',
    steps: [
      'Grind 18g of coffee to fine espresso consistency',
      'Distribute grounds evenly in portafilter',
      'Tamp with 30lbs of pressure, keeping level',
      'Lock portafilter and start extraction',
      'Target 25-30 seconds for double shot',
      'Yield should be 36g of liquid espresso',
      'Adjust grind finer if too fast, coarser if too slow'
    ],
    tips: [
      'Dial in your grind daily — humidity affects it',
      'Fresh beans (7-21 days post-roast) work best',
      'Clean your machine and portafilter regularly'
    ],
    ratio: '1:2 (coffee to espresso)',
    grindSize: 'Fine (like powdered sugar)',
    waterTemp: '200°F / 93°C'
  },
  {
    id: 4,
    title: 'AeroPress',
    method: 'Hybrid',
    icon: '🔬',
    time: '2 min',
    difficulty: 'Beginner',
    description: 'Versatile and forgiving, producing a clean cup with low acidity. Great for experimenting with any of our coffees.',
    steps: [
      'Heat water to 185°F (85°C)',
      'Place filter in cap and rinse',
      'Add 15g of medium-fine ground coffee',
      'Pour 200g of water and stir for 10 seconds',
      'Steep for 1 minute',
      'Flip onto mug and press slowly for 30 seconds',
      'Dilute with 50g of hot water if desired'
    ],
    tips: [
      'Try the inverted method for more control',
      'Metal filter gives fuller body than paper',
      'Experiment with brew time for different profiles'
    ],
    ratio: '1:13 (coffee to water)',
    grindSize: 'Medium-Fine',
    waterTemp: '185°F / 85°C'
  },
  {
    id: 5,
    title: 'Cold Brew',
    method: 'Cold Extraction',
    icon: '🧊',
    time: '12-24 hrs',
    difficulty: 'Beginner',
    description: 'Smooth, sweet, and low-acid concentrate perfect for hot days. Our Morning Ritual Blend makes an exceptional cold brew.',
    steps: [
      'Grind 100g of coffee to very coarse',
      'Combine with 700g of room temperature water',
      'Stir to ensure all grounds are saturated',
      'Cover and refrigerate for 12-24 hours',
      'Strain through fine mesh or filter',
      'Dilute concentrate 1:1 with water or milk',
      'Serve over ice and store concentrate up to 2 weeks'
    ],
    tips: [
      'Longer steep = stronger but more bitter',
      'Use a dedicated cold brew maker for easiest cleanup',
      'Make a large batch and keep in fridge'
    ],
    ratio: '1:7 (concentrate), dilute 1:1',
    grindSize: 'Very Coarse (like raw sugar)',
    waterTemp: 'Room temperature'
  },
  {
    id: 6,
    title: 'Moka Pot',
    method: 'Stovetop Pressure',
    icon: '🫕',
    time: '5 min',
    difficulty: 'Intermediate',
    description: 'A strong, rich coffee similar to espresso but with unique character. Perfect for our dark roasts and blends.',
    steps: [
      'Fill bottom chamber with hot water up to valve',
      'Fill filter basket with medium-fine ground coffee (don\'t tamp)',
      'Assemble pot and place on medium heat',
      'Leave lid open to watch extraction',
      'When coffee flows steadily, reduce heat to low',
      'Remove from heat when you hear a hissing/gurgling sound',
      'Run base under cold water to stop extraction'
    ],
    tips: [
      'Start with hot water to reduce metallic taste',
      'Don\'t tamp the grounds — just level them off',
      'Remove from heat early to avoid bitterness'
    ],
    ratio: '1:10 (coffee to water)',
    grindSize: 'Medium-Fine (finer than drip)',
    waterTemp: 'Stovetop heat'
  }
];
