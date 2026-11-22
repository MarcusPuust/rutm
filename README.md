# Rütm

Järjepidevus enne kiirust. Mobiilirakendus, kus väike tiim täidab koos nädala liikumiseesmärki.

Mobiilirakenduste arendamise grupitöö · Expo · React Native · TypeScript

> See README on algversioon. Iga liige täiendab oma osa (vt "Tegijad").
> Tööjaotus, ajakava ja põhiotsused: [docs/PLAAN.md](docs/PLAAN.md)

---

## 1. Kiire start

### Projekt on loodud

Projekt on tehtud käsuga `npx create-expo-app@latest rutm --template blank-typescript`
(Expo SDK 58) ja sellele on lisatud expo-router ning meie kaustastruktuur.

### Iga liige

```bash
git clone <repo-url>
cd rutm
npm install
cp .env.example .env          # täida Supabase'i võtmed
npx expo start                # skanni QR-kood Expo Go rakendusega (Android)
```

Lisateegid tulevad hiljem vastavalt osale:

| Teek | Milleks | Kes |
|---|---|---|
| `@supabase/supabase-js`, `@react-native-async-storage/async-storage` | taustasüsteem, sessioon | Liige 1, 2 |
| `expo-location` | GPS | Liige 3, 4 |
| `react-native-maps` | kaart (`RouteMap`) | Liige 4 |
| `expo-notifications` | teavitused | Liige 1, 3 |
| `expo-image-picker` | profiilipilt | Liige 2 |

Paigalda alati `npx expo install <teek>`, mitte `npm install`. Siis valitakse Expo SDK-ga sobiv versioon.

---

## Disain

Kõik ekraanid on kaustas [`docs/design/`](docs/design/). Ekraanide numbrid on samad, mis tööjaotuses ja koodifailide kommentaarides.

| Nr | Ekraan | Pilt | Vastutaja |
|---|---|---|---|
| 01 | Alustus | [01-alustus.jpg](docs/design/01-alustus.jpg) | Liige 2 |
| 02 | Logi sisse | [02-logi-sisse.png](docs/design/02-logi-sisse.png) | Liige 2 |
| 03 | Registreeru | [03-registreeru-e-postiga.png](docs/design/03-registreeru-e-postiga.png) | Liige 2 |
| 04 | Nädala eesmärk | [04-nadala-eesmark.png](docs/design/04-nadala-eesmark.png) | Liige 3 |
| 05 | Õigus – asukoht | [05-oigus-asukoht.png](docs/design/05-oigus-asukoht.png) | Liige 3 |
| 06 | Õigus – terviseandmed | [06-oigus-terviseandmed.png](docs/design/06-oigus-terviseandmed.png) | Liige 3 |
| 07 | Õigus – teavitused | [07-oigus-teavitused.png](docs/design/07-oigus-teavitused.png) | Liige 3 |
| 08 | Kutsu tiimi | [08-kutsu-tiimi.png](docs/design/08-kutsu-tiimi.png) | Liige 3 |
| 09 | Täna | [09-tana.png](docs/design/09-tana.png) | Liige 3 |
| 10 | Vali tegevus | [10-vali-tegevus.png](docs/design/10-vali-tegevus.png) | Liige 4 |
| 11 | Salvestus – Rütm | [11-salvestus-rutm.png](docs/design/11-salvestus-rutm.png) | Liige 4 |
| 12 | Salvestus – paus | [12-salvestus-paus.png](docs/design/12-salvestus-paus.png) | Liige 4 |
| 13 | Salvestus – Kaart | [13-salvestus-kaart.png](docs/design/13-salvestus-kaart.png) | Liige 4 |
| 14 | Trenni kokkuvõte | [14-trenni-kokkuvote.png](docs/design/14-trenni-kokkuvote.png) | Liige 5 |
| 15 | Ajalugu | [15-ajalugu.png](docs/design/15-ajalugu.png) | Liige 5 |
| 16 | Tiim – ülevaade | [16-tiim-ulevaade.png](docs/design/16-tiim-ulevaade.png) | Liige 6 |
| 17 | Tiim – voog | [17-tiim-voog.png](docs/design/17-tiim-voog.png) | Liige 6 |
| 18 | Voo postitus | [18-voo-postitus.png](docs/design/18-voo-postitus.png) | Liige 6 |
| 19 | Profiil | [19-profiil.png](docs/design/19-profiil.png) | Liige 2 |
| 20 | Teavitused – lukustuskuva | [20-teavitused-lukustuskuva.jpg](docs/design/20-teavitused-lukustuskuva.jpg) | Liige 1 |
| 21 | Teavitus – avaekraan | [21-teavitus-avaekraan.png](docs/design/21-teavitus-avaekraan.png) | Liige 1 |

