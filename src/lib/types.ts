export type PageName = "stats" | "score";

export type PlayMode = "sp" | "dp";

export type DifficultyLetter = "b" | "n" | "h" | "a" | "l";

export type Chart =
  "spb" | "spn" | "sph" | "spa" | "spl" | "dpn" | "dph" | "dpa" | "dpl";

export const PLAY_MODES = ["sp", "dp"] as const;

export const DIFFICULTY_LETTERS = ["b", "n", "h", "a", "l"] as const;

export const initialTrackData = {
  title: "",
  type: "",
  label: "",
  cost_normal: "",
  cost_hyper: "",
  cost_another: "",
  sp_dj_points: "",
  dp_dj_points: "",
  sbp_unlocked: "",
  spb_rating: "",
  spb_lamp: "",
  spb_letter: "",
  spb_ex_score: "",
  spb_miss_count: "",
  spb_note_count: "",
  spb_dj_points: "",
  spn_unlocked: "",
  spn_rating: "",
  spn_lamp: "",
  spn_letter: "",
  spn_ex_score: "",
  spn_miss_count: "",
  spn_note_count: "",
  spn_dj_points: "",
  sph_unlocked: "",
  sph_rating: "",
  sph_lamp: "",
  sph_letter: "",
  sph_ex_score: "",
  sph_miss_count: "",
  sph_note_count: "",
  spa_rating: "",
  spa_lamp: "",
  spa_letter: "",
  spa_ex_score: "",
  spa_miss_count: "",
  spa_note_count: "",
  spa_dj_points: "",
  spl_unlocked: "",
  spl_rating: "",
  spl_lamp: "",
  spl_letter: "",
  spl_ex_score: "",
  spl_miss_count: "",
  spl_note_count: "",
  spl_dj_points: "",
  dpn_unlocked: "",
  dpn_rating: "",
  dpn_lamp: "",
  dpn_letter: "",
  dpn_ex_score: "",
  dpn_miss_count: "",
  dpn_note_count: "",
  dpn_dj_points: "",
  dph_unlocked: "",
  dph_rating: "",
  dph_lamp: "",
  dph_letter: "",
  dph_ex_score: "",
  dph_miss_count: "",
  dph_note_count: "",
  dph_dj_points: "",
  dpa_unlocked: "",
  dpa_rating: "",
  dpa_lamp: "",
  dpa_letter: "",
  dpa_ex_score: "",
  dpa_miss_count: "",
  dpa_note_count: "",
  dpa_dj_points: "",
  dpl_unlocked: "",
  dpl_rating: "",
  dpl_lamp: "",
  dpl_letter: "",
  dpl_ex_score: "",
  dpl_miss_count: "",
  dpl_note_count: "",
  dpl_dj_points: "",
  spb_score_rate: "",
  spb_letter_diff: "",
  spb_score_diff: "",
  spn_score_rate: "",
  spn_letter_diff: "",
  spn_score_diff: "",
  sph_score_rate: "",
  sph_letter_diff: "",
  sph_score_diff: "",
  spa_score_rate: "",
  spa_letter_diff: "",
  spa_score_diff: "",
  spl_score_rate: "",
  spl_letter_diff: "",
  spl_score_diff: "",
  dpn_score_rate: "",
  dpn_letter_diff: "",
  dpn_score_diff: "",
  dph_score_rate: "",
  dph_letter_diff: "",
  dph_score_diff: "",
  dpa_score_rate: "",
  dpa_letter_diff: "",
  dpa_score_diff: "",
  dpl_score_rate: "",
  dpl_letter_diff: "",
  dpl_score_diff: "",
} as const;
export type Track = Record<string, string> &
  Record<
    keyof typeof initialTrackData,
    string
  >;

