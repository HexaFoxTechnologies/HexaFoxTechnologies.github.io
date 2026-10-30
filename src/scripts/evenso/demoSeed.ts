/**
 * The made-up trips the Evenso demo opens with. They're written to the app's own demo-mode storage
 * (key and shape from Evenso's src/lib/store/localStore.ts), so every number the phone shows is worked
 * out by the real app. Dates are relative to today, so the Goa trip is always the one going on now.
 *
 * Nobody has a UPI ID, so the demo's Pay with UPI can never send money to a real account.
 */
const STORAGE_KEY = 'evenso.demo.v1';
const DAY = 86_400_000;
const rupees = (amount: number) => amount * 100; // the app stores paise

type Category = 'food' | 'stay' | 'travel' | 'activities' | 'shopping' | 'other';

interface ExpenseSeed {
  id: string;
  title: string;
  rupees: number;
  category: Category;
  paidBy: string;
  /** Who shares it; everyone on the trip when left out. */
  among?: string[];
  /** Days after the trip started. */
  day: number;
  /** Earlier amounts, oldest first, each changed by the named member. */
  edits?: { by: string; from: number }[];
}

interface TripSeed {
  id: string;
  name: string;
  code: string;
  /** Start date, in days from today. */
  start: number;
  days: number;
  budget: number | null;
  ended: boolean;
  members: string[];
  expenses: ExpenseSeed[];
  payments: { from: string; to: string; rupees: number }[];
}

const YOU = 'Nila';
const UID = 'evensoDemoVisitor000';

const trips: TripSeed[] = [
  {
    id: 'goa',
    name: 'Goa trip',
    code: 'GOA-4K7P2X',
    start: -2,
    days: 4,
    budget: 40000,
    ended: false,
    members: [YOU, 'Arun', 'Bala', 'Chitra', 'Deepa', 'Faiz'],
    expenses: [
      { id: 'villa', title: 'Villa stay, 2 nights', rupees: 12000, category: 'stay', paidBy: YOU, day: 0 },
      { id: 'fuel', title: 'Fuel to Goa', rupees: 3600, category: 'travel', paidBy: 'Bala', day: 0 },
      { id: 'lunch', title: 'Lunch at Britto’s', rupees: 4500, category: 'food', paidBy: 'Arun', day: 1 },
      { id: 'scuba', title: 'Scuba dive', rupees: 6000, category: 'activities', paidBy: 'Chitra', day: 1, among: [YOU, 'Arun', 'Bala', 'Chitra', 'Deepa'] },
      { id: 'drinks', title: 'Drinks at Curlies', rupees: 900, category: 'food', paidBy: 'Deepa', day: 1, among: [YOU, 'Arun', 'Bala', 'Deepa'], edits: [{ by: 'Bala', from: 800 }] },
      { id: 'dinner', title: 'Dinner at Fisherman’s Wharf', rupees: 2400, category: 'food', paidBy: 'Arun', day: 2 },
      { id: 'market', title: 'Flea market', rupees: 1200, category: 'shopping', paidBy: 'Faiz', day: 2 },
    ],
    payments: [],
  },
  {
    id: 'pondy',
    name: 'Pondicherry weekend',
    code: 'PON-8RX3QM',
    start: -38,
    days: 2,
    budget: null,
    ended: true,
    members: [YOU, 'Arun', 'Bala', 'Chitra'],
    expenses: [
      { id: 'guesthouse', title: 'Guest house', rupees: 6000, category: 'stay', paidBy: 'Arun', day: 0 },
      { id: 'breakfast', title: 'Breakfast at Baker Street', rupees: 1600, category: 'food', paidBy: YOU, day: 1 },
      { id: 'cycles', title: 'Cycle hire', rupees: 800, category: 'activities', paidBy: 'Bala', day: 1 },
      { id: 'promenade', title: 'Dinner on the Promenade', rupees: 2800, category: 'food', paidBy: 'Chitra', day: 1 },
    ],
    payments: [{ from: 'Bala', to: 'Arun', rupees: 2000 }],
  },
];

/** YYYY-MM-DD in the visitor's own time zone, as the app keeps dates. */
function isoDate(time: number): string {
  const date = new Date(time);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function buildTrip(seed: TripSeed, now: number) {
  const startAt = now + seed.start * DAY;
  const memberId = (name: string) => `${seed.id}-${name.toLowerCase()}`;
  const members = Object.fromEntries(
    seed.members.map((name, colorIndex) => {
      const id = memberId(name);
      return [id, { id, name, colorIndex, uid: name === YOU ? UID : null, upiId: null }];
    }),
  );
  const expenses = Object.fromEntries(
    seed.expenses.map((expense, index) => {
      const createdAt = startAt + expense.day * DAY + (index + 1) * 3_600_000;
      const amounts = [...(expense.edits ?? []).map((edit) => edit.from), expense.rupees];
      const history = [
        { at: createdAt, byName: expense.paidBy, byMemberId: memberId(expense.paidBy), action: 'added', changes: [] },
        ...(expense.edits ?? []).map((edit, at) => ({
          at: createdAt + (at + 1) * 1_800_000,
          byName: edit.by,
          byMemberId: memberId(edit.by),
          action: 'edited',
          changes: [{ field: 'amount', from: rupees(amounts[at]), to: rupees(amounts[at + 1]) }],
        })),
      ];
      const record = {
        id: expense.id,
        title: expense.title,
        amount: rupees(expense.rupees),
        category: expense.category,
        paidBy: memberId(expense.paidBy),
        split: { kind: 'equal', among: (expense.among ?? seed.members).map(memberId) },
        spentOn: isoDate(startAt + expense.day * DAY),
        createdBy: UID,
        createdAt,
        updatedAt: history[history.length - 1].at,
        deleted: false,
        history,
      };
      return [expense.id, record];
    }),
  );

  const endedAt = seed.ended ? startAt + seed.days * DAY : null;
  const payments = Object.fromEntries(
    seed.payments.map((payment, index) => {
      const id = `${seed.id}-payment-${index}`;
      const record = { id, from: memberId(payment.from), to: memberId(payment.to), amount: rupees(payment.rupees), createdBy: UID, createdAt: (endedAt ?? now) + (index + 1) * 3_600_000 };
      return [id, record];
    }),
  );

  const trip = {
    id: seed.id,
    name: seed.name,
    code: seed.code,
    startDate: isoDate(startAt),
    endDate: isoDate(startAt + (seed.days - 1) * DAY),
    budget: seed.budget === null ? null : rupees(seed.budget),
    createdBy: UID,
    createdAt: startAt - DAY,
    status: seed.ended ? 'ended' : 'active',
    endedAt,
    members,
    memberUids: [UID],
    excluded: [],
    lastExcluded: [],
  };
  return { trip, expenses, payments };
}

/** Writes the demo trips, replacing whatever an earlier visit left behind. False if storage is blocked. */
export function writeDemoSeed(now = Date.now()): boolean {
  const session = { uid: UID, name: YOU, upiId: null };
  const state = { version: 1, session, profiles: { [YOU.toLowerCase()]: session }, trips: {}, expenses: {}, payments: {} } as {
    version: 1;
    session: typeof session;
    profiles: Record<string, typeof session>;
    trips: Record<string, unknown>;
    expenses: Record<string, unknown>;
    payments: Record<string, unknown>;
  };
  for (const seed of trips) {
    const built = buildTrip(seed, now);
    state.trips[seed.id] = built.trip;
    state.expenses[seed.id] = built.expenses;
    state.payments[seed.id] = built.payments;
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}
