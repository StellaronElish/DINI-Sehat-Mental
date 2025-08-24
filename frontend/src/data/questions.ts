// src/data/questions.ts

export type Question = {
  id: number;
  text: string;
  category: string; // I - IX
};

// sementara hanya 1–20, 109 banyak rek
export const questions: Question[] = [
  // Kategori I
  {
    id: 1,
    text: "Saya tidak dapat menyelesaikan pekerjaan pada waktu yang ditentukan",
    category: "I",
  },
  { id: 2, text: "Saya harus bekerja keras semampu saya", category: "I" },
  {
    id: 3,
    text: "Saya dapat bekerja dengan kemampuan (kecepatan kerja) saya sendiri",
    category: "I",
  },
  {
    id: 4,
    text: "Saya dapat menentukan bagaimana cara saya bekerja",
    category: "I",
  },
  {
    id: 5,
    text: "Terdapat perbedaan opini dalam departemen yang menimbulkan konflik",
    category: "I",
  },
  {
    id: 6,
    text: "Departemen saya tidak bersinergi dengan baik dengan departemen lain",
    category: "I",
  },
  {
    id: 7,
    text: "Saya memiliki tempat kerja dengan suasana yang bersahabat",
    category: "I",
  },
  { id: 8, text: "Saya cocok dengan pekerjaan saya", category: "I" },
  {
    id: 9,
    text: "Pekerjaan saya membangkitkan semangat saya untuk bekerja",
    category: "I",
  },

  // Kategori II
  { id: 10, text: "Saya merasa sangat aktif", category: "II" },
  { id: 11, text: "Saya merasa sangat aktif", category: "II" },
  { id: 12, text: "Saya merasa tegang", category: "II" },
  { id: 13, text: "Saya merasa lelah", category: "II" },
  { id: 14, text: "Saya merasa gugup", category: "II" },
  { id: 15, text: "Saya merasa depresi", category: "II" },
  { id: 16, text: "Saya merasa tenang", category: "II" },
  { id: 17, text: "Saya merasa bersemangat", category: "II" },
  { id: 18, text: "Saya merasa kelelahan", category: "II" },
  { id: 19, text: "Saya merasa putus asa", category: "II" },
  {
    id: 20,
    text: "Saya merasa khawatir terhadap masa depan saya",
    category: "II",
  },
];