export const initialStatsDetail = {
  no_play: 0,
  failed: 0,
  assisted: 0,
  easy: 0,
  clear: 0,
  hard: 0,
  ex_hard: 0,
  full_combo: 0,
  dj_f: 0,
  dj_e: 0,
  dj_d: 0,
  dj_c: 0,
  dj_b: 0,
  dj_a: 0,
  dj_aa: 0,
  dj_aaa: 0,
  max: 0,
  "max-": 0,
  "aaa+": 0,
  "aaa-": 0,
  "aa+": 0,
  "aa-": 0,
  "a+": 0,
  "a-": 0,
  "b+": 0,
  "b-": 0,
  "c+": 0,
  "c-": 0,
  "d+": 0,
  "d-": 0,
  "e+": 0,
  "e-": 0,
} as const;
export type StatsDetail = Record<string, number> &
  Record<
    keyof typeof initialStatsDetail,
    number
  >;

export type RefluxStats = {
  [key: string]: StatsDetail;
  sp_1: StatsDetail;
  sp_2: StatsDetail;
  sp_3: StatsDetail;
  sp_4: StatsDetail;
  sp_5: StatsDetail;
  sp_6: StatsDetail;
  sp_7: StatsDetail;
  sp_8: StatsDetail;
  sp_9: StatsDetail;
  sp_10: StatsDetail;
  sp_11: StatsDetail;
  sp_12: StatsDetail;
  spb: StatsDetail;
  spn: StatsDetail;
  sph: StatsDetail;
  spa: StatsDetail;
  spl: StatsDetail;
  dp_1: StatsDetail;
  dp_2: StatsDetail;
  dp_3: StatsDetail;
  dp_4: StatsDetail;
  dp_5: StatsDetail;
  dp_6: StatsDetail;
  dp_7: StatsDetail;
  dp_8: StatsDetail;
  dp_9: StatsDetail;
  dp_10: StatsDetail;
  dp_11: StatsDetail;
  dp_12: StatsDetail;
  dpn: StatsDetail;
  dph: StatsDetail;
  dpa: StatsDetail;
  dpl: StatsDetail;
};

export function initialStats(): RefluxStats {
  return {
    sp_1: { ...initialStatsDetail },
    sp_2: { ...initialStatsDetail },
    sp_3: { ...initialStatsDetail },
    sp_4: { ...initialStatsDetail },
    sp_5: { ...initialStatsDetail },
    sp_6: { ...initialStatsDetail },
    sp_7: { ...initialStatsDetail },
    sp_8: { ...initialStatsDetail },
    sp_9: { ...initialStatsDetail },
    sp_10: { ...initialStatsDetail },
    sp_11: { ...initialStatsDetail },
    sp_12: { ...initialStatsDetail },
    spb: { ...initialStatsDetail },
    spn: { ...initialStatsDetail },
    sph: { ...initialStatsDetail },
    spa: { ...initialStatsDetail },
    spl: { ...initialStatsDetail },
    dp_1: { ...initialStatsDetail },
    dp_2: { ...initialStatsDetail },
    dp_3: { ...initialStatsDetail },
    dp_4: { ...initialStatsDetail },
    dp_5: { ...initialStatsDetail },
    dp_6: { ...initialStatsDetail },
    dp_7: { ...initialStatsDetail },
    dp_8: { ...initialStatsDetail },
    dp_9: { ...initialStatsDetail },
    dp_10: { ...initialStatsDetail },
    dp_11: { ...initialStatsDetail },
    dp_12: { ...initialStatsDetail },
    dpn: { ...initialStatsDetail },
    dph: { ...initialStatsDetail },
    dpa: { ...initialStatsDetail },
    dpl: { ...initialStatsDetail },
  };
}

export type RefluxContextType = {
  headers: string[];
  tracks: Track[];
  stats: RefluxStats;
  handleFileChange: (
    event: React.ChangeEvent<HTMLInputElement, Element>,
  ) => void;
  handleDragOver: (event: React.DragEvent<HTMLLabelElement>) => void;
  handleDrop: (event: React.DragEvent<HTMLLabelElement>) => void;
  isTSVLoaded: () => boolean;
  isLoading: boolean;
  loadDemoData: () => void;
  isDemo: boolean;
};