Logo: [`docs/design/logo.png`](docs/design/logo.png)

**Värvid, fondid ja vahed** on koodis failides `src/theme/` – kasuta neid, mitte värvikoode piltidelt.

---

## 2. Kaustastruktuur

```
rutm/
├── src/
│   ├── app/                          EKRAANID (expo-router: üks fail = üks ekraan)
│   │   ├── _layout.tsx               juur: fondid, suunamine
│   │   │
│   │   ├── (auth)/                   ── Liige 2 ──
│   │   │   ├── welcome.tsx           1  Alustus
│   │   │   ├── login.tsx             2  Logi sisse
│   │   │   └── register.tsx          3  Registreeru
│   │   │
│   │   ├── (onboarding)/             ── Liige 3 ──
│   │   │   ├── goal.tsx              4  Nädala eesmärk
│   │   │   ├── location.tsx          5  Asukoha luba
│   │   │   ├── health.tsx            6  Terviseandmed
│   │   │   ├── notifications.tsx     7  Teavitused
│   │   │   └── invite.tsx            8  Kutsu tiimi
│   │   │
│   │   ├── (tabs)/                   alumine menüü
│   │   │   ├── _layout.tsx           menüü + "+" nupp        ── Liige 1 ──
│   │   │   ├── index.tsx             9  Täna                 ── Liige 3 ──
│   │   │   ├── team/                                         ── Liige 6 ──
│   │   │   │   ├── index.tsx         16 Tiim – ülevaade
│   │   │   │   ├── feed.tsx          17 Tiim – voog
│   │   │   │   └── post/[id].tsx     18 Voo postitus
│   │   │   ├── history/                                      ── Liige 5 ──
│   │   │   │   ├── index.tsx         15 Ajalugu
│   │   │   │   └── [id].tsx          14 Trenni kokkuvõte (ajaloost)
│   │   │   └── profile.tsx           19 Profiil              ── Liige 2 ──
│   │   │
│   │   └── record/                   täisekraan menüü kohal
│   │       ├── select.tsx            10 Vali tegevus         ── Liige 4 ──
│   │       ├── active.tsx            11–13 Salvestus, paus, kaart
│   │       └── summary.tsx           14 Trenni kokkuvõte     ── Liige 5 ──
│   │
│   ├── theme/                        VÄRVID, FONDID, VAHED (üks allikas)
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   └── index.ts
│   │
│   ├── components/ui/                ÜHISED KOMPONENDID      ── Liige 1 ──
│   │   ├── Button.tsx                primary / secondary / dark / text
│   │   ├── Card.tsx                  light / dark
│   │   ├── Screen.tsx                ekraani ümbris
│   │   ├── TabBar.tsx                ovaalne menüü, "+" nupp
│   │   ├── PlaceholderScreen.tsx     ajutine, kustutatakse lõpuks
│   │   └── index.ts
│   │
│   ├── features/                     LOOGIKA (hook'id, arvutused, päringud)
│   │   ├── auth/                     sessioon, login          ── Liige 2 ──
│   │   ├── onboarding/               eesmärk, õigused, tiim   ── Liige 3 ──
│   │   ├── tracking/                 GPS, taimer, tempo       ── Liige 4 ──
│   │   │   └── geo.ts                distants, tempo
│   │   ├── activities/               trennid, nädal, rütm     ── Liige 5 ──
│   │   ├── team/                     voog, hoog, müks         ── Liige 6 ──
│   │   ├── profile/                  profiil, pilt            ── Liige 2 ──
│   │   └── notifications/            hoog, müks, meeldetuletus ── Liige 1 ──
│   │
│   ├── lib/                          ÜLDISED ABIVAHENDID
│   │   ├── supabase.ts               Supabase'i klient
│   │   └── format.ts                 32:08 · 5,4 km · 5:57
│   │
│   ├── mocks/                        NÄIDISANDMED (kuni backend valmis)
│   │   └── data.ts
│   │
│   └── types/                        ÜHISED TÜÜBID
│       └── index.ts                  Profile, Team, Activity, Reaction
│
├── assets/                           rakenduse ikoonid; images/ – logo, foto
├── docs/
│   ├── PLAAN.md                      tööjaotus, ajakava, otsused
│   └── design/                       disainipildid 01–21, logo
├── AGENTS.md, CLAUDE.md              Expo juhised AI-abilistele (mallist)
├── app.json                          nimi "Rütm", scheme "rutm", expo-router plugin
├── package.json                      "main": "expo-router/entry"
├── tsconfig.json                     "@/..." import-tee → src/
├── .env.example                      Supabase'i võtmete mall
├── .gitignore
└── README.md
```

