// src/data/categories.ts

export type Category = {
  instruction: string;
  options: string[];
};

export const categories: Record<string, Category> = {

  I: {
    instruction: "Berilah tanda pada jawaban yang paling sesuai berkenaan dengan pekerjaan anda saat ini",
    options: [
      "Sangat Tidak Setuju", // buruk → skor 1
      "Kurang Setuju",       // skor 2
      "Cukup Setuju",        // skor 3
      "Sangat Setuju",       // baik → skor 4
    ],
  },
  II: {
    instruction: "Kondisi kesehatan anda dalam satu bulan terakhir",
    options: [
      "Hampir selalu",     // paling buruk → skor 1
      "Sering",            // skor 2
      "Kadang-kadang",     // skor 3
      "Hampir tidak ada",  // paling baik → skor 4
    ],
  },
  III: {
    instruction: "Jawaban yang paling sesuai berkenaan dengan orang-orang disekitar anda saat ini",
    options: [
      "Tidak sama sekali",   // buruk → 1
      "Kadang-kadang",       // 2
      "Sering",              // 3
      "Selalu",              // baik → 4  
    ],
  },
  IV: {
    instruction: "Jawaban yang paling sesuai berkenaan dengan aspek pekerjaan anda yang lebih rinci sesuai dengan kondisi saat ini",
    options: [
      "Sangat tidak benar",  // buruk → 1
      "Kurang benar",        // 2
      "Cukup benar",         // 3
      "Benar",               // baik → 4
    ],
  },
  V: {
    instruction: "Jawaban yang paling sesuai berkenaan dengan situasi di tempat kerja saat ini",
    options: [
      "Sangat tidak benar",  // buruk → 1
      "Kurang benar",        // 2
      "Cukup benar",         // 3
      "Benar",               // baik → 4
    ],
  },
  VI: {
    instruction: "Jawaban yang paling sesuai berkenaan dengan organisasi di tempat kerja anda saat ini",
    options: [
      "Sangat tidak setuju", // buruk → 1
      "Kurang setuju",       // 2
      "Cukup setuju",        // 3
      "Sangat setuju",       // baik → 4
    ],
  },
  VII: {
    instruction: "Jawaban yang paling sesuai berkenaan dengan kondisi pekerjaan dan kinerja anda saat ini",
    options: [
      "Tidak benar",         // buruk → 1
      "Kurang benar",        // 2
      "Cukup benar",         // 3
      "Benar",               // baik → 4
    ],
  },
  VIII: {
    instruction: "Jawaban yang paling sesuai berkenaan dengan kondisi konflik Peran Ganda antara pekerjaan dan keluarga",
    options: [
      "Sangat tidak setuju", // buruk → 1
      "Tidak setuju",        // 2
      "Setuju",              // 3
      "Sangat setuju",       // baik → 4
    ],
  },
  IX: {
    instruction: "Stres Appraisal - Jawaban yang paling sesuai berkenaan dengan kondisi anda",
    options: [
      "Sangat tidak sesuai", // buruk → 1
      "Sedikit",             // 2
      "Cukup",               // 3
      "Sangat cukup",        // 4
      "Sangat sesuai",       // baik → 5
    ],
  },

};
