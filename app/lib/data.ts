export interface Video {
  id: string;
  title: string;
  youtubeId: string;
  category: string;
  artist: string;
  year: number;
  description?: string;
  thumbnail?: string;
}

export interface Category {
  id: string;
  name: string;
  nameUrdu: string;
  description: string;
  slug: string;
}

export const categories: Category[] = [
  { id: "nadeem-sarwar", name: "Nadeem Sarwar", nameUrdu: "ندیم سرور", description: "Noha Khan Nadeem Sarwar ke azadari nohay", slug: "nadeem-sarwar" },
  { id: "mir-hasan-mir", name: "Mir Hasan Mir", nameUrdu: "میر حسن میر", description: "Mir Hasan Mir ke mashoor nohay aur manqabat", slug: "mir-hasan-mir" },
  { id: "ali-shanawar", name: "Ali Shanawar", nameUrdu: "علی شناور", description: "Ali Shanawar ke nohay", slug: "ali-shanawar" },
  { id: "shadman-raza", name: "Shadman Raza", nameUrdu: "شاذمان رضا", description: "Shadman Raza ke nohay", slug: "shadman-raza" },
  { id: "manqabat", name: "Manqabat", nameUrdu: "منقبت", description: "Ahle Bait ki madah aur manqabat", slug: "manqabat" },
  { id: "majlis", name: "Molana Majlis", nameUrdu: "مجلس", description: "Ulama ki majalis aur bayaans", slug: "majlis" },
];

export const initialVideos: Video[] = [
  // Nadeem Sarwar
  { id: "1", title: "Aye Zainab", youtubeId: "DIuGmBxdW0I", category: "nadeem-sarwar", artist: "Nadeem Sarwar", year: 2023, description: "Muharram 2023" },
  { id: "2", title: "Ya Hussain", youtubeId: "DIuGmBxdW0I", category: "nadeem-sarwar", artist: "Nadeem Sarwar", year: 2022 },
  { id: "3", title: "Mera Imam", youtubeId: "DIuGmBxdW0I", category: "nadeem-sarwar", artist: "Nadeem Sarwar", year: 2022 },
  // Mir Hasan Mir
  { id: "4", title: "Woh Karbala Gaye", youtubeId: "DIuGmBxdW0I", category: "mir-hasan-mir", artist: "Mir Hasan Mir", year: 2023 },
  { id: "5", title: "Ali Ali", youtubeId: "DIuGmBxdW0I", category: "mir-hasan-mir", artist: "Mir Hasan Mir", year: 2022 },
  // Ali Shanawar
  { id: "6", title: "Mola Hussain", youtubeId: "DIuGmBxdW0I", category: "ali-shanawar", artist: "Ali Shanawar", year: 2023 },
  // Shadman Raza
  { id: "7", title: "Ya Ali Madad", youtubeId: "DIuGmBxdW0I", category: "shadman-raza", artist: "Shadman Raza", year: 2023 },
  // Manqabat
  { id: "8", title: "Manqabat Imam Ali", youtubeId: "DIuGmBxdW0I", category: "manqabat", artist: "Various", year: 2023 },
  { id: "9", title: "Mola Ali Manqabat", youtubeId: "DIuGmBxdW0I", category: "manqabat", artist: "Various", year: 2022 },
  // Majlis
  { id: "10", title: "Majlis e Aza", youtubeId: "DIuGmBxdW0I", category: "majlis", artist: "Molana Sahab", year: 2023 },
];