Expo Router kasutab automaatselt kausta `src/app/`, kui see olemas on.

---

## 3. Arhitektuur: kes keda kasutab

```
   ┌───────────────────────────────────────────────────────────┐
   │  src/app/      EKRAANID                                     │
   │  (auth)  (onboarding)  (tabs)  record                       │
   │  Ainult paigutus ja komponendid. Pole andmebaasi päringuid. │
   └──────────────┬──────────────────────────────┬──────────────┘
                  │ kutsub hook'e                │ joonistab
                  ▼                              ▼
   ┌──────────────────────────────┐  ┌──────────────────────────┐
   │  src/features/   LOOGIKA      │  │  src/components/ui/      │
   │  useSession()                 │  │  Button  Card  Screen    │
   │  useTracking()                │  │  TabBar  StatCard ...    │
   │  useWeekProgress()            │  └────────────┬─────────────┘
   │  useTeamFeed()                │               │
   └──────┬───────────────┬───────┘               │
          │               │                       │
          ▼               ▼                       ▼
   ┌─────────────┐ ┌─────────────┐        ┌──────────────┐
   │ src/lib/    │ │ src/types/  │        │ src/theme/   │
   │ supabase.ts │ │ src/mocks/  │        │ värvid, fondid│
   │ format.ts   │ └─────────────┘        └──────────────┘
   └──────┬──────┘
          ▼
   ┌─────────────┐
   │  Supabase   │  Auth · Postgres · Storage
   └─────────────┘
```

**Reeglid:**

1. Nooled käivad ainult alla. `theme/` ei impordi midagi, `components/` ei tea ekraanidest midagi.
2. Ekraan ei räägi kunagi otse Supabase'iga. Päringud on `features/` hook'ides.
3. Värvid ja suurused tulevad ainult `@/theme`-st, mitte kirjutatuna otse koodi.
4. Nupud, kaardid ja menüü tulevad ainult `@/components/ui`-st. Nii näeb rakendus ühtne välja.

---

## 4. Navigatsioon

```
                    ┌──────────────┐
                    │   _layout    │  kontrollib sessiooni
                    └──────┬───────┘
         ┌─────────────────┼──────────────────┐
         ▼                 ▼                  ▼
   ┌───────────┐    ┌──────────────┐    ┌───────────┐
   │  (auth)   │───▶│ (onboarding) │───▶│  (tabs)   │
   │ 1 → 2 / 3 │    │ 4 → 5 → 6 →  │    │           │
   └───────────┘    │ 7 → 8        │    │  Täna  9  │
     ei ole sees    └──────────────┘    │  Tiim 16 ─┼─▶ 17 voog ─▶ 18 postitus
                      uus kasutaja      │  Ajalugu 15┼─▶ 14 kokkuvõte
                                        │  Profiil 19│
                                        └─────┬─────┘
                                              │ "+"
                                              ▼
                                     ┌─────────────────┐
                                     │     record/     │
                                     │ 10 → 11 ⇄ 12/13 │
                                     │        ↓        │
                                     │  14 kokkuvõte   │──▶ tagasi Täna
                                     └─────────────────┘
```

---

## 5. Andmemudel (Supabase)

```
profiles ─────────┐
  id (PK)          │
  name             │        teams
  avatar_url       │          id (PK)
  weekly_goal_days │          name
  min_minutes      │          invite_code
                   │             ▲
                   │             │
                   ├──▶ team_members (team_id, user_id)
                   │
                   ├──▶ activities
                   │      id (PK), user_id, type, started_at,
                   │      duration_s, distance_m, route, splits,
                   │      shared_to_team
                   │           ▲
                   │           │
                   ├──▶ reactions (activity_id, user_id)     "hoog"
                   │
                   └──▶ nudges (from_user, to_user)          "müks"
```

---

## 6. Git-reeglid

```
main ────●─────────────●─────────────●──────▶   (kaitstud, ainult PR kaudu)
          \           / \           /
           ●──●──●───●   ●──●──●───●
     feature/auth-login   feature/record-map
```

1. `git config user.name "Ees Perenimi"` ja `git config user.email` (sama mis GitHubis), et commitid oleksid sinu nime all.
2. Iga ülesanne oma harus (inglise keeles): `feature/<osa>-<lühikirjeldus>`, nt `feature/record-map`.
3. Pull Request → üks teine liige vaatab üle → merge `main`-i.
4. Commit-sõnumid inglise keeles: `feat: add pace calculation`, `fix: …`, `docs: …`, `style: …`, `chore: …`.
5. `.env` ei lähe Giti.

---

## 7. Kasutatud SDK-d, API-d ja teegid

_Täiendada, kui teegid on paigaldatud (versioonid `package.json`-ist)._

| Nimi | Versioon | Milleks |
|---|---|---|
| Expo SDK | 58 (`~58.0.26`) | arendusplatvorm |
| React Native | 0.88.1 | UI raamistik |
| React | 19.3.0 | UI teek |
| TypeScript | ~6.0.3 | tüübid |
| expo-router | | navigatsioon |
| Supabase | | autentimine, andmebaas, failid |
| expo-location | | GPS |
| react-native-maps | | kaart |
| expo-notifications | | teavitused |
| expo-image-picker | | profiilipilt |

---

## 8. Kompileerimine ja paigaldamine (Android)

_Täiendab Liige 2._

```bash
npm install -g eas-cli
eas login
eas build -p android --profile preview      # loob .apk faili
```

APK paigaldamine: laadi fail telefoni → ava → luba "tundmatutest allikatest" → paigalda.

---

## 9. Tegijad

| Liige | Nimi | Osa | Ekraanid |
|---|---|---|---|
| 1 | | Alus, disainisüsteem, navigatsioon, Supabase, teavitused | – |
| 2 | | Autentimine, profiil, APK build | 1–3, 19 |
| 3 | | Seadistus, õigused, Täna | 4–9 |
| 4 | | Trenni salvestamine, kaardikomponent | 10–13 |
| 5 | | Kokkuvõte, ajalugu, nädala/rütmi loogika | 14–15 |
| 6 | | Tiim, voog, hoog ja müks | 16–18 |
